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
                withRep = true
            }else{withRep = false}

            if (item.salle !== preSalle){
                preSalle = item.salle;
                withSalle = true
            }else{withSalle = false} 
            
            if (item.rco !== PreRco){
                PreRco = item.rco;
                withRco = true
            }else{withRco = false}            
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
                <div id = "tdp">
                    {
                        <this.Lister data = {this.props.fetchedResultData}/>
                    }
                </div>            
            )           
        }else{
            return <div id = "tdp">{msg}</div>
        }
    }    
}

const mapStateToProps = (state)=>{return {fetchedResultData:state.fetchedResultData}}
export default connect(mapStateToProps)(TdpFlatList);
