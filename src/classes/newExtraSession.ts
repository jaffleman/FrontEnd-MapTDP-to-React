
class Rep {
    name: string
    salle: Salle[]
    constructor(identifiant: string, newTabTdp: Tdp[]) {

        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.salle) === -1 ? tab.push(tdp.salle) : null)
            return tab.map(elem => new Salle(elem, dataTab))
        }
        this.name = identifiant
        this.salle = find(newTabTdp.filter(element => element.rep === identifiant))
    }
}

class Salle {
    number: number
    rco: Rco[]
    constructor(identifiant: number, newTabTdp: Tdp[]) {

        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.rco) === -1 ? tab.push(tdp.rco) : null)
            return tab.map(elem => new Rco(elem, dataTab))
        }
        this.number = identifiant
        this.rco = find(newTabTdp.filter(element => element.salle === identifiant))
    }
}

class Rco {
    number: number
    ferme: Ferme[]
    constructor(identifiant: number, newTabTdp: Tdp[]) {
        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.ferme) === -1 ? tab.push(tdp.ferme) : null)
            return tab.map((elem, index) => new Ferme(elem, dataTab, index))
        }
        this.number = identifiant
        this.ferme = find(newTabTdp.filter(element => element.rco === identifiant))
    }
}

class Ferme {
    number: number
    index: number
    level: Level[]
    constructor(identifiant: number, newTabTdp: Tdp[], index: number) {

        function find(dataTab: Tdp[]) {
            const tab: number[] = []
            dataTab.forEach((tdp: Tdp) => tab.findIndex(elem => elem === tdp.level) === -1 ? tab.push(tdp.level) : null)
            return tab.map(elem => new Level(elem, dataTab)).sort((a, b) => a.number - b.number)
        }
        this.number = identifiant
        this.index = index
        this.level = find(newTabTdp.filter(element => element.ferme === identifiant))
    }
}

class Level {
    number: number
    tdp: Tdp
    constructor(identifiant: number, newTabTdp: Tdp[]) {

        this.number = identifiant
        this.tdp = (newTabTdp.filter(tdp => tdp.level === identifiant))[0] //?
    }
}

interface searchTdpInterface{
    longRep: string
    regletteNbr: string
    reglette: string
}
// class searchTdp {
//     tdpId: string
//     constructor(elem:SearchTdpInterface) {
        
//     }
// }

class Tdp {
    tdpId: string
    status: string
    cd: string
    rep: string
    ferme: number
    level: number
    option: string
    rco: number
    regletteNbr: string
    regletteType: string
    salle: number
    _id: string
    position: number
    constructor(elem: any) {
        this.tdpId = elem.rep.concat(elem.regletteType, elem.regletteNbr)
        this.status = elem.status
        this.cd = elem.cd
        this.rep = elem.rep
        this.ferme = elem.ferme
        this.level = elem.level
        this.option = elem.option
        this.rco = elem.rco
        this.regletteNbr = elem.regletteNbr
        this.regletteType = elem.regletteType
        this.salle = elem.salle
        this._id = elem._id
        this.position = elem.position
    }
}

function truncBase(position: number, base: number) {
    return Math.trunc(position / base)
}

function sorterData(tab: Tdp[]) {
    const newTab: Tdp[] = []
    tab.forEach((e: Tdp) => {
        const rectifyFerme = e.ferme < 10 ? "0" + e.ferme : e.ferme
        newTab.push(new Tdp({
            ...e,
            position: parseInt("" + e.salle + e.rco + rectifyFerme.toString() + e.level)
        }))
    })
    newTab.sort((a, b) => {
        return a.position - b.position
    })
    return newTab
}

function prompter(phrase: string) {
    const resp: string | null = prompt(phrase)
    if (resp === null) return 0
    const parse = parseInt(resp)
    if (isNaN(parse)) return 0
    return parse
}
export default class ExtraSession {
    private repName: string = ''
    private brutdata: Tdp[] = []
    private rep: Rep[] = []
    private cd: string = ''
    private salleNumber: number = 0
    constructor(sessionData: any[], repName: string) {
        if (sessionData.length === 0) return
        this.brutdata = sorterData(sessionData.map(elem => {
            if (!elem.status) return new Tdp({
                ...elem,
                status: "original"
            })
            else return new Tdp({
                ...elem
            })
        }))
        this.repName = repName
        this.rep = [new Rep(repName, this.brutdata)]
        this.cd = repName.slice(-2)
        this.salleNumber = this.rep[0].salle.length
        const newTab: Tdp[] = []
        this.rep.forEach((elem: {
            salle: Salle[]
        }) => {
            elem.salle.forEach((elemSalle: {rco: Rco[];number: number}) => {
                elemSalle.rco.forEach((elemRco: {ferme: Ferme[];number: number}) => {
                    elemRco.ferme.forEach((elemFerme: {level: Level[];number: number}) => {
                        if (elemFerme.level.length !== 8) {
                            for (let index = 1; index < 9; index++) {
                                if (!(elemFerme.level.find((elem: {number: number}) => elem.number === index))) {
                                    newTab.push(new Tdp({
                                        tdpId: '',
                                        status: "ghost",
                                        cd: this.cd,
                                        ferme: elemFerme.number,
                                        level: index,
                                        option: null,
                                        rco: elemRco.number,
                                        regletteNbr: "",
                                        regletteType: "x",
                                        rep: this.repName,
                                        salle: elemSalle.number,
                                        _id: this.repName + elemSalle.number + elemRco.number + elemFerme.number + index,
                                    }))
                                }

                            }
                        }
                    })
                })
            })
        })
        if (newTab.length > 0) return new ExtraSession(sessionData.concat(newTab), this.repName)
    }


