
using Newtonsoft.Json;

namespace react_spa {
    public class TextParseBuiltInExampleModel {
        [JsonProperty("ReplacedText")]
        public string ReplacedText
        {
            get;
            set;
        }

        [JsonProperty("NumMatching")]
        public int NumMatching
        {
            get;
            set;
        }
    }
}