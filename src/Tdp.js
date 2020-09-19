import React from 'react';
import {connect} from 'react-redux'
import DeteilView from './DeteilView'
import TdpOption from './TdpOption'
import TdpHeader from './TdpHeader'


class Tdp extends React.Component{
 
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
        const { nd, reglette, posission, opt, rep, salle, rco } = this.props.data
        return(
            <div>
                <TdpHeader data={{rep, salle, rco}} compos={this.props.headCompos}/>
                <div className = {this.styler(nd)} onClick = {()=>{this._toggleView(nd)}}>
                    <p className = "tdp">{nd} { reglette }-{ posission }</p>
                    <TdpOption opt = {opt}/>
                    <DeteilView data = {this.props.data}/>
                </div>              
            </div>

        )
    }
}


const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow, TdpPreviousState:state.TdpPreviousState, alreadyShow:state.alreadyShow}}
export default connect(mapStateToProps)(Tdp);