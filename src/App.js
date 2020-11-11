import React from 'react';
import './App.css';
//import Base from './components/base';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import Accueil from './components/Accueil'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Recherche from './components/Recherche';
import MapTdpHeader from './MapTdpTitle';
import CreatRep from './components/CreatRep';
import Peupler from './components/Peupler'

class App extends React.Component {
  goToRecherche = ()=>{
    return <Link to="/Recherche"/>
  }
  render(){
    return (
      <div> 
        <MapTdpHeader/>
        <Provider store = {Store}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Accueil/>  
              </Route>    
              <Route exact path="/Recherche">
                <Recherche/>  
              </Route>  
              <Route exact path="/CreatRep">
                <CreatRep/>  
              </Route> 
              <Route exact path="/Peupler">
                <Peupler/>  
              </Route> 
            </Switch>
          </Router>
        </Provider>
      </div>
    );    
  }
}

export default App;
