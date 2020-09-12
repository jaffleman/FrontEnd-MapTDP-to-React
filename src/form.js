import React from 'react';
import './App.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.textareaHandleChange = this.textareaHandleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  textareaHandleChange(e){
    this.setState({value: e.target.value});
  }
  submit(){
    alert(this.state.value);
  }

  render(){
    return (
      <div className="Form">
        <div id="temp">
              <form>

                <div className="cBouton">
                  <div>
                    <textarea id="msg" type="text" 
                    name="tdp_list" rows="8" cols="40" 
                    spellCheck="false" placeholder="Coller le texte ici..." 
                    value={this.state.value} onChange={this.textareaHandleChange}>
                    </textarea>
                  </div>
                  <div>
                    <input type="button" value="Valider" onClick={this.submit}/>
                  </div>
                </div>
              
              </form>
          </div>
      </div>
    );    
  }
}

export default Form;