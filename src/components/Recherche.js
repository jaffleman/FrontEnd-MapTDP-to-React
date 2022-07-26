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
let preRep, preSalle, PreRco;
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

    Load = () => {
        return this.state.load?<Loader/>:null
    }
    render(){
        if (!this.state.load){
            if (this.props.fetchedResultData.length){
                const found = this.props.fetchedResultData
                const compResult = compare(this.props.location.state,found)
                return (
                    <div className='main'>
                        <LaModal/>
                        <this.Lister 
                            data = {compResult} 
                            type = {'tdpOk'}
                        />
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