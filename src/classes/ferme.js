import { Level } from './level'
import { Tdp } from './Tdp'
export class Ferme {
  constructor(identifiant, newTabTdp) {
    function fullfil(data){
      const newTab = []
      for (let index = 1; index < 9; index++) {
        const match = data.find(elem=>elem.number===index)
        
        newTab.push(match===undefined?(
          {'number':index, 'tdps':[
            new Tdp(
              {
                cd: data[0].tdps[0].cd,
                ferme: data[0].tdps[0].ferme,
                found: undefined,
                level: index,
                option: null,
                rco: data[0].tdps[0].rco,
                regletteNbr: "...",
                regletteType: "x",
                rep: data[0].tdps[0].rep,
                salle: data[0].tdps[0].salle,
                _id: data[0].tdps[0].cd+data[0].tdps[0].rep+data[0].tdps[0].salle+data[0].tdps[0].rco+data[0].tdps[0].ferme+index,
              }
            )
          ]}
        ):match)
      }
      return newTab
    }

    const dataTab = []
    newTabTdp.forEach(element => element.ferme === identifiant? dataTab.push(element):null)
    function find(dataTab){
      const tab=[]
      dataTab.forEach(tdp=>tab.findIndex(elem=>elem === tdp.level) === -1? tab.push(tdp.level):null)
      return tab.map(elem=>new Level(elem,dataTab))
    }
    this.number = identifiant
    const tabLevel = find(dataTab)
    if (tabLevel.length !== 8) this.level = fullfil(tabLevel)
    else this.level = [...tabLevel]
  }
}