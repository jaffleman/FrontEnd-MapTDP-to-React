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
import { compare } from '../functions/compare';
import { sort } from '../functions/sort';



class Recherche extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            load:false,
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
let preRep, preSalle, PreRco;/*
        const {data,type,cache} = props;
            
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
        } */
        //if (type==='tdpOk'){
            const compoRender = props.data.map(function (item, key) {
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
    //}

   //}

    openModal({condition}){
        if (condition) {
            $( document ).ready(function() {
               window.$('#laModal').modal()
            });
        }
        return null
    }
  /*  
    componentDidMount() { 
        const requestBody = this.props.location.state
        if (requestBody.length>0) {
            const myBody = JSON.stringify(requestBody)

            try {
                const functionFetch = async () => {
                    const result = await fetch("http://localhost:8081/tdp/search",
                    { 
                        method: 'POST',
                        mode: 'cors',
                        body: myBody,
                        headers:{
                            'Content-Type' : 'application/json'
                        }
                    })
                    this.setState({
                        load:false
                    },async()=>{ 
                        if (result.ok){
                        const data = await result.json()
                        this.props.dispatch({type: "GET_FETCH_VALUE", value: data})
                        }else{
                            alert("Une erreur c'est produite... ")
                        }
                    })
                }
                functionFetch()
            } catch (error) {
                console.log(error)
            }
        }else{
            this.setState({
                load:false
            })
        }
    }*/

    Load = () => {
        return this.state.load?<Loader/>:null
    }
    render(){
        console.log(this.props.location.state);
        if (!this.state.load){
            console.log('A');
            if (this.props.fetchedResultData.length){
                const found = this.props.fetchedResultData
                const compResult = compare(this.props.location.state,found)
                console.log('B')
                console.log(compResult)
                return (
                    <div className='main'>
                        <LaModal/>
                        <this.Lister 
                            data = {compResult} 
                            type = {'tdpOk'}
                        />
                    {/* <this.Lister 
                            data = {error} 
                            err = {this.props.tdpErr}
                            type = {'tdpErr'} 
                        />
                        <this.Lister 
                            data = {errorRep} 
                            type = {'repErr'}
                        /> */}
                        <this.openModal
                            condition = {this.props.tdpErr.showModal}
                        />
                    </div>
                )           
            }else{
                console.log('C');
                return(
                    <div className='main'>
                        <Card data={{
                            title:'TDP Introuvable',
                            type:'text',
                            textValue:"Acun Tdp à afficher",
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