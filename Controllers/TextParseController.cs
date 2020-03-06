
using Microsoft.AspNetCore.Mvc;
using System;
using Sid.Parse.TextPatternParser;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;
using react_spa.Models;
using System.Threading.Tasks;

namespace react_spa.Controllers
{
    public struct ReplaceRV {
        public string ReplacedText;
        public int NumMatching;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TextParseController : BaseController
    {
        
        [HttpPost("ExecuteReplace")]
        public async Task<ActionResult<TextParseReplaceModel>> ExecuteReplace(ExecuteReplaceModel model)
        {
            return await ControllerFunctionAsync<TextParseReplaceModel>(async() => {

                var rv=new TextParseReplaceModel();

                var replaceRVObj=await CompileAndExecuteCode(model.Code,model.ReturnVariableName,model.UsingStatements,rv,true);
                if(replaceRVObj!=null) {

                    var replaceRV=(ReplaceRV)replaceRVObj;
                    rv.NumMatching=replaceRV.NumMatching;
                    if(rv.NumMatching>0) {
                        rv.ReplacedText=replaceRV.ReplacedText;
                    }
                }
                return rv;
            });
        }

        [HttpPost("ExecuteExtract")]
        public async Task<ActionResult<TextParseExtractModel>> ExecuteExtract(ExecuteExtractModel model)
        {
            return await ControllerFunctionAsync<TextParseExtractModel>(async() => {

                var rv=new TextParseExtractModel();

                rv.ExtractedText=(List<string>) await CompileAndExecuteCode(model.Code,model.ReturnVariableName,model.UsingStatements,rv,false);
                return rv;
            });
        }

        [HttpPost("ExecuteMatch")]
        public async Task<ActionResult<TextParseMatchModel>> ExecuteMatch(ExecuteMatchModel model)
        {
            return await ControllerFunctionAsync<TextParseMatchModel>(async() => {

                var rv=new TextParseMatchModel();

                var numMatching=await CompileAndExecuteCode(model.Code,model.ReturnVariableName,model.UsingStatements,rv,false);
                if(numMatching!=null) {
                    rv.NumMatching=(int) numMatching;
                }
                return rv;
            });
        }

        private async Task<object> CompileAndExecuteCode(
            string clientCode,
            string returnVariableName,
            string[] usingStatements,
            TextParseResultBase output,
            bool loadThisDLL) {

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

            output.FullCode=code;

            var syntaxTree = CSharpSyntaxTree.ParseText(code);

            string assemblyName = System.IO.Path.GetRandomFileName();
            MetadataReference[] referencesHardcoded = new MetadataReference[]
            {
                MetadataReference.CreateFromFile(typeof(Sid.Log.ILog).Assembly.Location),
                MetadataReference.CreateFromFile(typeof(Sid.Parse.TextPatternParser.Parser).Assembly.Location),
                MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
                MetadataReference.CreateFromFile(Assembly.Load("netstandard, Version=2.0.0.0").Location),
                MetadataReference.CreateFromFile(Assembly.Load("System.Runtime, Version=0.0.0.0").Location),
                MetadataReference.CreateFromFile(Assembly.Load("System.Collections, Version=0.0.0.0").Location),
            };

            var fullReferences=referencesHardcoded.ToList();

            if(loadThisDLL) {
                fullReferences.Add(MetadataReference.CreateFromFile(typeof(react_spa.Controllers.ReplaceRV).Assembly.Location));
            }

            CSharpCompilation compilation = CSharpCompilation.Create(
                assemblyName,
                syntaxTrees: new[] { syntaxTree },
                references: fullReferences,
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

                    object rv=null;

                    // Run the task
                    await Task.WhenAny(Task.Run(() => {
                        try
                        {
                            rv=type.InvokeMember("Go",
                                BindingFlags.Default | BindingFlags.InvokeMethod,
                                null,
                                obj,
                                null);
                        }
                        catch(Exception e) {
                            output.ExecuteError=e.ToString();
                        }
                    }),Task.Delay(10000));

                    if(rv!=null) {
                        return rv;
                    }

                    if(output.ExecuteError==null) {
                        // Timed out
                        output.ExecuteError=
                            "The generated text parse code did not execute within the allotted timeframe (10 seconds). "+
                            "The process has been stopped prematurely. Keep in mind that this error could be the "+
                            "result of an infinite loop caused by the combination of the parse statements used. Running "+
                            "the generated text parse code through the debugger will help with diagnosing the problem.";
                    }

                } else {
                    // Get the compile errors
                    IEnumerable<Diagnostic> failures = result.Diagnostics.Where(diagnostic => 
                        diagnostic.IsWarningAsError || 
                        diagnostic.Severity == DiagnosticSeverity.Error);

                    output.CompileErrors = new List<string>();

                    foreach (Diagnostic diagnostic in failures)
                    {
                        output.CompileErrors.Add(string.Format("{0} {1}: {2}",
                            diagnostic.Id, diagnostic.Location, diagnostic.GetMessage()));
                    }
                }

                return null;
            }
        }
    }
}