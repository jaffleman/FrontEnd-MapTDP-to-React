import React from 'react';
import {connect} from 'react-redux'

class ShowTdp extends React.Component{
    state = {
        pressed: []
      };

    _toggleView(elem) {  
        const action = { type: "TOGGLE_FAVORITE", value: elem }
        this.props.dispatch(action)
    }
    showModal(){

    }
  
    render(){
        const {_id, regletteType, regletteNbr, plot} = this.props.tdp            
        return(
            <div className ="tdp Letes3" onClick = {()=>{this.showModal(_id)}}>
                <div style={{display:'flex' }}>
                    <p style={{margin:'0'}}>{"what!"}</p>
                    <p style={{flex:10}} className = "tdp2"> {regletteType+regletteNbr}-{plot}</p>
                </div>
            </div> 
        )
    }
}


const mapStateToProps = (state)=>{return {
    ndToShow:state.ndToShow, 
    alreadyShow:state.alreadyShow
}}
export default connect(mapStateToProps)(ShowTdp);