import React from 'react';
import {connect} from 'react-redux'
import DeteilView from './DeteilView'
import TdpHeader from './TdpHeader'
import VoyantVert from './VoyantVert.png'



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
        let nb= this.props.nd
        nb++
        console.log(opt);
        let voyant
            if (opt==='INVERSEE') {
                voyant = null //VoyantOrange
            }else{
                if (opt==='TNI'){
                    voyant = null //VoyantRouge
                }else{
                    voyant = VoyantVert
                }
            }
        
        return(
            <div>
                <TdpHeader data={{rep, salle, rco}} compos={this.props.headCompos}/>
                <div className = {this.styler(nd)} onClick = {()=>{this._toggleView(nd)}}>
                    <div style={{display:'flex' }}>
                        <p style={{margin:'0'}}>{nb}</p>
                        <p style={{flex:10}} className = "tdp"> {reglette}-{posission}</p>
                        <img src={voyant} width={"20"} height={"20"} alt={"OK"}></img>
                        
                    </div>
                    {/*<TdpOption opt = {opt}/>*/}
                    <DeteilView data = {this.props.data}/>
                </div>              
            </div>

        )
    }
}


const mapStateToProps = (state)=>{return {
    ndToShow:state.ndToShow, 
    TdpPreviousState:state.TdpPreviousState, 
    alreadyShow:state.alreadyShow
}}
export default connect(mapStateToProps)(Tdp);