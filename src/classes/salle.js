import { Rco } from  './rco'
export class Salle {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => {
      if (element.salle === identifiant) dataTab.push(element)
    })
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>{
        if (tab.length<1) tab.push(tdp.rco)
        else {
          const compare = tab.findIndex(elem=>elem === tdp.rco)
          if (compare === -1) tab.push(tdp.rco)
        }
      })
      return tab.map(elem=>new Rco(elem,dataTab))
    }
    this.number = identifiant
    this.rco = find(dataTab)
  }
}