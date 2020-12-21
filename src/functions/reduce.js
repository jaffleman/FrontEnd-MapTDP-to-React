export function reduce(tabA) {
    /*
        Merge items with same parameters
        input: Array<Plot>
        output: Array<Plot>
    */
    const tabB =[]
    while(tabA.length>0){
        const elementA = tabA.shift()
        const comparator = elementB=>elementB.rep === elementA.rep && elementB.regletteType === elementA.regletteType && elementB.regletteNbr === elementA.regletteNbr
        
        const index = tabB.findIndex(comparator)
        if (index === -1) tabB.push(elementA)
        else tabB[index].plot.push(elementA.plot[0])
    }
    return tabB
}