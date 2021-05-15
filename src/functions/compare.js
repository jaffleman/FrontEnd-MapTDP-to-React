
export function compare(tabReq,tabRes, localStoAccess) {
    const storage = ()=>{
        if(!localStoAccess) return {'avalable':false}
        const parseData = JSON.parse(localStorage.getItem('sessionStockage'))
        if (!parseData) return {'avalable':false}
        if(!('data' in parseData)) return {'avalable':false}
        return {'avalable':true, 'data': [...parseData.data]}
    }
    const monStorage = storage()
    const tabTdp =[]
    while(tabReq.length>0){
        const req = tabReq.shift()
        const comparator = ({tdpId})=>tdpId===req.rep+req.regletteType+req.regletteNbr
        const index1 = tabRes.findIndex(comparator)
        if (index1 === -1) {
            if (monStorage.avalable){
                const index2 = monStorage.data.findIndex(comparator)
                if (index2 === -1) tabTdp.push({...req, "found":false})
                else tabTdp.push({...monStorage.data[index2], "plot":req.plot, "found":true, 'fetched':false})
            }else tabTdp.push({...req, "found":false})

        }else tabTdp.push({...tabRes[index1], "plot":req.plot, "found":true, 'fetched':true})
    }
    return tabTdp
}