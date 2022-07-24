import newPlot from "../classes/newPlot"

export function reduce(tabA:newPlot[]):newPlot[] {
    /*
        Merge items with same parameters
        input: Array<Plot>
        output: Array<Plot>
    */
    const tabB:newPlot[]=[]
    while(tabA.length>0){
        const A = tabA.shift()||new newPlot()
        const comparator = ({tdpId}:newPlot)=>tdpId === A.tdpId
        const index = tabB.findIndex(comparator)
        if (index === -1) tabB.push(A)
        else tabB[index].plot.push(A.plot[0])
    }
    return tabB
}