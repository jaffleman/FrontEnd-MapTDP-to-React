import React from 'react';
import CreatSalle from './CreatSalle';
import {connect} from 'react-redux'

class SalleCreator extends React.Component{


    render(){
        const tab = []
        const localstructure = this.props.repStructure.tab
        for (let index = 0; index < this.props.number; index++) {
            tab.push('x')
        }
        if  (tab.length!==localstructure.length){
            if (tab.length>localstructure.length) localstructure.push([[[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]]]])
            else localstructure.pop()
            this.props.dispatch({type: "MUST_SET_REP_STRUCTURE",value: localstructure})
        }
        const compoRender = tab.map((item, key)=>{ 
            return (
                <div key={key} className="Creator">
                    <h5>Salle: {key+1}</h5>
                    <CreatSalle key={key} salleNum={key}/>
                </div>
            )
        })
        return (compoRender)    
    }
}
const mapStateToProps = (state)=>{return {
    repStructure: state.repStructure}
}

export default connect(mapStateToProps)(SalleCreator)