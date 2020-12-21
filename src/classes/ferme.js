import { Level } from './level'
export class Ferme {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => {
      if (element.ferme === identifiant) dataTab.push(element)
    })
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>{
        if (tab.length<1) tab.push(tdp.level)
        else {
          const compare = tab.findIndex(elem=>elem === tdp.level)
          if (compare === -1) tab.push(tdp.level)
        }
      })
      return tab.map(elem=>new Level(elem,dataTab))
    }
    this.number = identifiant
    this.level = find(dataTab)
  }
}