/*
pour chaque element du tableau reçu en argument de la fonction
    determiner le nombre obtenu par concaténation des propriétés suivante:
        Salle+Rco+Ferme+Level
    injecter ce nombre dans une nouvelle propriété appelée position
trier les elements du tableau par ordre croissant en se référant a la propriété position
*/

export default function sorter(tab) {
    const newTab =[]
    tab.forEach(e => {
        const rectifyFerme = e.ferme<10?"0"+e.ferme:e.ferme
        newTab.push({...e, position: parseInt(""+e.salle+e.rco+rectifyFerme+e.level)}) 

    })
    newTab.sort((a, b)=> { return a.position - b.position })
    return newTab
}