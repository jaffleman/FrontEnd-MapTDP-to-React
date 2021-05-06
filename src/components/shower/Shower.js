import React from 'react';
import ShowRep from './ShowRep';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import LaModal from '../ModalContent'
import loader from '../../functions/loaderManager'

class Shower extends React.Component{
    componentDidMount(){
        loader(false, this.props)
    }
    render(){
        const data = this.props.location.state
        const lister = ()=> data.map((rep, key)=><ShowRep key={key} rep = {rep}/>)
        return (
            <div>
                <LaModal/>
                <div className='main'>
                    {lister()}
                </div>
            </div>
        )       
    }
}
export default withRouter(connect()(Shower));