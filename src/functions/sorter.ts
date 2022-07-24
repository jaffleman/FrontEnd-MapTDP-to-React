/*
pour chaque element du tableau reçu en argument de la fonction
    determiner le nombre obtenu par concaténation des propriétés suivante:
        Salle+Rco+Ferme+Level
    injecter ce nombre dans une nouvelle propriété appelée position
trier les elements du tableau par ordre croissant en se référant a la propriété position
*/
import { Tdp } from "../classes/Tdp"
interface sorterTdp extends Tdp{
    position:number
}
export default function sorter(tab:Tdp[]) {
    const newTab:sorterTdp[] =[]
    tab.forEach(tdp => {
        const rectifyFerme = (tdp.ferme)<10?"0"+tdp.ferme:tdp.ferme
        newTab.push({...tdp, position: parseInt(""+tdp.salle+tdp.rco+rectifyFerme+tdp.level)}) 
    })
    newTab.sort((a, b)=> { return a.position - b.position })
    return newTab
}