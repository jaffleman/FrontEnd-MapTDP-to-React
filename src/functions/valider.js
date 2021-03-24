export default function tabSorter(tabOrigine, tabModifier){
    function isDefined(elem){
        if (elem.regletteType==="x" || elem.regletteNbr==="") return false
        else return true
    }
    const tCreatedElem =[]
    const tEditedElem =[]
    const tDeletedElem =[]

    tabModifier.forEach(elem=>{
        if (elem.status === "ghost" && elem.regletteNbr !== '' && elem.regletteType !== 'x'){
            tCreatedElem.push(elem)
        }
        else if (elem.status === "original" && isDefined(elem)){
            const i = tabOrigine.findIndex(elemO=>elemO._id === elem._id)
            if (elem.regletteType!==tabOrigine[i].regletteType || elem.regletteNbr!==tabOrigine[i].regletteNbr || elem.option!==tabOrigine[i].option) {
                tEditedElem.push(elem)
            }
        }
    })
    tabModifier.forEach(elem=>{
        if (elem.status === "original" && elem.regletteNbr==='' && elem.regletteType==='x'){
            tDeletedElem.push(elem)
        }
    })
    tabOrigine.forEach(elem=> {if (tabModifier.findIndex(elemO=>elemO._id === elem._id)===-1) tDeletedElem.push(elem)})
    return {tCreatedElem, tEditedElem, tDeletedElem}
}