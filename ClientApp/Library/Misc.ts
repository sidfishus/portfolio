
export const IsAlpha = (chr: string): boolean => {

    if(
        (chr>='0' && chr<='9') ||
        (chr>='a' && chr<='z') ||
        (chr>='A' && chr<='Z')
    ){
        return true;
    }

    return false;
};

const INT32_MAX=2147483647;
const INT32_MIN=-2147483648;
export const IsA32BitSignedNumber = (val: string): boolean => {

    const asNum=parseInt(val,10);
    let rv=(val && val!=="" && !isNaN(asNum));
    if(rv) {
        rv=(asNum>=INT32_MIN && asNum<=INT32_MAX);
    }
    return rv;
};