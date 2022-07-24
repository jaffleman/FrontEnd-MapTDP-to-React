import LocalStorageManager from "../classes/LocalStorageManager"

export function compare(tabReq,tabRes, localStoAccess) {
    const localSto = new LocalStorageManager()
    const tabTdp =[]
    while(tabReq.length>0){
        const req = tabReq.shift()
        const comparator = ({tdpId})=>tdpId===req.rep+req.regletteType+req.regletteNbr
        const index1 = tabRes.findIndex(comparator)
        if (index1 === -1) {
            if (localSto.getIsActive()){
                const localStoTdpTab = [...localSto.getTdps()]
                const index2 = localStoTdpTab.findIndex(comparator)
                if (index2 === -1) tabTdp.push({...req, "found":false})
                else tabTdp.push({...localStoTdpTab[index2], "plot":req.plot, "found":true, 'fetched':false})
            }else tabTdp.push({...req, "found":false})

        }else tabTdp.push({...tabRes[index1], "plot":req.plot, "found":true, 'fetched':true})
    }
    return tabTdp
}