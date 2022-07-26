import React from 'react';
import SalleCreator from './repCreator/SalleCreator';
import {connect} from 'react-redux'
import Increment from './repCreator/Increment';
import { Redirect, withRouter } from 'react-router-dom';
import Loader from './Loader';
import VerifRepName from './repCreator/VerifRepName'

class CreatRep extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            repName:'',
            load:false,
            redirect:false
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
            //window.localStorage.setItem('create-rep', `{"repName":"${this.state.repName}","peupler":false, "structure":${JSON.stringify(this.props.repStructure)}}`)

    handle_valideClick = () => {
        const validate = window.confirm(`Tout est ok ?? Tu confirmes la création de: [${this.state.repName}] \n`)
        if (validate){
            this.props.dispatch({type: "UPDATE_LOADER",value: true})
            const callBack = (result)=>{
                this.props.dispatch({type: "UPDATE_LOADER",value: false})
                if (result.length === 0) this.setState({redirect:true}) 
                else alert("Le nom du rep n'est pas valide ou il existe deja...")
            }
            VerifRepName(this.state.repName, callBack)}
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
        if (this.state.redirect) return <Redirect  to={{
            pathname: "/Peupler",
            state: {
                repartiteur: this.state.repName,
                structure: this.props.repStructure
            }
          }} />
        else return <div>
            <div className="d-flex justify-content-between" style={{marginBottom:'20px'}}>
                <button type="button" className="btn btn-secondary" style={{float:'right', marginBottom:'5px'}} onClick={this.handle_goBack}>{'<< Retour'}</button>
                <button type="button" className="btn btn-success" style={{float:'right', marginBottom:'5px'}} onClick={this.handle_valideClick}>Creer le rep</button>
            </div>
            <div className="input-group " style={{width:"250px"}}>
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
    }
    
}
    const mapStateToProps = (state)=>{return {
        repStructure: state.repStructure}
}
export default withRouter(connect(mapStateToProps)(CreatRep))