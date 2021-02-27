import {Rep} from './rep'

export default class ExtraSession{
    brutdata
    rep
    repName
    cd
    salleNumber
    constructor(sessionData){
        this.brutdata = sessionData
        const tab = []
        const reverseData = sessionData
        this.brutdata.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
        this.rep = tab.map(elem => new Rep(elem, this.brutdata))
        this.repName = this.rep[0].name
        this.cd = this.repName.slice(-2) 
        this.salleNumber = this.rep[0].salle.length
    }
    getRcoNumber(id){
        return this.rep[0].salle[id].rco.length
    }

    modifRegType(itemId, value){
        const elem = this.brutdata.findIndex(tdp=>tdp._id===itemId)
        const newBrut = [...this.brutdata]
        newBrut[elem] = {...this.brutdata[elem], regletteType:value}
        return new ExtraSession(newBrut)
    }
    modifRegNbr(itemId, value){
        const elem = this.brutdata.findIndex(tdp=>tdp._id===itemId)
        const newBrut = [...this.brutdata]
        newBrut[elem] = {...this.brutdata[elem], regletteNbr:value}
        return new ExtraSession(newBrut)
    }
    modifOption(itemId, value){
        const elem = this.brutdata.findIndex(tdp=>tdp._id===itemId)
        const newBrut = [...this.brutdata]
        newBrut[elem] = {...this.brutdata[elem], option:value==="null"?null:value}
        return new ExtraSession(newBrut)
    }

    addSalle(){
        const ndFerme =  parseInt(prompt('Quel est le numéro de la première ferme de la première rco?'))
        if (ndFerme<1||isNaN(ndFerme)) return new ExtraSession(this.brutdata)
        const newSalleNd = this.salleNumber+1 
        this.brutdata.push({
            cd: this.cd,
            ferme: ndFerme,
            found: undefined,
            level: 1,
            option: null,
            rco: 1,
            regletteNbr: "...",
            regletteType: "x",
            rep : this.repName,
            salle: newSalleNd,
            _id: this.cd + this.rep + newSalleNd + 1 + ndFerme + 1,
        })
        return new ExtraSession(this.brutdata)
    }
    addRco(){
        const idSalle = this.salleNumber>1? parseInt(prompt('dans quelle salle?')) : 1
        if (isNaN(idSalle<1||isNaN(idSalle)||idSalle>this.salleNumber)) return new ExtraSession(this.brutdata)
        const ndFerme =  parseInt(prompt('Quel est le numéro de la première ferme de cette rco?'))
        if (ndFerme<1||isNaN(ndFerme)) return new ExtraSession(this.brutdata)
        const newRcoNd = this.rep[0].salle[idSalle-1].rco.length+1 
        this.brutdata.push({
            cd: this.cd,
            ferme: ndFerme,
            found: undefined,
            level: 1,
            option: null,
            rco: newRcoNd,
            regletteNbr: "...",
            regletteType: "x",
            rep : this.repName,
            salle: idSalle,
            _id: this.cd + this.rep + idSalle + newRcoNd + ndFerme + 1,
        })
        return new ExtraSession(this.brutdata)
    }
    addFerme(){
        const idSalle = this.salleNumber>1? parseInt(prompt('dans quelle salle?')) : 1
        if (isNaN(idSalle<1||isNaN(idSalle)||idSalle>this.salleNumber)) return new ExtraSession(this.brutdata)
        const rcoNumber = this.getRcoNumber(idSalle-1)
        const idRco = rcoNumber>1? parseInt(prompt('dans quelle rco?')) : 1
        if (isNaN(idRco<1||isNaN(idRco)||idRco>rcoNumber)) return new ExtraSession(this.brutdata)
        const ndFerme =  parseInt(prompt('Quel est le numéro de la ferme ?'))
        const fermeExist = this.rep[0].salle[idSalle-1].rco[idRco-1].ferme.findIndex(elem=>elem.number===ndFerme)===-1?false:true
        if (ndFerme<1||isNaN(ndFerme)||fermeExist) return new ExtraSession(this.brutdata)
        this.brutdata.push({
            cd: this.cd,
            ferme: ndFerme,
            found: undefined,
            level: 1,
            option: null,
            rco: rcoNumber,
            regletteNbr: "...",
            regletteType: "x",
            rep : this.repName,
            salle: idSalle,
            _id: this.cd + this.rep + idSalle + rcoNumber + ndFerme + 1,
        })
        return new ExtraSession(this.brutdata)
    }
}