import React from 'react';
import {connect} from 'react-redux'
import DeteilView from './DeteilView'
import LongPress from '../LongPress'

class ShowTdp extends React.Component{
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
        const {_id, regletteType, regletteNbr,  option, plot} = this.props.tdp

        const badgeElement= {
            badgeLabel:'',
            badgeColor:''
        }
        if (option==='I') {
            badgeElement.badgeColor = "badge-warning";
            badgeElement.badgeLabel = "Inver"
        }else{
            if (option==='TNI'){
                badgeElement.badgeColor = "badge-danger";
                badgeElement.badgeLabel = "NoIso"
            }else{
                badgeElement.badgeColor = "badge-success";
                badgeElement.badgeLabel = "Ok!"                   
            }
        }
        
            
        return(
            <div>
                <LongPress
                    key={_id}
                    time={500}
                    onLongPress={() => this.addToPressed(_id)}
                    onPress={() => this.removeFromPressed(_id)}
                    > 
                    <div className = {`tdp ${this.styler(_id)}`} onClick = {()=>{this._toggleView(_id)}}>
                        <div style={{display:'flex' }}>
                            <p style={{margin:'0'}}>{}</p>
                            <p style={{flex:10}} className = "tdp2"> {regletteType+regletteNbr}-{plot}</p>
                            <span className ={`badge badge-pill ${badgeElement.badgeColor}`}>{badgeElement.badgeLabel}</span>
                        </div>
                        <DeteilView data = {this.props.tdp}/>
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
export default connect(mapStateToProps)(ShowTdp);