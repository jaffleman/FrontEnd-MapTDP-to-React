import { Ferme } from './ferme'
export class Rco {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => {
      if (element.rco === identifiant) dataTab.push(element)
    })
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>{
        if (tab.length<1) tab.push(tdp.ferme)
        else {
          const compare = tab.findIndex(elem=>elem === tdp.ferme)
          if (compare === -1) tab.push(tdp.ferme)
        }
      })
      return tab.map(elem=>new Ferme(elem,dataTab))
    }
    this.number = identifiant
    this.ferme = find(dataTab)
  }
}