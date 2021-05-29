export function reduce(tabA) {
    /*
        Merge items with same parameters
        input: Array<Plot>
        output: Array<Plot>
    */
    const tabB =[]
    while(tabA.length>0){
        const A = tabA.shift()
        const comparator = ({tdpId})=>tdpId === A.tdpId
        
        const index = tabB.findIndex(comparator)
        if (index === -1) tabB.push(A)
        else tabB[index].plot.push(A.plot[0])
    }
    return tabB
}