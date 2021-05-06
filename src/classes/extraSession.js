import {Rep} from './rep'
import sorter from '../functions/sorter'

export default class ExtraSession{
    brutdata
    rep
    repName
    cd
    salleNumber
    constructor(sessionData, repName){
        //if (sessionStorage.length===0) return {error:'une erreur'}
        if (sessionData.length!==0) {

            const newSessionData = sorter(sessionData).map((elem)=>{
                if (!elem.status){
                    return {...elem, status: "original"}
                }else{
                    return elem
                }        
            })
            this.brutdata = newSessionData
            this.repName = repName
            //const tab = []
            //this.brutdata.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
            this.rep = [new Rep(repName, this.brutdata)]
            this.cd = repName.slice(-2) 
            this.salleNumber = this.rep[0].salle.length
            const newTab = []
            this.rep.forEach(elem=>{
                elem.salle.forEach(elemSalle=>{
                    elemSalle.rco.forEach(elemRco=>{
                        elemRco.ferme.forEach(elemFerme=>{
                            if (elemFerme.level.length!==8){
                                for (let index = 1; index < 9; index++) {
                                    const match = elemFerme.level.find(elem=>elem.number===index)
                                    if (match===undefined){
                                        newTab.push({
                                            tdpId:"",
                                            status: "ghost",
                                            cd: this.cd,
                                            ferme: elemFerme.number,
                                            found: undefined,
                                            level: index,
                                            option: null,
                                            rco: elemRco.number,
                                            regletteNbr: "",
                                            regletteType: "x",
                                            rep: this.repName,
                                            salle: elemSalle.number,
                                            _id: this.cd + this.repName + elemSalle.number + elemRco.number + elemFerme.number + index,
                                        })
                                    }
                            
                                }
                            }
                        })
                    })
                })
            })
            
            if (newTab.length>0) {
                const newArray = sessionData.concat(newTab)
                return new ExtraSession(newArray, this.repName)
            }
        }
    }
    getRcoNumber(id){
        return this.rep[0].salle[id].rco.length
    }

    modifRegType(itemId, value){
        const newBrut = [...this.brutdata]
        itemId.forEach(element => {
            const elem = this.brutdata.findIndex(tdp=>tdp._id===element)
            newBrut[elem] = {...this.brutdata[elem], regletteType:value, tdpId:this.regletteNbr==='x'?'':""+this.brutdata[elem].rep+value+this.brutdata[elem].regletteNbr} 
        })
        return new ExtraSession(newBrut,this.repName)
    }
    modifRegNbr(itemId, value){
        const newBrut = [...this.brutdata]
        itemId.forEach(element => {
            const elem = this.brutdata.findIndex(tdp=>tdp._id===element)
            newBrut[elem] = {...this.brutdata[elem], regletteNbr:value , tdpId:this.regletteType===""?"":""+this.brutdata[elem].rep+this.brutdata[elem].regletteType+value} 
        })
        return new ExtraSession(newBrut,this.repName)
    }
    modifOption(itemId, value){
        const newBrut = [...this.brutdata]
        itemId.forEach(element => {
            const elem = this.brutdata.findIndex(tdp=>tdp._id===element)
            newBrut[elem] = {...this.brutdata[elem], option:value==="null"?null:value}
        })
        return new ExtraSession(newBrut, this.repName)
    }

