
using react_spa.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace react_spa.Models {

    public sealed class TextParseReplaceModel : TextParseResultBase {

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