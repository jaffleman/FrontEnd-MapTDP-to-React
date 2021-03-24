import {Rep} from './rep'
import {fetcher} from '../functions/fetcher'
import {compare} from '../functions/compare'
import {expend} from '../functions/expend'
export class Session{
  
  constructor(sessionData, callback=(obj)=>{return obj}) {
    this.brutdata = sessionData
    fetcher("search","POST",sessionData)
    .then((fetchedResult)=>{
      this.rep = getRep(expend(compare(sessionData,fetchedResult)))

      function getRep(sessionData){
        const tab = []
        sessionData.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
        const obj = tab.map(elem => new Rep(elem, sessionData))
        return callback(obj)
      }
    })
  }
}  