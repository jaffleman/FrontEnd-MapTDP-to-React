import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { fetcher } from '../functions/fetcher';

function Modal(props){
    const {_id, rep, cd, regletteNbr, regletteType} = props.modalData

    
    const [salle,setSalle] = useState(1);
    const [rco,setRco] = useState(1);
    const [ferme,setFerme] = useState(1);
    const [level,setLevel] = useState(1);
    const [opt,setOpt] = useState("x");

    useEffect(()=>{},[])
    
    function closeModal() {
        
        props.dispatch({
            type:"SHOW_MODAL",
            value:{}
        })
    }
    function valideModal(){
        const tdp =[{
            _id,
            regletteType,
            regletteNbr,
            cd,
            rep,
            salle,
            rco,
            ferme,
            level,
            opt,
        }]
        fetcher("update","PUT", tdp, closeModal())
    }
    const   salleChange = e => setSalle(e.target.value),
            rcoChange = e => setRco(e.target.value),
            colonneChange = e => setFerme(e.target.value),
            positionChange = e => setLevel(e.target.value),
            OptionChange = e => setOpt(e.target.value) 

    return (
        <div className="modal fade" id="laModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modifier...</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Merci de renseigner les infos manquantes pour cette position:</p>
                        <form>
                            <p>REPARTITEUR: {rep}</p>
                            <p>Reglette: {regletteType+regletteNbr}</p>
                            <p>Salle:
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
                            <p>Ferme:<input type='number' min="1" max="50" onChange={(e)=>{colonneChange(e)}}/></p>
                            <p>Niveau:
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
                                    <option defaultValue="">...</option>
                                    <option value="I">Inversée</option>
                                    <option value="TNI">Non isolable</option>
                                </select>
                            </p>
                        </form>
                    </div>
                
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>closeModal()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>valideModal()} >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{return {modalData:state.modalData}}
export default connect(mapStateToProps)(Modal);