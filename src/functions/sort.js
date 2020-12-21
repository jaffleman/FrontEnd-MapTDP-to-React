
export function sort(params) {
    const tabCd = [], tabRep = [], tabSalle =[], tabRco =[], tabFerme =[], tabLevel =[]
    const search = (tdp)=>{
        if (tabCd.length===0) tabCd.push(tdp.cd)
        else if (tabCd.findIndex(elem=>elem===tdp.cd)===-1) tabCd.push(tdp.cd) 

        if (tabRep.length===0) tabRep.push(tdp.rep)
        else if (tabRep.findIndex(elem=>elem===tdp.rep)===-1) tabRep.push(tdp.rep) 

        if (tabSalle.length===0) tabSalle.push(tdp.salle)
        else if (tabSalle.findIndex(elem=>elem===tdp.salle)===-1) tabSalle.push(tdp.salle)

        if (tabRco.length===0) tabRco.push(tdp.rco)
        else if (tabRco.findIndex(elem=>elem===tdp.rco)===-1) tabRco.push(tdp.rco)

        if (tabFerme.length===0) tabFerme.push(tdp.ferme)
        else if (tabFerme.findIndex(elem=>elem===tdp.ferme)===-1) tabFerme.push(tdp.ferme)

        if (tabLevel.length===0) tabLevel.push(tdp.level)
        else if (tabLevel.findIndex(elem=>elem===tdp.level)===-1) tabLevel.push(tdp.level)
    }
    params.forEach(search)
    const compare = (x,y)=> x-y
    tabFerme.sort(compare)
    tabCd.sort(compare)
    tabRco.sort(compare)
    tabLevel.sort(compare)
    tabSalle.sort(compare)
    tabRep.sort()
    const orderTab =[]
     params.map(tdp=>{
         tabCd.map(cd=>{
            if (cd === tdp.cd){ 
                tabRep.map(rep=>{
                    if (rep === tdp.rep){
                        tabSalle.map(salle=>{
                            if (salle === tdp.salle) {
                                tabRco.map(rco=>{
                                    if (rco === tdp.rco) {
                                        tabFerme.map(ferme=> {if (ferme === tdp.ferme) orderTab.unshift(tdp)})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })
    // {"tabCd":tabCd, "tabRep":tabRep, "tabSalle":tabSalle, "tabRco":tabRco, "tabFerme":tabFerme, "tabLevel":tabLevel}
    return orderTab
}