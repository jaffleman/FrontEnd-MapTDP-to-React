
import Button from 'react-bootstrap/Button'
import React from "react";
import storageAvailable from '../../functions/storageCheck'
class LastSearch extends React.Component{
    getRep=(data)=>{
        const tab = []
        data.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
        return tab
    }
    searchList= ()=>{
        if (storageAvailable('localStorage')){
            const sessionStockage = localStorage.getItem('sessionStockage')
            if (sessionStockage!=null){
                const parseSession = JSON.parse(sessionStockage)
                if (parseSession.date){
                    const today = new Date()
                    const compareDate = parseSession.date.localeCompare(today.toDateString())
                    if ( compareDate !== 0){
                        localStorage.removeItem('sessionStockage')
                        return null
                    }
                    else return this.getRep(parseSession.data).map((tdp, key)=>{ return <Button key={key} variant="primary" size="sm" block onClick={()=>this.handleClick(tdp)}>{tdp}</Button>})
                }else return null
            }else return null
        }else return null
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