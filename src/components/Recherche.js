import React from 'react';
import {connect} from 'react-redux'
import Tdp from './Tdp'
import TdpErr from './TdpErr'
import RepErr from './RepErr'
import LaModal from './ModalContent'
import { withRouter } from 'react-router-dom';
import $ from "jquery";
import Card from './Card';
import Loader from './Loader';



class Recherche extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            load:true,
        }
    }
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
            if (data.length){ 
                const compoRender = data.map( function(item, key) {    
                    const divKey= 'div'+key
                    return <div key={divKey}> 
                        <TdpErr  data={item} key={key} cache={cache}/>
                    </div>
                })

            return (
                <div>
                    <h5 className="tdpHead err">REGLETTE(S) NON TROUVEE(S)</h5>
                    <h6 style={{margin:0}}>Cliquez pour intégrer à la base</h6>                  
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
                        <h5 className="tdpHead err">REPARTITEUR(S) INCONNU(S)
                        <p style={{margin:0}}>Cliquez pour intégrer à la base</p></h5>
                        {compoRender}
                    </div>
                )}else{return null}   
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
                return(
                 
                        <Tdp data={item} key={key} nd={key++} headCompos={withHeader}/>
                    
                )             
            })
            return compoRender
        }
    }

    openModal({condition}){
        if (condition) {
            $( document ).ready(function() {
               window.$('#laModal').modal()
            });
        }
        return null
    }
    
    componentDidMount() {
            fetch(`http://82.64.128.239:8082/datas?arg=${this.props.location.state}`)
            .then(res =>res.json())
            .then(result => {
                this.props.dispatch({type: "GET_FETCH_VALUE",value: result});
                this.setState({
                    load:false
                })
            },
                error => {alert("Une erreur c'est produite... ")}
            )
    }

    Load = () => {
        return this.state.load?<Loader/>:null
    }
    render(){
        if (!this.state.load){
            const {status, msg, value, errorTab, errorRep} = this.props.fetchedResultData
            if (status === 300){
                return (
                    <div className='main'>
                        <LaModal/>
                        <this.Lister 
                            data = {value} 
                            type = {'tdpOk'}
                        />
                        <this.Lister 
                            data = {errorTab} 
                            err = {this.props.tdpErr}
                            type = {'tdpErr'} 
                        />
                        <this.Lister 
                            data = {errorRep} 
                            type = {'repErr'}
                        />
                        <this.openModal
                            condition = {this.props.tdpErr.showModal}
                        />
                    </div>
                )           
            }else{
                return(
                    <div className='main'>
                        <Card data={{
                            title:'TDP Introuvable',
                            type:'text',
                            textValue:msg,
                            bName:'<=RETOUR',
                            route:'/'}}/> 
                    </div>
                )
            }
        }else{
            return <this.Load/>
        }   
    }
}

const mapStateToProps = (state)=>{return {
    formValue:state.formValue,
    fetchedResultData:state.fetchedResultData,
    tdpErr:state.tdpErr,
    fetchModal:state.fetchModal
}}
export default withRouter(connect(mapStateToProps)(Recherche));