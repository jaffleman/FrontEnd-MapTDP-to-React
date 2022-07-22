import { Tdp } from "./Tdp";

export default class LocalStorageManager{
    private isActive: boolean
    constructor(){
        try {
            var x = '__storage_test__';
            window['localStorage'].setItem(x, x);
            window['localStorage'].removeItem(x);
            this.isActive = true;
        }
        catch(e) {
            this.isActive = false;
        }
        if (!this.isActive) return
        const stoDate = localStorage.getItem('storageDate')
        const date : Date = new Date(stoDate||'July 20, 69 20:17:40 GMT+00:00')
        const tdps:[Tdp] =  JSON.parse(localStorage.getItem('tdps')||'[]')
        const autoPastStatus: boolean = JSON.parse(localStorage.getItem('autoPastStatus')||'true')
        const today = new Date()
        if (stoDate) {
            if (IsNewDay(date,today)){
                console.log(`ok c'est le bon jour`)
                localStorage.setItem('tdps', JSON.stringify([...tdps]))
                localStorage.setItem('autoPastStatus', JSON.stringify(autoPastStatus))
            }else{
                console.log(`c'est pas le bon jour`)
                localStorage.setItem('storageDate', ''+today)
                localStorage.setItem('tdps', JSON.stringify([]))
                localStorage.setItem('autoPastStatus', JSON.stringify(autoPastStatus))
            }
        }else{
            console.log(`pas de données dans le localStorage`)
            localStorage.setItem('storageDate', ''+today)
            localStorage.setItem('tdps', JSON.stringify([]))
            localStorage.setItem('autoPastStatus', JSON.stringify(autoPastStatus))
        }

    }
    public getIsActive():boolean{
        return this.isActive
    }
    public getAutoPast():boolean {
        if (!this.isActive) return false
        return JSON.parse(localStorage.getItem('autoPastStatus')||'false')
    }
    public setAutoPast(value:boolean):void{
        if (this.isActive) localStorage.setItem('autoPastStatus', JSON.stringify(value))
    }
    public clearTdpList(): void{
        if (this.isActive) localStorage.setItem('tdps', JSON.stringify([]))
    }
    public storageStock(fetchedData:[any]):void{
        const newSession = fetchedData.filter(elem=>elem.fetched).map(element => {return  {...element, 'fetched':false}});
        const sessionStockage = localStorage.getItem('sessionStockage')
        const date = new Date()
        if (sessionStockage){
            const parseSession = JSON.parse(sessionStockage)
            if('data' in parseSession){
                localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'data':[...parseSession.data, ...newSession], 'date':date.toDateString()}))
            }else localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'data':newSession, 'date':date.toDateString()}))
        }else localStorage.setItem('sessionStockage', JSON.stringify({'data':newSession, 'date':date.toDateString()}))
    }

}

function IsNewDay(firstDate:Date, secondeDate:Date):boolean {
    if (firstDate.getFullYear() !== secondeDate.getFullYear()) return false
    if (firstDate.getMonth() !== secondeDate.getMonth()) return false
    if (firstDate.getDate() !== secondeDate.getDate()) return false
    return true
}