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
            fetchedData : null
        }
    }
    componentDidMount(){
        const localStoAccess = storageAvailable('localStorage')
        fetcher("search","POST",RequestStorageComparator(this.props.location.state, localStoAccess))
        .then((fetchedResult)=>{
            if ('data' in fetchedResult){
                const expendTdp = expend(compare(this.props.location.state,fetchedResult.data, localStoAccess))
                storageStock(expendTdp, localStoAccess)
                const tab = []
                expendTdp.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
                    const object = tab.map(elem => new Rep(elem, expendTdp))
                    console.log(object)
                    return object
            }   
        })
        .then((fetchedData)=>this.setState({ fetchedData }))
        .then(()=>loader(false, this.props))
    }
    render(){
        if (this.state.fetchedData === null) {
            console.log('fetchedData=undefined')
            return null
        } else {
            console.log(this.state.fetchedData)
            const lister = ()=> this.state.fetchedData.map((rep, key)=><ShowRep key={key} rep = {rep}/>)
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
}
export default withRouter(connect()(Shower));