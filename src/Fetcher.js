import React  from 'react';
//import TdpFlatList from './TdpFlatList';
import { connect } from 'react-redux';


class Fetcher extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {}
        };
      }
      _toggleForm(){
          const action = {
            type: "TOGGLE_FORM",
            value : false
          }
          this.props.dispatch(action)
      }
    
      componentDidMount() {
        fetch("http://tdp.jaffleman.tech:8081/datas?arg="+this.props.arg)
          .then(res => res.json())
          .then(
            (result) => {
                const action = {
                    type: "GET_FETCH_VALUE",
                    value: result
                }
              this.props.dispatch(action);
            },
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
              return this.state.error?<div id = "tdp" role="button" onClick={()=>{this.props.dispatch({type:'RESET_APP'})}}>Le serveur n'a pas répondu, contacter le dev.</div>:null  
    }     
      
}

export default connect()(Fetcher);