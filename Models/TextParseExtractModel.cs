
using System.Collections.Generic;

namespace react_spa.Models {

    public sealed class TextParseExtractModel : TextParseResultBase {
        
        public List<string>? ExtractedText
        {
            get;
            set;
        }
    }
}