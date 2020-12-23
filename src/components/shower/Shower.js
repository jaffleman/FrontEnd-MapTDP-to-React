import React from 'react';
import ShowRep from './ShowRep';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import LaModal from '../ModalContent'


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
            <div>
                <LaModal/>
                <div className='main'>
                    {lister(data)}
                </div>
            </div>
        )       
    }
}
export default withRouter(connect()(Shower));