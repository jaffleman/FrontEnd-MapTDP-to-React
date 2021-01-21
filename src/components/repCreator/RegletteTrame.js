import React from 'react'
import $ from "jquery";

class RegletteTrame extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            headValue :'',
            bodyValue :'',
        }
    }
    HeadHandleChange = (e) =>{
    }
    EndHandleChange = (e) =>{
    }
    BodyHandleChange = (e) =>{
    }

    componentDidMount(){
    }
    componentDidUpdate(){        
    }


    render(){
        return (
            <div className='RegletteConstructor'>
                <div>
                    <h5><span className="badge badge-secondary">T</span></h5>
                </div>
                
                <div style={{marginLeft:'15px'}}>
                    <select className="custom-select custom-select-sm" style={{textAlign:"right"}} onChange={e=>{}} >
                        <option value="x" defaultValue>----</option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                |===|
                <div style={{marginLeft:'10px', width:'70px'}}>
                    <select className="custom-select custom-select-sm" onChange={e=>{}} style={{}}>
                        <option value="null">...</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Tête Non Isolable</option>
                    </select>
                </div>              
            </div>
        )
    }
}
export default RegletteTrame