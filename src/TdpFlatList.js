import React from 'react';
import {connect} from 'react-redux'
import Tdp from './Tdp'

class TdpFlatList extends React.Component{
    
    Lister(ladata){
        const {data} = ladata;
        let preRep, preSalle, PreRco;

        const compoRender = data.value.map(function (item, key) {
            let withRep, withSalle, withRco;

            if (item.rep !== preRep){
                preRep = item.rep;
                preSalle = item.salle;
                PreRco = item.rco;
                withRep = true
                withSalle = true
                withRco = true
            }else{   
                if (item.salle !== preSalle){
                    preRep = item.rep;
                    preSalle = item.salle;
                    PreRco = item.rco;
                    withRep = false
                    withSalle = true
                    withRco = true
                }else{
                    if (item.rco !== PreRco){
                        preRep = item.rep;
                        preSalle = item.salle;
                        PreRco = item.rco;
                        withRep = false
                        withSalle = false
                        withRco = true
                    }else{
                        withRep = false
                        withSalle = false                        
                        withRco = false
                    }                    
                } 
            }


            
            
            const withHeader = {
                showRep: withRep,
                showSalle: withSalle,
                showRco: withRco
            }
            return <Tdp data={item} key={key} headCompos={withHeader}/>
        })

        return compoRender
    }

  
    render(){
        const {status, msg} = this.props.fetchedResultData
        if (status === 300){
            return (
                <this.Lister data = {this.props.fetchedResultData}/>
            )           
        }else{
            return <div id = "tdp" role="button" onClick={()=>{this.props.dispatch({type:'RESET_APP'})}}>{msg}</div>
        }
    }    
}

const mapStateToProps = (state)=>{return {fetchedResultData:state.fetchedResultData}}
export default connect(mapStateToProps)(TdpFlatList);
