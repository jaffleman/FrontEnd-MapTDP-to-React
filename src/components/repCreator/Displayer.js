import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import VerifRepName from './VerifRepName';
import DisplaySalle from './DisplaySalle';
import { Container } from 'react-bootstrap';
import ExtraSession from '../../classes/extraSession'
import tabSorter from '../../functions/valider'
import {fetcher} from '../../functions/fetcher'


class Displayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            repName :'',
            theSession: undefined
        }
        this.buttonOK=React.createRef()
        this.validButton=React.createRef()
    }

    handleRepChange = e => this.setState({repName:e.target.value.toLowerCase()})

    handle_valideClick = ()=>{
        if (this.props.mySession.brutdata.length) {
            let {tCreatedElem, tEditedElem, tDeletedElem} = tabSorter(this.props.myBrutData, this.props.mySession.brutdata)
            if(tCreatedElem.length===0 && tEditedElem.length===0 && tDeletedElem.length===0) alert("Tu n'as apporter aucune modif à ce rep...")
            else{
                if (window.confirm("Tu es sur le point de modifier definitivement la base de donnée. Es-tu sur de vouloir continuer?")){

                    this.props.dispatch({
                        type: "UPDATE_LOADER",
                        value: true
                    })
                
                    tCreatedElem.forEach(elem=>Reflect.deleteProperty(elem, '_id'))
                    fetcher("create","POST", tCreatedElem, ()=>{
                        fetcher("update","PUT", tEditedElem, ()=>{
                            fetcher("delete","DELETE", tDeletedElem, this.handleClick)
                        })
                    })
                }
            }
        }else alert("Aucun rep a valider !")
    }
    handleClick = ()=>{
        const callback = (data, repName)=>{
            if(data === 'error'){ 
                this.props.dispatch({ type: "UPDATE_LOADER",value: false })
                alert('une erreur c\'est produite...')
            }
            else {
                const mySession = new ExtraSession(data, repName)
                if (!mySession.rep) {
                    if (window.confirm("Le rep n'existe pas, voulez-vous le creer")){
                        this.props.dispatch({type:'SET_SESSION_DATA',value: mySession.creatNewRep(repName)})
                    }
                }
                else {
                    const myBrutData = [...mySession.brutdata]
                    this.props.dispatch({type:'SET_BASE_DATA', value: myBrutData})
                    this.props.dispatch({type:'SET_SESSION_DATA',value: mySession})
                }
                this.props.dispatch({
                    type: "UPDATE_LOADER",
                    value: false
                })
            }
        }
        if (!this.props.loaderStatus) this.props.dispatch({ type: "UPDATE_LOADER",value: true })
        this.props.dispatch({type: "RESET_SESSION"})
        VerifRepName(this.state.repName, callback)
    }
    
    SalleDisplayer = ({data, vButton, vRef}) => data.rep? <DisplaySalle data={data.rep[0]} vButton={vButton}  vRef={vRef}/>: null
    
    handleKeyPress = e => {
        if (e.key==='Enter'){
            this.handleClick()
            this.buttonOK.current.focus()
        } 
    }

    render(){
        return (
            <div>
                <Container>
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={this.handleRepChange} 
                            onKeyPress={e=>this.handleKeyPress(e)} 
                            placeholder="Rep à créer/modifier ex:cho94" 
                            aria-label="ex:cho94" 
                            aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-primary" 
                                ref={this.buttonOK}
                                type="button" id="button-addon2"
                                onClick={this.handleClick}>OK
                            </button>
                        </div>
                    </div>
                    <this.SalleDisplayer data={this.props.mySession} vButton={this.handle_valideClick} vRef={this.validButton}/>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{return {
    loaderSatus: state.mustLoad,
    mySession: state.session,
    myBrutData: state.baseBrutData
}}
export default withRouter(connect(mapStateToProps)(Displayer))