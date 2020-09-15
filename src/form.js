import React from 'react';
import './App.css';
import { connect } from 'react-redux';



class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            texteAreaValue: ""
        }
        this.textareaHandleChange = this.textareaHandleChange.bind(this) 

    }
    textareaHandleChange(e){
        this.setState({texteAreaValue: e.target.value});
      }
    valider(){
        const action = {
            type: "GET_FORM_VALUE",
            value: this.state.texteAreaValue
        }
        this.props.dispatch(action)
    }
    render(){
        return (
            <div className="Form">
                <div id="temp">
                    
                        <div className="cBouton">
                            <textarea id="msg" type="text" 
                            name="tdp_list" rows="10" cols="40" 
                            spellCheck="false" placeholder="Coller le texte ici..." 
                            value={this.state.texteAreaValue} onChange={this.textareaHandleChange}>
                            </textarea>
                            <input type="button" value="Valider" onClick={()=>{this.valider()}}/> 
                        </div>
                    
                </div>
            </div>
        );    
    }
}
const mapStateToProps = (state)=>{return {formValue:state.formValue,getFetch:state.getFetch}}
export default connect(mapStateToProps)(Form);