import React from 'react';
import ShowRep from './ShowRep';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import LaModal from '../ModalContent'
import loader from '../../functions/loaderManager'
import {fetcher} from '../../functions/fetcher'
import {Rep} from '../../classes/rep'
import {compare} from '../../functions/compare'
import {expend} from '../../functions/expend'
import LocalStorageManager from '../../classes/LocalStorageManager';



class Shower extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fetchedData : {},
        }
    }
    localSto = new LocalStorageManager()
    componentDidMount(){
        fetcher("search","POST", this.localSto.requestComparator(this.props.location.state))
        .then((fetchedData)=>this.setState({ 
            fetchedData
        }))
        .then(()=>loader(false, this.props))
    }
    lister = ()=> {
        const expendTdp = expend(compare(this.props.location.state,this.state.fetchedData.data))
        this.localSto.storageStock(expendTdp)
        const tab = []
        expendTdp.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
        return (tab.map(elem => new Rep(elem, expendTdp))).map((rep, key)=><ShowRep key={key} rep = {rep}/>)
    }
    render(){
        if ('data' in this.state.fetchedData) {
            return (
                <div>
                    <LaModal/>
                    <div className='main'>
                        {this.lister()}
                    </div>
                </div>
            )       
        } else return null
    }
}
export default withRouter(connect()(Shower));