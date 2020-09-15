import React from 'react';
import './App.css';
import Base from './base';
import { Provider } from 'react-redux'
import Store from './store/configureStore'


class App extends React.Component {
  render(){
    return (
      <div>
        <Provider store = {Store}>
          <Base/>       
        </Provider>
      </div>
    );    
  }
}

export default App;
