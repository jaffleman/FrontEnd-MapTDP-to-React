import { Tdp } from './Tdp'
export class Level {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => element.level === identifiant? dataTab.push(element):null)
    this.number = identifiant
    this.tdps = dataTab.map(elem=>new Tdp(elem))
  }
}