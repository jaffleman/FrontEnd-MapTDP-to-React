import React, {useState} from 'react'
import {connect} from 'react-redux'
import './Modal.css'


function Modal(props){
    const [salle,setSalle] = useState(1);
    const [rco,setRco] = useState(1);
    const [colone,setColonne] = useState(1);
    const [posissionReglette,setPosition] = useState(1);
    const [opt,setOpt] = useState("x");
    const data = {
        salle,
        rco,
        colone,
        posissionReglette,
        opt,
        rep:props.tdpErr.data.rep,
        reglette:props.tdpErr.data.reglette
    }
    const valideModal=()=>{
        const {salle, rco, colone, posissionReglette, opt, rep, reglette} = data
        const action={
            type: 'CREATE_REGLETTE',
            value:{
                salle,
                rco,
                colone,
                posissionReglette,
                opt,
                rep,
                reglette,
            }
        }
        props.dispatch(action)
    }
    
    const closeModal=()=>{
       const action={
            type: "CLOSE_MODAL",
            value:false,
        }
        props.dispatch(action)
    }
    const salleChange=(e)=>{
        setSalle(e.target.value)
    }
    const rcoChange=(e)=>{
        setRco(e.target.value)
    }
    const colonneChange=(e)=>{
        setColonne(e.target.value)
    }
    const positionChange=(e)=>{
        setPosition(e.target.value)
    }
    const OptionChange=(e)=>{
        setOpt(e.target.value)
    }
    return (
               
        <div className='Modal' style={{
            transform: props.tdpErr.showModal?'translateY(80vh)':'translateY(-100vh)',
            opacity: props.tdpErr.showModal?'1':'0'
        }}>
            <p>Merci de renseigner les infos manquantes pour cette position:</p>
            <form>
                <p>REPARTITEUR: {props.tdpErr.data.rep}</p>
                <p>Reglette: {props.tdpErr.data.reglette}</p>
                <p>salle:
                    <select onChange={(e)=>{salleChange(e)}}>
                        <option defaultValue="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </p>
                <p>rco:
                    <select onChange={(e)=>{rcoChange(e)}}>
                        <option defaultValue="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </p>
                <p>colonne:<input type='number' min="1" max="50" onChange={(e)=>{colonneChange(e)}}/></p>
                <p>position:
                    <select onChange={(e)=>{positionChange(e)}}>
                        <option defaultValue="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </p>
                <p>Option:
                    <select onChange={(e)=>{OptionChange(e)}}>
                        <option defaultValue="x">...</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Non isolable</option>
                    </select>
                </p>
                <div style={{display:"flex", }}>
                    <input type='button' value="Annuler" style={{flex:1, margin:"10px"}} onClick={closeModal}/>
                    <input type='button' value="Valider" style={{flex:1, margin:"10px"}} onClick={valideModal}/>
                </div>
            </form>
        </div>
    )
}
const mapStateToProps = (state)=>{return {
    ndToShow:state.ndToShow, 
    TdpPreviousState:state.TdpPreviousState, 
    alreadyShow:state.alreadyShow,
    tdpErr:state.tdpErr
}}
export default connect(mapStateToProps)(Modal);