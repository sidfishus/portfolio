
using Microsoft.AspNetCore.Mvc;
using System;
using Sid.Parse.TextPatternParser;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace react_spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextParseController : BaseController
    {
        [HttpPost("ExecuteExtract")]
        public ActionResult<List<string>> ExecuteExtract(ExecuteExtractModel model)
        {
            return ControllerFunction<List<string>>(() => {

                var rv=(List<string>)CompileAndExecuteCode(model.Code,model.ReturnVariableName,model.UsingStatements);
                return rv;
            });
        }

        //sidtodo execute as a task with a max of 10 seconds or so to prevent abuse / malicious code injection
        private object CompileAndExecuteCode(
            string clientCode,
            string returnVariableName,
            string[] usingStatements) {

            // Custom using statements
            var usingStatementStr ="";
            if(usingStatements!=null && usingStatements.Count()>0) {

                var usingStatementBuilder=new System.Text.StringBuilder();
                usingStatementBuilder.Append(Environment.NewLine);
                for(var i=0;i<usingStatements.Count();++i) {

                    usingStatementBuilder.Append($"using {usingStatements[i]};{Environment.NewLine}");
                }
                usingStatementStr=usingStatementBuilder.ToString();
            }

            // Code
            var code=
                $@"using Sid.Parse.TextPatternParser;{usingStatementStr}

                namespace Sid {{
                    public class CompileAndExecuteCode {{
                        public System.Object Go() {{

                            {clientCode}

                            return {returnVariableName};
                        }}
                    }}
                }}";

            Console.WriteLine(code); //sidtodo remove

            var syntaxTree = CSharpSyntaxTree.ParseText(code);

            string assemblyName = System.IO.Path.GetRandomFileName();
            MetadataReference[] references = new MetadataReference[]
            {
                MetadataReference.CreateFromFile(typeof(Sid.Log.ILog).Assembly.Location),
                MetadataReference.CreateFromFile(typeof(Sid.Parse.TextPatternParser.Parser).Assembly.Location),
                MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
                MetadataReference.CreateFromFile(Assembly.Load("netstandard, Version=2.0.0.0").Location),
                MetadataReference.CreateFromFile(Assembly.Load("System.Runtime, Version=0.0.0.0").Location),
                MetadataReference.CreateFromFile(Assembly.Load("System.Collections, Version=0.0.0.0").Location)
            };

            CSharpCompilation compilation = CSharpCompilation.Create(
                assemblyName,
                syntaxTrees: new[] { syntaxTree },
                references: references,
                options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

            using (var ms = new System.IO.MemoryStream())
            {
                //// Compile
                var result = compilation.Emit(ms);

                if (result.Success)
                {
                    //// Load the assembly
                    ms.Seek(0, System.IO.SeekOrigin.Begin);
                    Assembly assembly = Assembly.Load(ms.ToArray());

                    //// Invoke the function
                    Type type = assembly.GetType("Sid.CompileAndExecuteCode");
                    object obj = Activator.CreateInstance(type);
                    return type.InvokeMember("Go",
                        BindingFlags.Default | BindingFlags.InvokeMethod,
                        null,
                        obj,
                        null);
                }

                IEnumerable<Diagnostic> failures = result.Diagnostics.Where(diagnostic => 
                    diagnostic.IsWarningAsError || 
                    diagnostic.Severity == DiagnosticSeverity.Error);

                foreach (Diagnostic diagnostic in failures)
                {
                    Console.Error.WriteLine("{0} {1}: {2}", diagnostic.Id, diagnostic.Location, diagnostic.GetMessage());
                    //sidtodo errors
                }

                return null;
            }
        }
    }
}