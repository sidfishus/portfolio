
// Sometimes you need to map an array to a new type, whilst simulataneously removing one of the items specified by an index
export const MapAndRemoveIndex = <SRC_TYPE,DEST_TYPE>(
    array: SRC_TYPE[],
    indexToRemove: number,
    fMap: (item: SRC_TYPE, idx: number) => DEST_TYPE
): DEST_TYPE[] => {

    if(array.length<=1) {
        return [];
    }

    const res=new Array<DEST_TYPE>(array.length-1);
    for(let i=0, destI=0; i<array.length; ++i) {

        if(i !== indexToRemove) {
            res[destI] = fMap(array[i],destI);
            ++destI;
        }
    }

    return res;
};