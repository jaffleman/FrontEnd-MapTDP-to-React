import React from 'react';
import ShowRep from './ShowRep';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';


class Shower extends React.Component{
    componentDidMount(){
        this.props.dispatch({
            type: "UPDATE_LOADER",
            value: false
          })
    }
    render(){
        const data = this.props.location.state
        const lister = (session)=>{
            if (data.length) return session.map((rep, key)=><ShowRep key={key} rep = {rep}/>)
        }
        return (
            <div className='main'>
                {lister(data)}
            </div>
        )       
    }
}
export default withRouter(connect()(Shower));