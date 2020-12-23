class FullTdp {
    constructor(rep, reglette, salle, rco, ferme, level, option) {
        this.rep = rep;
        this.salle = salle;
        this.rco = rco;
        this.ferme = ferme;
        this.level = level;
        this.option = option ? option : null;
        this.cd = parseInt(rep.slice(-2));
        this.regletteType = reglette.slice(0, 5);
        this.regletteNbr = reglette.slice(-2);
    }
}
 const stuctToTdpConvert = (repartiteur, stucture)=>{
    const rep = repartiteur;
    const tdpTab = [];
    const repTab = [...stucture.tab];
    for (let salle = 0; salle < repTab.length; salle++) {
        for (let rco = 0; rco < repTab[salle].length; rco++) {
            for (let ferme = 0; ferme < repTab[salle][rco].length; ferme++) {
                for (let level = 0; level < repTab[salle][rco][ferme].length; level++) {
                    if (repTab[salle][rco][ferme][level][0] !== 'x')
                        tdpTab.push(new FullTdp(rep, (repTab[salle][rco][ferme][level][0]), salle + 1, rco + 1, ferme + 1, level + 1, repTab[salle][rco][ferme][level][1] === undefined ? null : repTab[salle][rco][ferme][level][1]));
                }
            }
        }
    }
    return tdpTab;
}
export default stuctToTdpConvert