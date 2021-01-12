import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

function Modal(props){
    const [MustFetch,setFetch] = useState(false)
    const [salle,setSalle] = useState(1);
    const [rco,setRco] = useState(1);
    const [colone,setColonne] = useState(1);
    const [posissionReglette,setPosition] = useState(1);
    const [opt,setOpt] = useState("x");

    useEffect(()=>{},[])
    
    function closeModal() {
        setFetch(false)
        props.dispatch({
            type:"SHOW_MODAL",
            value:{}
        })
    }
    function valideModal(){
        setFetch(true)
    }
     
    const   salleChange = e => setSalle(e.target.value),
            rcoChange = e => setRco(e.target.value),
            colonneChange = e => setColonne(e.target.value),
            positionChange = e => setPosition(e.target.value),
            OptionChange = e => setOpt(e.target.value) 

    return (
        <div className="modal fade" id="laModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Merci de renseigner les infos manquantes pour cette position:</p>
                        <form>
                            <p>REPARTITEUR: {props.modalData.rep}</p>
                            <p>Reglette: {props.modalData.regletteType+props.modalData.regletteNbr}</p>
                            <p>salle:
                                <select onChange={(e)=>{salleChange(e)}}>
                                    <option defaultValue={"1"}>1</option>
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
                            <p>ferme:<input type='number' min="1" max="50" onChange={(e)=>{colonneChange(e)}}/></p>
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