export default function tabSorter(tabOrigine, tabModifier) {

    const tCreatedElem = tabModifier.filter(elem => elem.status === "ghost" && elem.regletteType !== 'x' && elem.regletteNbr.length === 2)
    const tEditedElem1 = tabModifier.filter(elem => elem.status === 'original' && elem.regletteType !== 'x' && elem.regletteNbr.length === 2)
    const tEditedElem = tEditedElem1.filter(elem => {
        const i = tabOrigine.findIndex(elemO => elemO._id === elem._id)
        return (elem.regletteType !== tabOrigine[i].regletteType || elem.regletteNbr !== tabOrigine[i].regletteNbr || elem.option !== tabOrigine[i].option)
    })
    const tDeletedElem = tabModifier.filter(elem => elem.status === 'original' && elem.regletteNbr === '' && elem.regletteType === 'x')

    //tabOrigine.forEach(elem=> {if (tabModifier.findIndex(elemO=>elemO._id === elem._id)===-1) tDeletedElem.push(elem)})
    return {
        tCreatedElem,
        tEditedElem,
        tDeletedElem
    }
}