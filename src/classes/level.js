export class Level {
  constructor(identifiant, newTabTdp) {
    const dataTab = []
    newTabTdp.forEach(element => {
      if (element.level === identifiant) dataTab.push(element)
    })
    this.number = identifiant
    this.tdp = dataTab
  }
}