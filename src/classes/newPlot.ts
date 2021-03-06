export default class newPlot {
    rep: string
    cd: number
    regletteType: string
    regletteNbr: string
    plot : string[]
    tdpId: string
   constructor(text: string) {
       const div = text.split(' ');
       this.rep = div[0].slice(0, 5).toLowerCase();
       this.cd = parseInt(div[0].slice(3,5))
       if (div[1].length<8) div[1] = div[1]+'xxx'
       this.regletteType = div[1].length === 9 ? (div[1].slice(0, 1) + '/' + div[1].slice(1, 4)).toUpperCase() : div[1].slice(0, 5).toUpperCase();
       this.regletteNbr =  div[1].slice(-5, -3).toUpperCase()
       this.plot = [div[1].slice(-3)]
       this.tdpId = this.rep+this.regletteType+this.regletteNbr
   }
}