export function tdpExist(session, regletteType, regletteNbr){
    if (regletteNbr === '' || regletteType === 'x') return false
    const tabTdp = []
    session.rep.forEach(leRep => leRep.salle.forEach(laSalle => laSalle.rco.forEach(laRco => laRco.ferme.forEach(laFerme => laFerme.level.forEach(leLevel => leLevel.tdps.forEach(tdpa => tabTdp.push(tdpa)))))))
    
    if (typeof(regletteNbr) === 'object') {
        const tabNbr = []
        regletteNbr.forEach(element => {
            const elemToChange = tabTdp.find(tdp=>tdp._id === element && (tdp.regletteType === 'x' || tdp.regletteType !== regletteType))
            if (elemToChange) tabNbr.push(elemToChange)
        })
        const existTab = []
        tabNbr.forEach(nbr => {
            if (nbr.regletteNbr !== ''){
                const exist = tabTdp.find(element => element.regletteType === regletteType && element.regletteNbr === nbr.regletteNbr)
                if (exist) return existTab.push(exist)
            } 
        }) 
        if (existTab.length) {
            alert("La ou les reglettes suivantes existent déjà dans ce répartiteur: \n" + existTab.map(elem => " "+regletteType + elem.regletteNbr))
            return true
        }else return false
    }else{
        if (regletteNbr.length < 2  ) return false
        const exist = tabTdp.find(element => element.regletteType === regletteType && element.regletteNbr === regletteNbr)
        if (exist) {
            alert("La reglette "+exist.regletteType+exist.regletteNbr+" existe déjà dans ce répartiteur!")
            return true
        } else return false
    }
}