export function compare(tabReq,tabRes) {
    const tabTdp =[]
    while(tabReq.length>0){
        const elementReq = tabReq.shift()
        const comparator = elementRes=>elementRes.rep === elementReq.rep && elementRes.regletteType === elementReq.regletteType && elementRes.regletteNbr === elementReq.regletteNbr
        
        const index = tabRes.findIndex(comparator)
        if (index === -1) tabTdp.push({...elementReq, "found":false})
        else tabTdp.push({...tabRes[index], "plot":elementReq.plot, "found":true})
    }
    return tabTdp
}