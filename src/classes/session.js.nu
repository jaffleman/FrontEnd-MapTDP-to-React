import {Rep} from './rep'
import {fetcher} from '../functions/fetcher'
import {compare} from '../functions/compare'
import {expend} from '../functions/expend'
import storageStock from '../functions/storageStockage'
import RequestStorageComparator from '../functions/RequestStorageComparator'
export class Session{
  constructor(sessionData, callback, callback2, localStoAccess) {
    fetcher("search","POST",RequestStorageComparator(sessionData, localStoAccess))
    .then((fetchedResult)=>{
      if ('data' in fetchedResult){
        const expendTdp = expend(compare(sessionData,fetchedResult.data, localStoAccess))
        storageStock(expendTdp, localStoAccess)
        this.rep = getRep(expendTdp)

        function getRep(data){
          const tab = []
          data.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
          const obj = tab.map(elem => new Rep(elem, data))
          return callback(obj)
        }
        
      }else callback2()
    })
  }
}  