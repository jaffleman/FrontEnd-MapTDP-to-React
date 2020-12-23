import {Rep} from './rep'
import {fetcher} from '../functions/fetcher'
import {compare} from '../functions/compare'
import {expend} from '../functions/expend'
export class Session{
  constructor(sessionData, callback=null) {
    fetcher(sessionData)
    .then((fetchedResult)=>{
      this.rep = getRep(expend(compare(sessionData,fetchedResult)))

      //function
      function getRep(sessionData){
        const tab = []
        sessionData.forEach(tdp => {
          if (tab.length < 1) tab.push(tdp.rep)
          else if (tab.findIndex(elem => elem === tdp.rep) === -1) tab.push(tdp.rep)
        })
        const obj = tab.map(elem => new Rep(elem, sessionData))
        if (callback===null) return obj
        else callback(obj)
      }//
    })
  }
}  