import React from 'react';
import Fetcher from './Fetcher';
import Form from './form';
import { connect } from 'react-redux';
import TdpFlatList from './TdpFlatList';
import Fetcher2 from './Fetcher2';
import Separator from '../Separator';
import RepCreator from './RepCreator';


const Base = (props) => {
  if (props.getFetch) {
    return <Fetcher arg={props.formValue}/>
  }else{
    if (props.createReglette){
      return <Fetcher2 data={props.tdpErr.data}/>
    }
    if (props.fetchedResultData.length !== 0) {
      return <TdpFlatList/> 
    }else{     
      return (
        <div>
          <h1>MapTDP</h1>
          <div>
            <div style={{marginTop:'20px'}}>
              <Form/> 
            </div>
            <Separator/>
            <div style={{marginTop:'20px'}}>
              <RepCreator/> 
            </div>
          </div>
        </div>
      ) 
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