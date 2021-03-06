
import Button from 'react-bootstrap/Button'
import React from "react";
import storageAvailable from '../../functions/storageCheck'
class LastSearch extends React.Component{
    getRep=(data)=>{
        const tab2rep = []
        data.forEach(tdp => tab2rep.findIndex(elem => elem === tdp.rep)===-1? tab2rep.push(tdp.rep):null)
        const object = tab2rep.map((rep)=>{
            const matchTdp = []
            data.forEach(tdp => (tdp.rep === rep)? matchTdp.push(tdp):null)
            return [rep, matchTdp.length]
        })
        return object
    }
    searchList= ()=>{
        if (!storageAvailable('localStorage'))return null
        const sessionStockage = localStorage.getItem('sessionStockage')
        if (!sessionStockage)return null
        const parseSession = JSON.parse(sessionStockage)
        if (!('data' in parseSession)) return null
        const today = new Date()
        const compareDate = parseSession.date.localeCompare(today.toDateString())
        if ( compareDate !== 0){
            delete parseSession.data  
            delete parseSession.date       
            localStorage.setItem('sessionStockage', JSON.stringify(parseSession))
            return null
        }
        else return this.getRep(parseSession.data).map((repTab, key)=>{ return <Button key={key} variant="primary" size="sm" block onClick={()=>this.handleClick(repTab[0])}>{repTab[0]+' : '+repTab[1]+'tdp'}</Button>})

    }
    handleClick=(rep)=>{
        const sessionStockage = localStorage.getItem('sessionStockage')
        const {data} = JSON.parse(sessionStockage)
        const list =[]
        data.forEach((tdp)=>{if(tdp.rep===rep)list.push(tdp)})
        this.props.callback(list)
    }
    render(){
        return(
            <> 
                <this.searchList/>
            </>
        )
     
    }
}
export default LastSearch;