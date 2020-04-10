
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

export const FilterRecursive = <SRC_TYPE>(
    srcArray: SRC_TYPE[],
    fFilter: (filterItems: SRC_TYPE[], iterItem: SRC_TYPE, idx: number) => boolean,
    fGetChildren: (iterItem: SRC_TYPE) => SRC_TYPE[],
    filteredItems: SRC_TYPE[]=[]
): SRC_TYPE[] => {

    let filteredItemsCopy=[...filteredItems];

    srcArray.forEach((iterItem, idx) => {

        if(fFilter(filteredItemsCopy, iterItem, idx)) {
            filteredItemsCopy.push(iterItem);
        }

        const children=fGetChildren(iterItem);
        if(children)
            filteredItemsCopy = filteredItemsCopy.concat(FilterRecursive(children, fFilter, fGetChildren, filteredItemsCopy));
    });

    return filteredItemsCopy;
};