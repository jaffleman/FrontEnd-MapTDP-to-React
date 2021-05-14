export default function storageStock (fetchedData, localStoAccess){
    const newSession = fetchedData.filter(elem=>elem.fetched).map(element => {return  {...element, 'fetched':false}});
    if (localStoAccess){
        const sessionStockage = localStorage.getItem('sessionStockage')
        const date = new Date()
        if (sessionStockage){
            const parseSession = JSON.parse(sessionStockage)
            if('data' in parseSession){
                localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'data':[...parseSession.data, ...newSession], 'date':date.toDateString()}))
            }else localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'data':newSession, 'date':date.toDateString()}))
        }else localStorage.setItem('sessionStockage', JSON.stringify({'data':newSession, 'date':date.toDateString()}))
    }
} 