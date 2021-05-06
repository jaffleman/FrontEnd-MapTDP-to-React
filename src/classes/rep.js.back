import { Salle } from './salle'
export class Rep {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => {
      if (element.rep === identifiant) dataTab.push(element)
    })
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>{
        if (tab.length<1) tab.push(tdp.salle)
        else {
          const compare = tab.findIndex(elem=>elem === tdp.salle)
          if (compare === -1) tab.push(tdp.salle)
        }
      })
      return tab.map(elem=>new Salle(elem,dataTab))
    }
    this.name = identifiant
    this.salle = find(dataTab)
  }
}