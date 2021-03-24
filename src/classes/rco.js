import { Ferme } from './ferme'
export class Rco {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => element.rco === identifiant? dataTab.push(element):null)
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>tab.findIndex(elem=>elem === tdp.ferme) === -1? tab.push(tdp.ferme):null)
      return tab.map((elem,index)=>new Ferme(elem,dataTab,index))
    }
    this.number = identifiant
    this.ferme = find(dataTab)
  }
  addFerme(){
  }
}