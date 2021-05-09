import storageAvailable from './storageCheck'
export default function storageStock (fetchedData){
    const newSession = fetchedData.filter(elem=>elem.fetched).map(element => {return  {...element, 'fetched':false}});
    if (storageAvailable('localStorage')){
        const sessionStockage = localStorage.getItem('sessionStockage')
        const date = new Date()
        if (sessionStockage){
            const parseSession = JSON.parse(sessionStockage)
            console.log(parseSession)
            if('data' in parseSession){
                const concatab = [...parseSession.data, ...newSession]
                console.log(concatab)
                localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'data':[...parseSession.data, ...newSession], 'date':date.toDateString()}))
            }else localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'data':newSession, 'date':date.toDateString()}))
        }else localStorage.setItem('sessionStockage', JSON.stringify({'data':newSession, 'date':date.toDateString()}))
    }
} 