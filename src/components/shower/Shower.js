import React from 'react';
import ShowRep from './ShowRep';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import LaModal from '../ModalContent'
import loader from '../../functions/loaderManager'
import {fetcher} from '../../functions/fetcher'
import RequestStorageComparator from '../../functions/RequestStorageComparator'
import storageAvailable from '../../functions/storageCheck'
import {Rep} from '../../classes/rep'
import {compare} from '../../functions/compare'
import {expend} from '../../functions/expend'
import storageStock from '../../functions/storageStockage'



class Shower extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fetchedData : {},
            localStoAccess : null
        }
    }
    componentDidMount(){
        console.log('componentDidMount()')
        const localStoAccess = storageAvailable('localStorage')
        fetcher("search","POST",RequestStorageComparator(this.props.location.state, localStoAccess))
        .then((fetchedData)=>this.setState({ 
            fetchedData,
            localStoAccess
        }))
        .then(()=>loader(false, this.props))
    }
    lister = ()=> {
        const expendTdp = expend(compare(this.props.location.state,this.state.fetchedData.data, this.state.localStoAccess))
        storageStock(expendTdp, this.state.localStoAccess)
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
        } else {
            console.log('fetchedData=undefined')
            return null
        }
    }
}
export default withRouter(connect()(Shower));