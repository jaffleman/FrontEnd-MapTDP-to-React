import React from 'react';
import Rco from './Rco';
import {connect} from 'react-redux'

class RcoCreator extends React.Component{

    render(){
        const tab = []
        const localstructure = this.props.repStructure.tab
        for (let index = 0; index < this.props.number; index++) {
         tab.push('x')
        }
       if  (tab.length!==localstructure[this.props.parentKey].length){
            if (tab.length>localstructure[this.props.parentKey].length) {
                //while (tab.length!==localstructure[this.props.parentKey].length) {
                    localstructure[this.props.parentKey].push([[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]]])
                //}
            }else{
                //while (tab.length!==localstructure[this.props.parentKey].length) {
                    localstructure[this.props.parentKey].pop()
                //}
            }
            const action = {type: "SET_REP_STRUCTURE",value: localstructure};
            this.props.dispatch(action)
        }
        return tab.map((item, key)=>{ return (<Rco parentKey={this.props.parentKey} key={key} number={key}/>)})

    
    }
}
const mapStateToProps = (state)=>{return {
    repStructure: state.repStructure}
}
export default connect(mapStateToProps)(RcoCreator)