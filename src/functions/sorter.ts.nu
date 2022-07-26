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
   return (tab.map(tdp => ({...tdp, position: parseInt(""+tdp.salle+tdp.rco+((tdp.ferme)<10?"0"+tdp.ferme:tdp.ferme)+tdp.level)})))
   .sort((a, b)=> { return a.position - b.position })
}