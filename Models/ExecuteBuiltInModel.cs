
using Newtonsoft.Json;

namespace react_spa {

    public class ExecuteBuiltInModel {

        public enum eParseBuiltInExample {
            vbsAddParenthesis=1,
        }

        [JsonProperty("Example")]
        public eParseBuiltInExample Example {
            get;
            set;
        }

        [JsonProperty("Input")]

        public string Input {
            get;
            set;
        }
    }
}