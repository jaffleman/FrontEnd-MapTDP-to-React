export function compare(tabReq,tabRes) {
    const tabTdp =[]
    while(tabReq.length>0){
        const req = tabReq.shift()
        const comparator = ({rep, regletteType, regletteNbr})=>rep === req.rep && regletteType === req.regletteType && regletteNbr === req.regletteNbr
        
        const index = tabRes.findIndex(comparator)
        if (index === -1) tabTdp.push({...req, "found":false})
        else tabTdp.push({...tabRes[index], "plot":req.plot, "found":true})
    }
    return tabTdp
}