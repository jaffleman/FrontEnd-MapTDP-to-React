import {Rep} from './rep'
import {fetcher} from '../functions/fetcher'
import {compare} from '../functions/compare'
import {expend} from '../functions/expend'
import storageStock from '../functions/storageStockage'
import extraireLesDonnees from '../functions/extraireLesDonnees'
import RequestStorageComparator from '../functions/RequestStorageComparator'

export class SessionDeRecherche{
    donneesExtraites
    session
    valide

    constructor(textBrut, localStoAccess){
        this.donneesExtraites=extraireLesDonnees(textBrut)
        //this.valide=this.donneesExtraites.length>0?true:false
        if (this.donneesExtraites.length>0) {
            fetcher("search","POST",RequestStorageComparator(this.donneesExtraites, localStoAccess))
            .then((fetchedResult)=>{
                if ('data' in fetchedResult){
                    const expendTdp = expend(compare(this.donneesExtraites,fetchedResult.data, localStoAccess))
                    storageStock(expendTdp, localStoAccess)
                    //this.getRep(expendTdp)
                    const tab = []
                    expendTdp.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
                    this.session = tab.map(elem => new Rep(elem, expendTdp))
                    this.valide = true
              }else this.valide = false
            })
        }
    }
}