import ResponseStorageComparator from './ResponseStorageComparator'
import storageAvailable from './storageCheck'
export default function storageStock (fetchedData){
    if (storageAvailable('localStorage')){
        const sessionStockage = localStorage.getItem('sessionStockage')
        const date = new Date()
        if (sessionStockage!=null){
            
                const parseSession = JSON.parse(sessionStockage)
                const newSession = ResponseStorageComparator(fetchedData,parseSession.data)
                localStorage.setItem('sessionStockage', JSON.stringify({'data':newSession, 'date':date.toDateString()}))
           
        }else{
            localStorage.setItem('sessionStockage', JSON.stringify({'data':fetchedData, 'date':date.toDateString()}))
        }
    }
} 