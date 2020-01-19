
using Newtonsoft.Json;

namespace react_spa.Models {

    public sealed class TextParseMatchModel : TextParseResultBase {

        [JsonProperty("NumMatching")]
        public int NumMatching
        {
            get;
            set;
        }
    }
}