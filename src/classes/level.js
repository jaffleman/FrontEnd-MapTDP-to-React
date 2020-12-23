export class Level {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => element.level === identifiant? dataTab.push(element):null)
    this.number = identifiant
    this.tdp = dataTab
  }
}