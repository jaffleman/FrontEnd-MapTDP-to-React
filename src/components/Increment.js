import React from 'react'

class Increment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:1,
        }
    }
    Add = ()=>{
        if (this.state.value<4) {
            const newValue = this.state.value+1
            this.setState({
                value : newValue,
            })            
        }
    }
    Remove = ()=>{
        if (this.state.value>1) {
            const newValue = this.state.value-1
            this.setState({
                value : newValue, 
            })           
        }
    }

    render(){
        return(
            <div className="btn-toolbar  sm-1" role="toolbar" aria-label="Toolbar with button groups">
                <div className="input-group input-group-sm ">
                    <div className="input-group-prepend">
                        <div className="input-group-text" style={{maxHeight:"31px"}} id="btnGroupAddon">Nombre de {this.props.name}</div>
                    </div>
                        <input type="text" className="form-control col-sm-1" style={{maxWidth:"30px"}}  value={this.state.value}  aria-describedby="btnGroupAddon" readOnly/>
                </div>
                <div className="btn-group btn-group-sm mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary" onClick={this.Remove}>-</button>
                    <button type="button" className="btn btn-secondary" onClick={this.Add}>+</button>
                </div>
                <div style={{width: "-webkit-fill-available"}}>
                    {this.props.call(this.state.value,this.state.salleNum)}
                </div>
            </div>
        )
    }

}
export default Increment
