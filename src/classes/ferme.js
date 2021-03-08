import { Level } from './level'
export class Ferme {
  constructor(identifiant, newTabTdp) {
    

    const dataTab = []
    newTabTdp.forEach(element => element.ferme === identifiant? dataTab.push(element):null)
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>tab.findIndex(elem=>elem === tdp.level) === -1? tab.push(tdp.level):null)
      return tab.map(elem=>new Level(elem,dataTab)).sort((a,b)=>a.number-b.number)
    }
    this.number = identifiant
    this.level = find(dataTab)
  }
}