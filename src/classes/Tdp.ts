export class Tdp {
  tdpId:string|null
  status:string|null
  cd:number|null
  rep:string|null
  ferme:number
  level:number|null
  option:string|null
  rco:number|null
  regletteNbr:string
  regletteType:string
  salle:number|null
  found: boolean|null
  _id:number|null
  plot:number[]
  fetched:boolean|null
  position: number|null
  constructor(tdp?:Tdp) {
    if (tdp) {
      this.status = tdp.status
      this.found = tdp.found
      this.cd = tdp.cd
      this.rep = tdp.rep
      this.ferme = tdp.ferme
      this.level = tdp.level
      this.option = tdp.option
      this.rco = tdp.rco
      this.regletteNbr = tdp.regletteNbr
      this.regletteType = tdp.regletteType
      this.salle = tdp.salle
      this.plot =  tdp.plot
      this._id = tdp._id||0
      this.tdpId= ''+tdp.rep+tdp.regletteType+tdp.regletteNbr
      this.fetched = tdp.fetched||false
      this.position = tdp.position
    } else {
      this.status = null
      this.found = false
      this.cd = null
      this.rep = null
      this.ferme = 0
      this.level = null
      this.option = null
      this.rco = null
      this.regletteNbr = ''
      this.regletteType = 'x'
      this.salle = null
      this.plot = []
      this._id = null
      this.tdpId= null
      this.fetched = null
      this.position = null      
    }
  }
  static parse(data:any):Tdp[] {
    try {
      const parseData = JSON.parse(data)
      return parseData.map((elem:Tdp)=> new Tdp(elem))
    } catch (error) {
      throw error
    }
  }
}