    addSalle(){
        const ndFerme =  parseInt(prompt('Quel est le numéro de la première ferme de la première rco?'))
        if (ndFerme<1||isNaN(ndFerme)) return new ExtraSession(this.brutdata, this.repName)
        const newSalleNd = this.salleNumber+1 
        for (let index = 1; index < 9; index++) {
            this.brutdata.push({
                tdpId:"",
                status: "ghost",
                cd: this.cd,
                ferme: ndFerme,
                found: undefined,
                level: index,
                option: null,
                rco: 1,
                regletteNbr: "",
                regletteType: "x",
                rep : this.repName,
                salle: newSalleNd,
                _id: this.cd + this.rep + newSalleNd + 1 + ndFerme + index,
            })
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    addRco(){
        const idSalle = this.salleNumber>1? parseInt(prompt('dans quelle salle?')) : 1
        if (isNaN(idSalle<1||isNaN(idSalle)||idSalle>this.salleNumber)) return new ExtraSession(this.brutdata, this.repName)
        const ndFerme =  parseInt(prompt('Quel est le numéro de la première ferme de cette rco?'))
        if (ndFerme<1||isNaN(ndFerme)) return new ExtraSession(this.brutdata, this.repName)
        const newRcoNd = this.rep[0].salle[idSalle-1].rco.length+1 
        for (let index = 1; index < 9; index++) {
            this.brutdata.push({
                status: "ghost",
                tdpId:"",
                cd: this.cd,
                ferme: ndFerme,
                found: undefined,
                level: index,
                option: null,
                rco: newRcoNd,
                regletteNbr: "",
                regletteType: "x",
                rep : this.repName,
                salle: idSalle,
                _id: this.cd + this.rep + idSalle + newRcoNd + ndFerme + index,
            })
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    addFerme(idSalle=0,idRco=0,ndFerme=0){
        if (idSalle === 0) idSalle = this.salleNumber>1? parseInt(prompt('dans quelle salle?')) : 1
        if (idSalle<1||isNaN(idSalle)||idSalle>this.salleNumber) return new ExtraSession(this.brutdata, this.repName)
        const rcoNumber = this.getRcoNumber(idSalle-1)

        if (idRco === 0) idRco = rcoNumber>1? parseInt(prompt('dans quelle rco?')) : 1
        if (idRco<1||isNaN(idRco)||idRco>rcoNumber) return new ExtraSession(this.brutdata, this.repName)
        if (ndFerme === 0) ndFerme =  parseInt(prompt('Quel est le numéro de la ferme ?'))
        const fermeExist = this.rep[0].salle[idSalle-1].rco[idRco-1].ferme.findIndex(elem=>elem.number===ndFerme)===-1?false:true
        if (ndFerme<1||isNaN(ndFerme)||fermeExist) return new ExtraSession(this.brutdata, this.repName)
        for (let index = 1; index < 9; index++) {
            this.brutdata.push({
                tdpId:"",
                status: "ghost",
                cd: this.cd,
                ferme: ndFerme,
                found: undefined,
                level: index,
                option: null,
                rco: idRco,
                regletteNbr: "",
                regletteType: "x",
                rep : this.repName,
                salle: idSalle,
                _id: this.cd + this.rep + idSalle + rcoNumber + ndFerme + index,
            })
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    deleteSalle(){
        const salle = this.salleNumber
        if (salle>1){
            const newTab =[]
            this.brutdata.forEach(elem => {
                if (elem.salle !== salle) newTab.push(elem)
            })
            return new ExtraSession(newTab, this.repName)
        }else alert('Désolé, il faut au minimum 1 salle dans un rep!')
    }
    deleteRco(){
        const idSalle = this.salleNumber>1? parseInt(prompt('dans quelle salle?')) : 1
        if (idSalle>0||!isNaN(idSalle)||idSalle<=this.salleNumber) {
            const idRco = this.rep[0].salle[idSalle-1].rco.length
            if (idRco>1) {
                const newTab =[]
                this.brutdata.forEach(elem => {
                    if (!(elem.salle === idSalle&&elem.rco === idRco)) newTab.push(elem)
                })
                return new ExtraSession(newTab, this.repName)
            }
        }
    }
    deleteFerme(idSalle=0,idRco=0,ndFerme=0){
        if (idSalle === 0) idSalle = this.salleNumber>1? parseInt(prompt('dans quelle salle?')) : 1
        if (idSalle<1||isNaN(idSalle)||idSalle>this.salleNumber) return new ExtraSession(this.brutdata, this.repName)
        const rcoNumber = this.getRcoNumber(idSalle-1)

        if (idRco === 0) idRco = rcoNumber>1? parseInt(prompt('dans quelle rco?')) : 1
        if (idRco<1||isNaN(idRco)||idRco>rcoNumber) return new ExtraSession(this.brutdata, this.repName)
        if (ndFerme === 0) ndFerme =  parseInt(prompt('Quel est le numéro de la ferme ?'))
        const fermeExist = this.rep[0].salle[idSalle-1].rco[idRco-1].ferme.findIndex(elem=>elem.number===ndFerme)===-1?false:true
        if (ndFerme<1||isNaN(ndFerme)||!fermeExist) return new ExtraSession(this.brutdata, this.repName)
        const newTab =[]
        this.brutdata.forEach(elem => {
            if (!(elem.salle === idSalle&&elem.rco === idRco&&elem.ferme === ndFerme)) newTab.push(elem)
        })
        return new ExtraSession(newTab, this.repName)
    }

    creatNewRep(repName){
        return new ExtraSession([{
            tdpId:"",
            status: "ghost",
            cd: repName.slice(-2),
            ferme: 1,
            found: undefined,
            level: 1,
            option: null,
            rco: 1,
            regletteNbr: "",
            regletteType: "x",
            rep : repName,
            salle: 1,
            _id: repName.slice(-2) + repName + 1 + 1 + 1 + 1,
        }], repName)
    }
}