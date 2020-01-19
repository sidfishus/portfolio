
using Newtonsoft.Json;
using System.Collections.Generic;

namespace react_spa.Models {

    public abstract class TextParseResultBase {

        [JsonProperty("CompileErrors")]
        public List<string> CompileErrors
        {
            get;
            set;
        }

        [JsonProperty("ExecuteError")]
        public string ExecuteError
        {
            get;
            set;
        }

        // Only generated when there is a compile or execution error. For helping to find bugs.
        [JsonProperty("FullCode")]
        public string FullCode
        {
            get;
            set;
        }
    }
}