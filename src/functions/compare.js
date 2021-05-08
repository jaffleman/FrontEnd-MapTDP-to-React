import storageAvailable from '../functions/storageCheck'
export function compare(tabReq,tabRes) {
    let storage = false
    if (storageAvailable('localStorage')){
        const parseLocalStorage = JSON.parse(localStorage.getItem('sessionStockage'))
        if (parseLocalStorage && 'data' in parseLocalStorage) storage = parseLocalStorage
    }

    const tabTdp =[]
    while(tabReq.length>0){
        const req = tabReq.shift()
        const comparator = ({tdpId})=>tdpId===req.rep+req.regletteType+req.regletteNbr
        const index1 = tabRes.findIndex(comparator)
        if (index1 === -1 && storage !== false) {
            const index2 = storage.data.findIndex(comparator)
            if (index2 === -1)tabTdp.push({...req, "found":false})
            else tabTdp.push({...storage.data[index2], "plot":req.plot, "found":true})
        }else tabTdp.push({...tabRes[index1], "plot":req.plot, "found":true})
    }
    return tabTdp
}