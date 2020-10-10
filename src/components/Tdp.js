import React from 'react';
import {connect} from 'react-redux'
import DeteilView from './DeteilView'
import TdpHeader from './TdpHeader'
import VoyantVert from '../img/VoyantVert.png'
import VoyantRouge from '../img/VoyantRouge.png'
import VoyantOrange from '../img/VoyantJaune.png'
import LongPress from '../LongPress'

class Tdp extends React.Component{
    state = {
        pressed: []
      };
    
    addToPressed = (index) =>
    {
        if (index === this.props.ndToShow){
            this.setState({pressed: [index]});
            const action= {
                type: 'SHOW_MODAL',
                data:this.props.data,
                value:true,
            }
            this.props.dispatch(action)
        }
    };
    handleClick(e){
        const action= {
            type: 'SHOW_MODAL',
            data:this.props.data,
            value:true,
        }
        this.props.dispatch(action)
    }

    removeFromPressed = index =>
    this.setState({pressed: this.state.pressed.filter(i => i !== index)});

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
            if (opt==='I') {
                voyant = VoyantOrange
            }else{
                if (opt==='TNI'){
                    voyant = VoyantRouge
                }else{
                    voyant = VoyantVert
                }
            }
        
        return(
            <div>
                <TdpHeader data={{rep, salle, rco, nd}} compos={this.props.headCompos}/>
                <LongPress
                    key={nd}
                    time={500}
                    onLongPress={() => this.addToPressed(nd)}
                    onPress={() => this.removeFromPressed(nd)}
                    > 
                    <div className = {this.styler(nd)} onClick = {()=>{this._toggleView(nd)}}>
                        <div style={{display:'flex' }}>
                            <p style={{margin:'0'}}>{nb}</p>
                            <p style={{flex:10}} className = "tdp"> {reglette}-{posission}</p>
                            <img src={voyant} width={"20"} height={"20"} alt={"OK"}></img>
                            
                        </div>
                        {/*<TdpOption opt = {opt}/>*/}
                        <DeteilView data = {this.props.data}/>
                    </div> 
                </LongPress>
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