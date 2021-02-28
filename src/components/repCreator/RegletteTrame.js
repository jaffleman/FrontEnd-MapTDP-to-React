import React from 'react'
import {connect} from 'react-redux';

class RegletteTrame extends React.Component{

    HeadHandleChange = (e) =>{
        const newSession = this.props.session.modifRegType(this.props.tabId, e.target.value)
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }
    EndHandleChange = (e) =>{
        const newSession = this.props.session.modifOption(this.props.tabId, e.target.value)
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }

    render(){
        return (
            <div className='RegletteConstructor'>
                <div>
                    <h5><span className="badge badge-secondary">Trame</span></h5>
                </div>
                
                <div style={{marginLeft:'40px'}}>
                    <select className="custom-select custom-select-sm" style={{textAlign:"right"}} onChange={this.HeadHandleChange.bind(this)} >
                        <option value="x" defaultValue>----</option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                |===|
                <div style={{marginLeft:'10px', width:'70px'}}>
                    <select className="custom-select custom-select-sm" onChange={this.EndHandleChange.bind(this)} style={{}}>
                        <option value="null">...</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Tête Non Isolable</option>
                    </select>
                </div>              
            </div>
        )
    }
}
const mapStateToProps = (state)=>{return {
    session: state.session}
}
export default connect(mapStateToProps)(RegletteTrame)