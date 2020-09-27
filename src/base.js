import React from 'react';
import './App.css';
import Fetcher from './Fetcher';
import Form from './form';
import { connect } from 'react-redux';
import TdpFlatList from './TdpFlatList';
import Fetcher2 from './Fetcher2';


class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
 
  render(){
console.log('RENDER BASE');
    if (this.props.getFetch) {
      console.log("etage1");
      return <Fetcher arg={this.props.formValue}/>
    }else{
      if (this.props.createReglette){
        console.log("etage2");
        return <Fetcher2 data={this.props.tdpErr.data}/>
      }
        if (this.props.fetchedResultData.length !== 0) {
          console.log("etgae3");
          return <TdpFlatList/> 
        
        }else{  
          console.log("etage4");     
          return (
            <div>
            <h1>MapTDP</h1>
            <div className="Form">
              <div id="temp">
                <form>
                  <Form/>
                </form>
              </div>
            </div></div>
          ) 
        }        
             
    }
  }
}
const mapStateToProps = (state)=>{return {
  tdpErr:state.tdpErr,
  formValue:state.formValue, 
  getFetch:state.getFetch, 
  fetchedResultData:state.fetchedResultData,
  createReglette:state.createReglette,
}}
export default connect(mapStateToProps)(Base);