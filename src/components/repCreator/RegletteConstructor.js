import React from 'react'
import {connect} from 'react-redux';

class RegletteConstructor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nd:this.props.nd,
            val:this.props.val,
        }
    }
    HeadHandleChange = (e) =>{
        const newTdp={...this.state.val.tdps[0], regletteType:e.target.value} 
        const newVal={...this.state.val, tdps:[newTdp]}
        this.setState({val:newVal})
    }
    EndHandleChange = (e) =>{
        const newTdp={...this.state.val.tdps[0], option:e.target.value} 
        const newVal={...this.state.val, tdps:[newTdp]}
        this.setState({val:newVal})
    }
    BodyHandleChange(e){
        const leTdp = this.props.repCreatorData.brut.findIndex(tdp=>tdp._id===this.props.val.tdps[0]._id)
        if (leTdp !== -1){
            const newBrut = [...this.props.repCreatorData.brut]
            newBrut[leTdp] = {...this.props.repCreatorData.brut[leTdp], regletteNbr:e.target.value}
            this.props.dispatch({
                type: 'SET_BRUT_DATA',
                value: newBrut
            })
        }
    }


    render(){
        return (
            <div className='RegletteConstructor'>
                <div>
                    <h5><span className="badge badge-secondary">{this.props.nd}</span></h5>
                </div>
                
                <div style={{marginLeft:'15px'}}>
                    <select className="custom-select custom-select-sm" value={this.props.val.tdps[0].regletteType}  id={`select1:${this.props.val.tdps[0]._id}${this.props.keyOrigin}`} style={{textAlign:"right"}} onChange={()=>{}}>
                        <option value="x" defaultValue>-----</option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                
                <input 
                    id={`input:${this.props.val.tdps[0]._id}${this.props.keyOrigin}`}
                    type="text" 
                    maxLength="2" 
                    style={{width:"46px"}} 
                    className="form-control form-control-sm"
                    value={this.props.val.tdps[0].regletteNbr}
                    onChange = {this.BodyHandleChange.bind(this)}  
                    onBlur={()=>{}}
                />
                
                <div style={{marginLeft:'10px', width:'70px'}}>
                    <select className="custom-select custom-select-sm" value={this.props.val.tdps[0].option===null?'...':this.props.val.tdps[0].option} id={`${this.props.val.tdps[0]._id}option${this.props.keyOrigin}`} onChange={this.EndHandleChange.bind(this)} style={{}}>
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
    repCreatorData: state.repCreatorData}
}
export default connect(mapStateToProps)(RegletteConstructor)