export default function ResponsestorageComparator(fetchedData,localStorageCurrentData) {
    const newTabReq = [...fetchedData]
    while(newTabReq.length>0){
        const req = newTabReq.shift()
        const comparator = ({tdpId, plot})=>tdpId===req.tdpId&&plot===req.plot
        const index = localStorageCurrentData.findIndex(comparator)
        if (index === -1) localStorageCurrentData.push(req)
    }
    return localStorageCurrentData
}