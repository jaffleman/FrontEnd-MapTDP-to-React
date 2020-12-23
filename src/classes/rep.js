import { Salle } from './salle'
export class Rep {
  constructor(identifiant, newTabTdp) {
    const dataTab =[]
    newTabTdp.forEach(element => element.rep === identifiant? dataTab.push(element):null)
    function find(dataTab){
        const tab=[]
        dataTab.forEach(tdp=> tab.findIndex(elem=>elem === tdp.salle) === -1? tab.push(tdp.salle):null)
      return tab.map(elem=>new Salle(elem,dataTab))
    }
    this.name = identifiant
    this.salle = find(dataTab)
  }
}