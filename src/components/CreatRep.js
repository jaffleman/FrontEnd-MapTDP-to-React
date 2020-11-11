import React from 'react';
import SalleCreator from './SalleCreator';
import {connect} from 'react-redux'
import Increment from './Increment';

class CreatRep extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            repName:'',
        };
    }

    repName_handleChange = (e) => {
        this.setState({
            repName:(e.target.value).toLowerCase(),
           
        })        
    }

    CallNext = (nb) =>{
        return <SalleCreator number={nb}/>
    }
    handle_valideClick = () => {
        if (this.state.repName!=='') {
            const validate = window.confirm('Tout est ok ?? Tu confirme la création de ce rep: '+this.state.repName)
            if (validate) {
                    console.log(JSON.stringify(this.props.repStructure))
                    fetch(`http://192.168.0.14:8081/CreatRep?arg={"repName":"${this.state.repName}","structure":${JSON.stringify(this.props.repStructure)}}`)
                    .then(result=>result.text())
                    .then(result=>alert(result))
                    .catch((err)=>alert('Echec: Le serveur n\'a pas répondu. '+err))
            }
        }else{
            alert("T'as oublié le nom du rep bro...")
        }
    }

    componentDidMount(){
    }
    render(){
        return(
            <div>
                <div>
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
            </div>
        )        
    }
    
}
    const mapStateToProps = (state)=>{return {
        repStructure: state.repStructure}
}
export default connect(mapStateToProps)(CreatRep)