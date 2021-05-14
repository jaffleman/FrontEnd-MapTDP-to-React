
export default function RequestStorageComparator(requestData, localStoAccess) {
    const newTabReq = [...requestData]
    const searchTab = []
    if (!localStoAccess) return newTabReq
    const sessionStockage = localStorage.getItem('sessionStockage')
    if (sessionStockage===null) return newTabReq
    const parseSession = JSON.parse(sessionStockage)
    if (!("data" in parseSession)) return newTabReq
    while(newTabReq.length>0){
        const req = newTabReq.shift()
        const comparator = ({tdpId})=>tdpId===req.rep+req.regletteType+req.regletteNbr
        const index = parseSession.data.findIndex(comparator)
        if (index === -1) searchTab.push(req)
    }
    return searchTab
}