
namespace react_spa.Models {

    public sealed class TextParseReplaceModel : TextParseResultBase {

        public string ReplacedText
        {
            get;
            set;
        }

        public int NumMatching
        {
            get;
            set;
        }
    }
}