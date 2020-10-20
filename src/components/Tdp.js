import React from 'react';
import {connect} from 'react-redux'
import DeteilView from './DeteilView'
import TdpHeader from './TdpHeader'
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
            const badgeElement= {
                badgeLabel:'',
                badgeColor:''
            }
           if (opt==='I') {
                badgeElement.badgeColor = "badge-warning";
                badgeElement.badgeLabel = "Inver"
            }else{
                if (opt==='TNI'){
                    badgeElement.badgeColor = "badge-danger";
                    badgeElement.badgeLabel = "NoIso"
                }else{
                    badgeElement.badgeColor = "badge-success";
                    badgeElement.badgeLabel = "Ok!"                   
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
                    <div className = {`tdp ${this.styler(nd)}`} onClick = {()=>{this._toggleView(nd)}}>
                        <div style={{display:'flex' }}>
                            <p style={{margin:'0'}}>{nb}</p>
                            <p style={{flex:10}} className = "tdp2"> {reglette}-{posission}</p>
                            <span className ={`badge badge-pill ${badgeElement.badgeColor}`}>{badgeElement.badgeLabel}</span>
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