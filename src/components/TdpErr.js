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
    handleClick(e){
        const action= {
            type: 'SHOW_MODAL',
            data:this.props.data,
            value:true,
        }
        this.props.dispatch(action)
    }
  
    render(){
        const {reglette, posission} = this.props.data
        return(      
            <div className ="tdp Letes3" onClick={this.handleClick.bind(this)}>
                <p style={{margin:0}}>+ { reglette }-{ posission }</p>
            </div>              
        )
    }
}


const mapStateToProps = (state)=>{return {
    ndToShow:state.ndToShow, 
    TdpPreviousState:state.TdpPreviousState, 
    alreadyShow:state.alreadyShow,
    tdpErr:state.tdpErr
}}
export default connect(mapStateToProps)(TdpErr);