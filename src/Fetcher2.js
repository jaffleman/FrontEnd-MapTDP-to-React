import React  from 'react';
//import TdpFlatList from './TdpFlatList';
import { connect } from 'react-redux';


class Fetcher2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {}
        };
      }
      _toggleForm(){

      }
    
      componentDidMount() {
          const {rep, reglette, salle, rco, colone, posissionReglette} = this.props.data
        fetch(`http://tdp.jaffleman.tech:8081/tdpCorrection?arg={"rep":"${rep}","reglette":"${reglette}","salle":${salle},"rco":${rco},"colone":${colone},"posissionReglette":${posissionReglette}}`)
          .then(res => res.json())
          .then(
            (value)=>this.props.dispatch({type:'CLOSE_REGLETTE'}),
            (error) => {
              this.setState({
                isLoaded: true,
                error: true
              });
            }
          )
          this._toggleForm();
      }
    
      render() {
        console.log('RENDER FETCHER2');
              return this.state.error?<div id = "tdp" role="button" onClick={()=>{this.props.dispatch({type:'RESET_APP'})}}>Le serveur n'a pas répondu, contacter le dev.</div>:null  
    }     
      
}

export default connect()(Fetcher2);