    private getRcoNumber(id: number) {
        return this.rep[0].salle[id].rco.length
    }

    modifRegType(itemId: string[], value: string) {
        const newBrut = [...this.brutdata]
        itemId.forEach((element: string) => {
            const elem = this.brutdata.findIndex((tdp: Tdp) => tdp._id === element)
            const monElem = {
                ...this.brutdata[elem],
                regletteType: value
            }
            newBrut[elem] = new Tdp(monElem)
        })
        return new ExtraSession(newBrut, this.repName)
    }
    modifRegNbr(itemId: string[], value: string) {
        const newBrut = [...this.brutdata]
        itemId.forEach((element: string) => {
            const i = this.brutdata.findIndex((tdp: Tdp) => tdp._id === element)
            const monElem = {
                ...this.brutdata[i],
                regletteNbr: value
            }
            newBrut[i] = new Tdp(monElem)
        })
        return new ExtraSession(newBrut, this.repName)
    }
    modifOption(itemId: string[], value: string) {
        const newBrut: Tdp[] = [...this.brutdata]
        itemId.forEach((element: string) => {
            const elem = this.brutdata.findIndex((tdp: Tdp) => tdp._id === element)
            newBrut[elem] = {
                ...this.brutdata[elem],
                option: value === 'null' ? 'null' : value
            }
        })
        return new ExtraSession(newBrut, this.repName)
    }

