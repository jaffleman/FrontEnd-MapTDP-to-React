
import storageAvailable from './storageCheck'
export default function RequestStorageComparator(requestData) {
    const newTabReq = [...requestData]
    const searchTab = []
    if (storageAvailable('localStorage')){
        const sessionStockage = localStorage.getItem('sessionStockage')
        if (sessionStockage!=null){
            const parseSession = JSON.parse(sessionStockage)
            if (parseSession.data){
                while(newTabReq.length>0){
                    const req = newTabReq.shift()
                    const comparator = ({tdpId})=>tdpId===req.rep+req.regletteType+req.regletteNbr
                    const index = parseSession.data.findIndex(comparator)
                    if (index === -1) searchTab.push(req)
                }
                console.log(searchTab)
                return searchTab
            }else{
                console.log(newTabReq)
                return newTabReq
            }
        }else {
            console.log(newTabReq)
            return newTabReq
        }
    }else {
        console.log(newTabReq)
        return newTabReq
    }
}