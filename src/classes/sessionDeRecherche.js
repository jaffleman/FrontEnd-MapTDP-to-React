import extraireLesDonnees from '../functions/extraireLesDonnees'
export class SessionDeRecherche{
    donneesExtraites
    valide
    constructor(textBrut){
        this.donneesExtraites=extraireLesDonnees(textBrut)
        this.valide=this.donneesExtraites.length>0?true:false
    }
}