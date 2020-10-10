import React from 'react';
import { connect } from 'react-redux';



class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            texteAreaValue: ""
        }
        this.textareaHandleChange = this.textareaHandleChange.bind(this) 
    }
    myStyle = {
        marginTop:'10px', 
        fontWeight:'bold', 
        textTransform:'uppercase'
    }
    textareaHandleChange(e){
        this.setState({texteAreaValue: e.target.value});
    }
    valider(){
        this.props.dispatch({
            type: "GET_FORM_VALUE",
            value: this.state.texteAreaValue
        })
    }
    render(){
        return (
            <div className="dark">
                <div className="bandoRechercheTdp"><p style={this.myStyle}>recherche de positions</p></div>
                <textarea id="msg" type="text" 
                name="tdp_list" rows="10" cols="40" 
                spellCheck="false" placeholder="Coller votre liste de TDP ici..." 
                value={this.state.texteAreaValue} onChange={this.textareaHandleChange}>
                </textarea>
                <input type="button" className="ButtonStyle" value="RECHERCHER" onClick={()=>{this.valider()}}/>                  
            </div>
        );    
    }
}
const mapStateToProps = (state)=>{return {formValue:state.formValue,getFetch:state.getFetch}}
export default connect(mapStateToProps)(Form);