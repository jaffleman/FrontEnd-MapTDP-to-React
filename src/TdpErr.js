import React from 'react';
import {connect} from 'react-redux'


class TdpErr extends React.Component{
 
    _toggleView(elem) {  
        const action = { type: "TOGGLE_FAVORITE", value: elem }
        this.props.dispatch(action)
    }
    styler(nd){
        if (this.props.ndToShow === nd) return "Letes2"        
        else{
            if (this.props.alreadyShow.indexOf(nd) === -1){
                return "Letes"
            }else{
                return "Letes3"
            }
        }
    }
  
    render(){
        const {reglette, posission} = this.props.data
        return(      
            <div className = {"Letes3"} onClick = {()=>{}}>
                <p className = "tdp">+ { reglette }-{ posission }</p>
            </div>              
        )
    }
}


const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow, TdpPreviousState:state.TdpPreviousState, alreadyShow:state.alreadyShow}}
export default connect(mapStateToProps)(TdpErr);