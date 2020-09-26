import React from 'react';
import {connect} from 'react-redux'
import Tdp from './Tdp'
import TdpErr from './TdpErr'
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
        const {data,err,cache} = props;
        let preRep, preSalle, PreRco;    
        if (err){ 
            if (data.length)
           { const compoRender = data.map( function(item, key) {
                
                const divKey= 'div'+key
                return <div key={divKey}> 
                    <TdpErr  data={item} key={key} cache={cache}/>
                </div>
            })

            return (
                <div>
                    <h3>REGLETTE(S) NON TROUVEE(S)</h3>
                    {compoRender}
                </div>
            )}else{ return null}
            
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
        console.log(this.props.fetchedResultData);
        const {status, msg} = this.props.fetchedResultData
        if (status === 300){
            return (
                <div>
                    <Modal/>
                    <this.Lister data = {this.props.fetchedResultData.value}  err = {false}/>
                    <this.Lister 
                        data = {this.props.fetchedResultData.errorTab} 
                        tdpErr = {this.props.tdpErr}
                        err = {true} 
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
