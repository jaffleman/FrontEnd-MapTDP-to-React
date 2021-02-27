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
  addSalle(ndFerme){
    console.log('ajout de salle')
    const cd = this.salle[0].rco[0].ferme[0].level[0].tdps[0].cd
    const rep = this.salle[0].rco[0].ferme[0].level[0].tdps[0].rep
    const salleCount = this.salle.length+1
    const newSalle = [...this.salle, new Salle(salleCount, [
      {
        cd,
        ferme: ndFerme,
        found: undefined,
        level: 1,
        option: null,
        rco: 1,
        regletteNbr: "...",
        regletteType: "x",
        rep,
        salle: salleCount,
        _id: cd+rep+salleCount+1+ndFerme+1,
      }
    ])]
    this.salle = newSalle
    return this.salle
  }
}