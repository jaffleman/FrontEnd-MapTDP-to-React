import React from 'react';
import './App.css';
import Fetcher from './Fetcher'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        data:[]
    };
    this.textareaHandleChange = this.textareaHandleChange.bind(this)
    
  }

  submit(){
      return <Fetcher arg={this.state.value}/>
  }
  
  textareaHandleChange(e){
    this.setState({value: e.target.value});
  }

  

    render(){
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
                            <input type="button" value="Valider" onClick={()=>{this.submit()}}/> 
                        </div>
                    </form>
                </div>
            </div>
        );    
    }
}

export default Form;