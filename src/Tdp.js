import React from 'react';
import {connect} from 'react-redux'
import DeteilView from './DeteilView'
import TdpOption from './TdpOption'
import TdpHeader from './TdpHeader'


class Tdp extends React.Component{
    constructor(props){
        super(props)
 
        this.showrep = false;
        this.showsalle = false;
        this.showrco = false;
         
    }

    componentDidMount(){
        console.log("DIDMOUNT");
  
        const { rep, salle, rco } = this.props.data
        if (this.showrep|this.showsalle|this.showrep ){
            const action = {
                type: "STORE_TDP_STATE",
                value:{
                    rep : rep,
                    salle : salle,
                    rco : rco
                }
            }
            this.props.dispatch(action)
        } 

    }
 
    _toggleView(elem) {  
        const action = { type: "TOGGLE_FAVORITE", value: elem }
        this.props.dispatch(action)
    }
  
    render(){
        const { nd, reglette, posission, opt, rep, salle, rco } = this.props.data
        return(
            <div>
                <TdpHeader data={{rep, salle, rco}} compos={this.props.headCompos}/>
                <div className = "Letes" onClick = {()=>{this._toggleView(nd)}}>
                    <p className = "tdp">{ reglette }-{ posission }</p>
                    <TdpOption opt = {opt}/>
                    <DeteilView data = {this.props.data}/>
                </div>              
            </div>

        )
    }
}

const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow, TdpPreviousState:state.TdpPreviousState}}
export default connect(mapStateToProps)(Tdp);