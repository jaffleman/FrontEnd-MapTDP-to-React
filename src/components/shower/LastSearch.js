
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
                const repList = this.getRep(parseSession.data)
                return (
                    
                    repList.map((tdp)=>{ return <Button variant="primary" size="sm" block onClick={()=>this.handleClick(tdp)}>{tdp}</Button>})
                )
            }else return null
        }else return null
    }
    handleClick=(rep)=>{
        if (storageAvailable('localStorage')){
            const sessionStockage = localStorage.getItem('sessionStockage')
            if (sessionStockage!=null){
                const {data} = JSON.parse(sessionStockage)
                const list =[]
                data.forEach((tdp)=>{if(tdp.rep===rep)list.push(tdp)})
                
                console.log(list)
                    this.props.callback(list)
                
            }else return null
        }else return null
        
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