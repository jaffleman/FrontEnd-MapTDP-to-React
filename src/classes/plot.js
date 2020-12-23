export class Plot {
     
    constructor(text) {
        const div = text.split(' ');
        this.rep = div[0].slice(0, 5).toLowerCase();
        this.cd = parseInt(div[0].slice(3,5)) 
        this.regletteType = div[1].length === 9 ? (div[1].slice(0, 1) + '/' + div[1].slice(1, 4)).toUpperCase() : div[1].slice(0, 5).toUpperCase();
        this.regletteNbr =  div[1].slice(-5, -3).toUpperCase();
        this.plot = [div[1].slice(-3)]
    }
}
