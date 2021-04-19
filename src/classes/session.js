import {Rep} from './rep'
import {fetcher} from '../functions/fetcher'
import {compare} from '../functions/compare'
import {expend} from '../functions/expend'
import storageStock from '../functions/storageStockage'
import RequestStorageComparator from '../functions/RequestStorageComparator'
export class Session{
  constructor(sessionData, callback, callback2) {
    fetcher("search","POST",RequestStorageComparator(sessionData))
    .then((fetchedResult)=>{
      console.log(fetchedResult)
      if (fetchedResult.data){
        //const altern = []
        const expention = expend(compare(sessionData,fetchedResult.data))
        storageStock(expention)
        this.rep = getRep(expention)
        function getRep(data){
          const tab = []
          data.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
          const obj = tab.map(elem => new Rep(elem, data))

          return callback(obj)
        }
      }else if (fetchedResult.err) callback2()
    })
  }
}  