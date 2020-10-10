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

    
  componentDidMount() {
    let adress;
    const {rep, reglette, salle, rco, colone, posissionReglette} = this.props.data
    if (this.props.nd){
      const tdp = this.props.lesTdp[this.props.nd-1]
      adress = `http://tdp.jaffleman.tech:8081/tdpCorrection?arg={"newPosition":{"rep":"${rep}","reglette":"${reglette}","salle":${salle},"rco":${rco},"colone":${colone},"posissionReglette":${posissionReglette}},"oldPosition":{"oldSalle":${tdp.salle},"oldRco":${tdp.rco},"oldColone":${tdp.colone},"oldPosissionReglette":${tdp.posissionReglette}}}`
    }else{
      adress = `http://tdp.jaffleman.tech:8081/tdpCorrection?arg={"newPosition":{"rep":"${rep}","reglette":"${reglette}","salle":${salle},"rco":${rco},"colone":${colone},"posissionReglette":${posissionReglette}}}`
    }
    
    fetch(adress)
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
  }

  render() {

    return this.state.error?<div id = "tdp" role="button" onClick={()=>{this.props.dispatch({type:'RESET_APP'})}}>Le serveur n'a pas répondu, contacter le dev.</div>:null  
  }     
}
const mapStateToProps = (state)=>{return {
  lesTdp:state.fetchedResultData.value,
  nd:state.ndToShow
}}
export default connect(mapStateToProps)(Fetcher2);
