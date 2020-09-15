import React from 'react';
import './App.css';
import Fetcher from './Fetcher';
import Form from './form';
import { connect } from 'react-redux';


class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
 
    render(){
        if (this.props.getFetch) {
            return <Fetcher arg={this.props.formValue}/>
        }else{
        return (
            <div className="Form">
                <div id="temp">
                    <form>
                      <Form/>
                    </form>
                </div>
            </div>
        );    
    }
}
}
const mapStateToProps = (state)=>{return {formValue:state.formValue,getFetch:state.getFetch}}
export default connect(mapStateToProps)(Base);