import React from 'react';
import './App.css';
import Form from './form';
import TdpFlatList from './TdpFlatList';
class App extends React.Component {

  render(){
    return (
      <div>
        <Form/>
        <TdpFlatList/>
      </div>
    );    
  }
}

export default App;
