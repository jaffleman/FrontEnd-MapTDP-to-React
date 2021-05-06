import extraireLesDonnees from '../functions/extraireLesDonnees'
export class SessionDeRecherche{
    donneesExtraites
    nombreDeTestDemande
    valide
    time
    constructor(textBrut){
        this.time= new Date()
        this.donneesExtraites=extraireLesDonnees(textBrut)
        this.nombreDeTestDemande=this.donneesExtraites.length
        this.valide=this.nombreDeTestDemande>0?true:false
        this.jsonData = [this.time, this.donneesExtraites]
        
    }
}