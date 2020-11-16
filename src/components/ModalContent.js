import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

function Modal(props){
    const [MustFetch,setFetch] = useState(false)
    const [salle,setSalle] = useState(1);
    const [rco,setRco] = useState(1);
    const [colone,setColonne] = useState(1);
    const [posissionReglette,setPosition] = useState(1);
    const [opt,setOpt] = useState("x");

    useEffect(()=>{
        console.log('FETCH_MODAL_DATA');
        if (MustFetch) {
            const adress = ()=>{
                if (props.nd){
                const tdp = props.lesTdp[props.nd-1]
                return `http://82.64.128.239:8081/tdpCorrection?arg={"newPosition":{"rep":"${props.tdpErr.data.rep}","reglette":"${props.tdpErr.data.reglette}","salle":${salle},"rco":${rco},"colone":${colone},"posissionReglette":${posissionReglette}},"oldPosition":{"oldSalle":${tdp.salle},"oldRco":${tdp.rco},"oldColone":${tdp.colone},"oldPosissionReglette":${tdp.posissionReglette}}}`
                }else{
                return `http://82.64.128.239:8081/tdpCorrection?arg={"newPosition":{"rep":"${props.tdpErr.data.rep}","reglette":"${props.tdpErr.data.reglette}","salle":${salle},"rco":${rco},"colone":${colone},"posissionReglette":${posissionReglette}}}`
                }
            }
            fetch(adress)
            .then(res => res.json())
            .then(
                (value)=>{
                    window.$('#laModal').modal('toggle')
                    setFetch(false)
                },
                (error) => {
                    setFetch(false)
                    alert("Une erreur c'est produite... ")
                }
            )
        }
    },[MustFetch,props,salle,colone,posissionReglette,rco,opt])

    function valideModal(){
        setFetch(true)
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
        <div>
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
                            </form>
                        </div>
                    
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>valideModal()} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{return {
    lesTdp:state.fetchedResultData.value,
    nd:state.ndToShow,
    tdpErr:state.tdpErr,
}}
export default connect(mapStateToProps)(Modal);