import React from 'react';
import './App.css';
import Form from './form';
import TdpFlatList from './TdpFlatList';
import { Provider } from 'react-redux'
import Store from './store/configureStore'

class App extends React.Component {
  render(){
    return (
      <div>
        <Provider store = {Store}>
          <Form/>
          <TdpFlatList/>          
        </Provider>
      </div>
    );    
  }
}

export default App;
