import React from 'react';
import {connect} from 'react-redux'
import Tdp from './Tdp'
import TdpErr from './TdpErr'
import RepErr from './RepErr'
import Modal from './Modal'


class TdpFlatList extends React.Component{
    showModal = (e)=>{
        console.log(e);
        this.setState(
            {visible: true}
        )
    }
    hideModal = () =>{
        this.setState(
            {visible:false}
        )
    }

    Lister(props){
        const {data,type,cache} = props;
        let preRep, preSalle, PreRco;    
        if (type==='tdpErr'){ 
            if (data.length)
           { const compoRender = data.map( function(item, key) {
                
                const divKey= 'div'+key
                return <div key={divKey}> 
                    <TdpErr  data={item} key={key} cache={cache}/>
                </div>
            })

            return (
                <div>
                    <h3>REGLETTE(S) NON TROUVEE(S)
                    Cliquez pour intégrer à la base</h3>                  
                    {compoRender}
                </div>
            )}else{ return null}
        }
        if (type==='repErr') {
            if (data.length)
                { const compoRender = data.map( function(item, key) {
                    
                    const divKey= 'div'+key
                    return <div key={divKey}> 
                        <RepErr  data={item} key={key} cache={cache}/>
                    </div>
                })
    
                return (
                    <div>
                        <h3>REPARTITEUR(S) INCONNU(S)
                        Cliquez pour intégrer à la base</h3>
                        {compoRender}
                    </div>
                )}else{ return null}   
        }
        if (type==='tdpOk'){
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
        console.log(this.props.fetchedResultData);
        const {status, msg} = this.props.fetchedResultData
        if (status === 300){
            return (
                <div>
                    <Modal/>
                    <this.Lister 
                        data = {this.props.fetchedResultData.value} 
                        type = {'tdpOk'}
                    />
                    <this.Lister 
                        data = {this.props.fetchedResultData.errorTab} 
                        err = {this.props.tdpErr}
                        type = {'tdpErr'} 
                    />
                    <this.Lister 
                        data = {this.props.fetchedResultData.errorRep} 
                        type = {'repErr'}
                    />
                </div>
            )           
        }else{
            return(
                <div>
                    
                    <div id = "tdp" role="button" onClick={()=>{this.props.dispatch({type:'RESET_APP'})}}>{msg}</div>
                </div>
            )

        }
    }    
}

const mapStateToProps = (state)=>{return {
    fetchedResultData:state.fetchedResultData,
    tdpErr:state.tdpErr
}}
export default connect(mapStateToProps)(TdpFlatList);
