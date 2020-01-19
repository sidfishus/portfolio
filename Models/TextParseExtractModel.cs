
using react_spa.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace react_spa.Models {

    public sealed class TextParseExtractModel : TextParseResultBase {

        [JsonProperty("ExtractedText")]
        public List<string> ExtractedText
        {
            get;
            set;
        }
    }
}