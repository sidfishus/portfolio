
using System.Collections.Generic;

namespace react_spa.Models {

    public abstract class TextParseResultBase {
        
        public List<string> CompileErrors
        {
            get;
            set;
        }
        
        public string ExecuteError
        {
            get;
            set;
        }

        // Only generated when there is a compile or execution error. For helping to find bugs.
        public string FullCode
        {
            get;
            set;
        }
    }
}