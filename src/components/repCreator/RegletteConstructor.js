import React from 'react'
import $ from "jquery";

class RegletteConstructor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            headValue :'',
            bodyValue :'',
        }
        this.ferme = this.props.parentProps.ferme
        this.rco = this.props.parentProps.rco
        this.salle = this.props.parentProps.salle
        this.structure = this.props.parentProps.structure
    }
    HeadHandleChange = (e) =>{
        if (e.target.id==='head0') {
            for (let index = 1; index < 9; index++) {
                $('#head'+index+' option[value="'+e.target.value+'"]').prop('selected', true)
                this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][index-1][0]=e.target.value

            }
        }else{
            this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0]=e.target.value
        }
    }
    EndHandleChange = (e) =>{
        if (e.target.id==='option0') {
            for (let index = 1; index < 9; index++) {
                $('#option'+index+' option[value="'+e.target.value+'"]').prop('selected', true)
                if (this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][index-1][1]) {
                    if (e.target.value !== "0") {
                        this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][index-1][1]=e.target.value
                    }else{
                        this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][index-1].pop()
                    }
                }else{
                    if (e.target.value !== "0") {
                        this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][index-1].push(e.target.value)
                    }
                     
                }
            }
        }else{
            if (this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][1]) {
                if (e.target.value !== "0") {
                    this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][1]=e.target.value
                }else{
                    this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1].pop()
                }
            }else{
                if (e.target.value !== "0") {
                    this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1].push(e.target.value)
                }
            }
            
        }
    }
    BodyHandleChange = (e) =>{
        if ( this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].length > 4 ) {
            this.setState({
                bodyValue : e.target.value
            },()=> this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0] = this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].slice(0,5)+this.state.bodyValue )
        }
    }
    
    componentDidMount(){
        if (!this.props.trame) {

            const id = `#head${this.props.nd}`
            const optionValue = `option[value=${this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].slice(0,5)}]`
            $(id+' '+optionValue).prop('selected', true)

            if (this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][1]) {
                const id2 = `#option${this.props.nd}`
                const optionValue2 = `option[value=${this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][1]}]`
                $(id2+' '+optionValue2).prop('selected', true)
            }

            if ( this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].length === 7 ) {
                this.setState({
                    bodyValue : this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].slice(-2)
                })
            }
        }
    }
    componentDidUpdate(){
        if (!this.props.trame) {
            const id = `#head${this.props.nd}`
            const optionValue = `option[value="${this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].slice(0,5)}"]`
            $(id+' '+optionValue).prop('selected', true)

            if (this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][1]) {
                const id2 = `#option${this.props.nd}`
                const optionValue2 = `option[value="${this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][1]}"]`
                $(id2+' '+optionValue2).prop('selected', true)
            }else{
                $(`#option${this.props.nd} option[value="0"]`).prop('selected', true)
            }

            if (this.ferme !== this.props.parentProps.ferme|this.rco !== this.props.parentProps.rco|this.salle !== this.props.parentProps.salle) {
                this.ferme = this.props.parentProps.ferme; this.rco = this.props.parentProps.rco; this.salle = this.props.parentProps.salle;
                if ( this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].length === 7 ) {
                    this.setState({
                        bodyValue : this.props.parentProps.structure[this.props.parentProps.salle][this.props.parentProps.rco][this.props.parentProps.ferme][this.props.nd-1][0].slice(-2)
                    })
                }else{
                    this.setState({
                        bodyValue : ""
                    })
                }  
            }
        }else{
            $('#head0 option[value="x"').prop('selected', true)
            $(`#option0 option[value="0"]`).prop('selected', true)
        }

    }


    render(){
        return (
            
            <div className='RegletteConstructor'>
                <div>
                    <h5><span className="badge badge-secondary">{this.props.trame?"T":this.props.nd}</span></h5>
                </div>
                
                <div style={{}}>
                    <select className="custom-select custom-select-sm"  id={`head${this.props.nd}`} style={{width:"105px", textAlign:"right"}} onChange={e=>this.HeadHandleChange(e)} >
                        <option value="x" defaultValue>-----</option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                {
                    this.props.trame?" |===| ":<input 
                        id={`body${this.props.nd}`}
                        type="text" 
                        maxLength="2" 
                        style={{width:"46px"}} 
                        className="form-control form-control-sm" 
                        onChange = {e=>this.BodyHandleChange(e)}
                        value={this.state.bodyValue}
                        onBlur={()=>{}}
                        />
                }
                <div style={{marginLeft:'10px'}}>
                    <select className="custom-select custom-select-sm"  id={`option${this.props.nd}`} onChange={e=>this.EndHandleChange(e)} style={{}}>
                        <option value="0">...</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Tête Non Isolable</option>
                    </select>
                </div>               
            </div>
        )
    }
}
export default RegletteConstructor