import React from 'react';
import SalleCreator from './SalleCreator';
import {connect} from 'react-redux'
import Increment from './Increment';
import { withRouter } from 'react-router-dom';
import Loader from './Loader';
import VerifRepName from './VerifRepName'

class CreatRep extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            repName:'',
            load:false,
        };
    }

    repName_handleChange = (e) => {
        this.setState({
            repName:(e.target.value).toLowerCase(),
           
        })        
    }

    CallNext = (nb) =>{
        
        return <SalleCreator key={nb} number={nb}/>
    }
    handle_goBack = () => {
        this.props.history.goBack()
    }

    handle_valideClick = () => {
        if (VerifRepName(this.state.repName)) {
            const validate = window.confirm(`Tout est ok ?? Tu confirmes la création de: [${this.state.repName}] \n`)
            if (validate) {
                this.setState({
                    load:true
                })
                    fetch(`http://82.64.128.239:8082/CreatRep?arg={"repName":"${this.state.repName}","peupler":false, "structure":${JSON.stringify(this.props.repStructure)}}`)
                    .then(result=>result.json())
                    .then(result=>{
                        if (result.status) {
                            this.setState({load:true}, ()=>{
                                const validate = window.confirm(result.msg+' Veux-tu le peupler maintenant?')
                                if (validate) {
                                    this.props.history.replace('/Peupler', this.state.repName )
                                }                                
                            })

                        }else{
                            this.setState({load:true}, ()=>{
                                alert(result.msg);
                            })
                        }
                    })
                    .catch((err)=>alert('Echec: Le serveur n\'a pas répondu. '+err))
            }
        }else{
            alert("Le nom du rep n'est pas valide...")
        }
    }
    componentWillUnmount(){ 
        const action = {
            type:"SET_REP_STRUCTURE",
            value:[[[[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]]]]],
        }
        this.props.dispatch(action)
    }
    componentDidMount(){
    }
    Load = () => {
        return this.state.load?<Loader/>:null
    }
    render(){
        return(
            <div>
                <div class="d-flex justify-content-between" style={{marginBottom:'20px'}}>
                    <button type="button" className="btn btn-secondary" style={{float:'right', marginBottom:'5px'}} onClick={this.handle_goBack}>{'<< Retour'}</button>
                    <button type="button" className="btn btn-success" style={{float:'right', marginBottom:'5px'}} onClick={this.handle_valideClick}>Creer le rep</button>
                </div>
                <div className="input-group mb-3" style={{width:"250px"}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Répartiteur:</span>
                    </div>
                    <input type="text" className="form-control" id="rep-name" maxLength='5' placeholder="ex:cho94" aria-describedby="basic-addon3" value={this.state.repName} onChange={(e)=>this.repName_handleChange(e)}/>
                </div>
                <div>
                    <Increment name="Salle" call={this.CallNext}/>
                </div>
                <this.Load/>
            </div>
        )        
    }
    
}
    const mapStateToProps = (state)=>{return {
        repStructure: state.repStructure}
}
export default withRouter(connect(mapStateToProps)(CreatRep))