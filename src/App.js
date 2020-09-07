import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="temp">
            <form>
            
                <div className="cBouton">
                  <div>
                  <textarea id="msg" name="user_message" rows="8" cols="40" spellCheck="false" placeholder="Coller le texte ici..." ></textarea>
                  </div>
                  <div>
                  <input type="button" value="Valider" onClick={()=>{}}/>
                  </div>
                </div>
    
            </form>
        </div>
    </div>
  );
}

export default App;
