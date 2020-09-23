import React from 'react';
import {connect} from 'react-redux'
import Tdp from './Tdp'
import TdpErr from './TdpErr'


class TdpFlatList extends React.Component{
    
    Lister(ladata){
        const {data,err} = ladata;
        let preRep, preSalle, PreRco;
        if (err){ 


            
            const compoRender = data.map(function (item, key) {
                return <div>

                    
                    <TdpErr data={item} key={key}/>
                </div>
            })

            return <div>
                <h3>REGLETTE(S) NON TROUVEE(S)</h3>
                {compoRender}
            </div>
            
        }else{
            const compoRender = data.map(function (item, key) {
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
                return <Tdp data={item} key={key} nd={key++} headCompos={withHeader}/>
            })

            return compoRender
        }
    }

  
    render(){
        const {status, msg} = this.props.fetchedResultData
        if (status === 300){
            return (
                <div>
                <this.Lister data = {this.props.fetchedResultData.value} err= {false}/>
                <this.Lister data = {this.props.fetchedResultData.errorTab} err= {true} />
                </div>
            )           
        }else{
            return <div id = "tdp" role="button" onClick={()=>{this.props.dispatch({type:'RESET_APP'})}}>{msg}</div>
        }
    }    
}

const mapStateToProps = (state)=>{return {fetchedResultData:state.fetchedResultData}}
export default connect(mapStateToProps)(TdpFlatList);
