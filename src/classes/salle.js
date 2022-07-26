import { Rco } from  './rco'
export class Salle {
  constructor(identifiant, newTabTdp) {
    const dataTab = newTabTdp.filter(element => element.salle === identifiant)
    console.log(dataTab)
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>tab.findIndex(elem=>elem === tdp.rco) === -1? tab.push(tdp.rco):null)
      return tab.map(elem=>new Rco(elem,dataTab))
    }
    this.number = identifiant
    this.rco = find(dataTab)
  }
}