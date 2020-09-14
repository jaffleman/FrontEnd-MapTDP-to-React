import React from 'react';
import './App.css';
import {connect} from 'react-redux';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        data:[]
    };
    this.textareaHandleChange = this.textareaHandleChange.bind(this) 
  }
    valider() {  
        const action = { type: "CAPTER_DATA", value: this.state.value }
        this.props.dispatch(action)
    }
  
  textareaHandleChange(e){
    this.setState({value: e.target.value});
  }

  

    render(){
        console.log("Form RENDER");
        return (
            <div className="Form">
                <div id="temp">
                    <form>
                        <div className="cBouton">
                            <textarea id="msg" type="text" 
                            name="tdp_list" rows="10" cols="40" 
                            spellCheck="false" placeholder="Coller le texte ici..." 
                            value={this.state.value} onChange={this.textareaHandleChange}>
                            </textarea>
                            <input type="button" value="Valider" onClick={()=>{this.valider()}}/> 
                        </div>
                    </form>
                </div>
            </div>
        );    
    }
}

export default connect()(Form);