    addSalle(ndFerme = 0) {
        if (!ndFerme) ndFerme = prompter('Quel est le numéro de la première ferme de la première rco?')
        if (ndFerme < 1) return this
        const newSalleNd = this.salleNumber + 1
        for (let index = 1; index < 9; index++) {
            this.brutdata.push(new Tdp({
                tdpId: '',
                status: "ghost",
                cd: this.cd,
                ferme: ndFerme,
                level: index,
                option: null,
                rco: 1,
                regletteNbr: "",
                regletteType: "x",
                rep: this.repName,
                salle: newSalleNd,
                _id: this.repName + newSalleNd + 1 + ndFerme + index,
            }))
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    addRco(idSalle = 0, ndFerme = 0) {
        if (this.salleNumber > 1 && !idSalle) idSalle = prompter('dans quelle salle?')
        else idSalle = 1

        if (!ndFerme) ndFerme = prompter('Quel est le numéro de la première ferme de cette rco?')
        if (idSalle < 1 || idSalle > this.salleNumber || ndFerme < 1) return this
        const newRcoNd = this.rep[0].salle[idSalle - 1].rco.length + 1
        for (let index = 1; index < 9; index++) {
            this.brutdata.push(new Tdp({
                tdpId: '',
                status: "ghost",
                cd: this.cd,
                ferme: ndFerme,
                level: index,
                option: null,
                rco: newRcoNd,
                regletteNbr: "",
                regletteType: "x",
                rep: this.repName,
                salle: idSalle,
                _id: this.repName + idSalle + newRcoNd + ndFerme + index,
            }))
        }
        return new ExtraSession(this.brutdata, this.repName)
    }
    addFerme(idSalle = 0, idRco = 0, ndFerme = 0) {
        if (idSalle === 0) idSalle = this.salleNumber > 1 ? prompter('dans quelle salle?') : 1
        const rcoNumber = this.getRcoNumber(idSalle - 1)
        if (idRco === 0) idRco = rcoNumber > 1 ? prompter('dans quelle rco?') : 1
        if (ndFerme === 0) ndFerme = prompter('Quel est le numéro de la ferme ?')
        const fermeExist = this.rep[0].salle[idSalle - 1].rco[idRco - 1].ferme.findIndex((elem: Ferme) => elem.number === ndFerme) === -1 ? false : true
        if (idSalle < 1 || idSalle > this.salleNumber || idRco < 1 || idRco > rcoNumber || ndFerme < 1 || fermeExist) return this
        for (let index = 1; index < 9; index++) {
            this.brutdata.push(new Tdp({
                tdpId: '',
                status: "ghost",
                cd: this.cd,
                ferme: ndFerme,
                level: index,
                option: null,
                rco: idRco,
                regletteNbr: "",
                regletteType: "x",
                rep: this.repName,
                salle: idSalle,
                _id: this.repName + idSalle + rcoNumber + ndFerme + index,
            }))
        }
        return new ExtraSession(this.brutdata, this.repName)
    }

    deleteSalle() {
        const salle = this.salleNumber
        if (salle > 1) return new ExtraSession(this.brutdata.filter(tdp => truncBase(tdp.position, 10000) !== salle), this.repName)
        else {
            alert('Désolé, il faut au minimum 1 salle dans un rep!')
            return this
        }
    }
    deleteRco(idSalle = 0) {
        if (this.salleNumber > 1 && idSalle === 0) idSalle = prompter('Dans quelle salle?')
        if (idSalle > 0 || idSalle <= this.salleNumber) {
            if (idSalle === 0) idSalle = 1
            const idRco = this.rep[0].salle[idSalle - 1].rco.length
            if (idRco < 2) {
                alert('Désolé, il faut au minimum 1 Rco dans une salle!')
                return this
            }
            const position = parseInt("" + idSalle + idRco)
            return new ExtraSession(this.brutdata.filter(tdp => (truncBase(tdp.position, 1000) !== position)), this.repName)
        }
    }
    deleteFerme(idSalle = 0, idRco = 0, ndFerme = 0) {
        if (idSalle === 0) idSalle = this.salleNumber > 1 ? prompter('dans quelle salle?') : 1
        const rcoNumber = this.getRcoNumber(idSalle - 1)
        if (idRco === 0) idRco = rcoNumber > 1 ? prompter('dans quelle rco?') : 1
        if (ndFerme === 0) ndFerme = prompter('Quel est le numéro de la ferme ?')
        const fermeExist = this.rep[0].salle[idSalle - 1].rco[idRco - 1].ferme.findIndex((elem: Ferme) => elem.number === ndFerme) === -1 ? false : true
        if (idSalle < 1 || idSalle > this.salleNumber || idRco < 1 || idRco > rcoNumber || ndFerme < 1 || !fermeExist) return this

        const position = parseInt("" + idSalle + idRco + (ndFerme < 10 ? "0" + ndFerme : ndFerme).toString())
        return new ExtraSession(this.brutdata.filter(tdp => (truncBase(tdp.position, 10) !== position)), this.repName)
    }

    creatNewRep(repName: string) {
        return new ExtraSession([{
            tdpId: '',
            status: "ghost",
            cd: repName.slice(-2),
            ferme: 1,
            level: 1,
            option: null,
            rco: 1,
            regletteNbr: "",
            regletteType: "x",
            rep: repName,
            salle: 1,
            _id: repName + 1 + 1 + 1 + 1,
        }], repName)
    }
}

/*

const transforme = (params: any[]) => params.map((value: any) => new Plot(value))

const data = JSON.parse('[{"_id":"60a4fa60e48ed602c8def467","tdpId":"rep00R/DEG04","cd":0,"ferme":4,"level":3,"option":null,"rco":1,"regletteNbr":"04","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a4fa60e48ed602c8def468","tdpId":"rep00R/DEG05","cd":0,"ferme":4,"level":4,"option":null,"rco":1,"regletteNbr":"05","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a4fa60e48ed602c8def469","tdpId":"rep00R/DEG06","cd":0,"ferme":4,"level":5,"option":null,"rco":1,"regletteNbr":"06","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a4fa60e48ed602c8def46a","tdpId":"rep00R/DEG07","cd":0,"ferme":4,"level":6,"option":null,"rco":1,"regletteNbr":"07","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a4fa60e48ed602c8def46b","tdpId":"rep00R/DEG08","cd":0,"ferme":4,"level":7,"option":null,"rco":1,"regletteNbr":"08","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a4fa61e48ed602c8def46c","tdpId":"rep00R/DEG09","cd":0,"ferme":4,"level":8,"option":null,"rco":1,"regletteNbr":"09","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a53fb4e48ed602c8def477","tdpId":"rep00R/DEG02","cd":0,"ferme":4,"level":1,"option":null,"rco":1,"regletteNbr":"02","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0},{"_id":"60a53fb4e48ed602c8def478","tdpId":"rep00R/DEG03","cd":0,"ferme":4,"level":2,"option":null,"rco":1,"regletteNbr":"03","regletteType":"R/DEG","rep":"rep00","salle":1,"__v":0}]')
const maSession = new ExtraSession(data, 'rep00')//?
const newSession = maSession.creatNewRep('rep00')//?
newSession.addSalle(2).addRco(2,2)//?

//const maSession2 = maSession.deleteRco()
//const newSalle = maSession.addSalle(2)
//const newRco = newSalle.addRco(2,2)
//const newFerme = newRco.addFerme(1,0,2)
//const deleteFerme = newFerme.deleteFerme(1,0,4)
//const deleteRco = deleteFerme.deleteRco(2)
//const deleteSalle = deleteRco.deleteSalle()
*/