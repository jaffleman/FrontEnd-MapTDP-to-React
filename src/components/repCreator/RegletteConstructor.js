import React from 'react'
import $ from "jquery";

class RegletteConstructor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            headValue :'',
            bodyValue :'',
        }
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
        const nd = this.props.nd
        const val = this.props.val

        if (nd>0) {
            if (val){
                const id = `#head${nd}`
                const optionValue = `option[value="${val.tdp[0].regletteType}"]`
                $(id+' '+optionValue).prop('selected', true)
    
    
                const id2 = `#option${nd}`
                const optionValue2 = val.tdp[0].option===""?"null":`option[value="${val.tdp[0].option}"]`
                $(id2+' '+optionValue2).prop('selected', true)
    
                const id3 = `${this.props.keyOrigin}${this.props.nd}`
                $(id3).val(val.tdp[0].regletteNbr)
            }else{
                const id = `#head${nd}`
                const optionValue = `option[value="x"]`
                $(id+' '+optionValue).prop('selected', true)
    
    
                const id2 = `#option${nd}`
                const optionValue2 = 'option[value="null"]'
                $(id2+' '+optionValue2).prop('selected', true)
    
                const id3 = `${this.props.keyOrigin}${this.props.nd}`
                $(id3).val("")
            }
        }

    }
    componentDidUpdate(){
        const nd = this.props.nd
        const val = this.props.val
        if (this.props.nd>0) {
            if (val){
                console.log(this.props.val)
                const id = `#head${nd}`
                const optionValue = `option[value="${val.tdp[0].regletteType}"]`
                $(id+' '+optionValue).prop('selected', true)
    
    
                const id2 = `#option${nd}`
                const optionValue2 = val.tdp[0].option===""?"null":`option[value="${val.tdp[0].option}"]`
                $(id2+' '+optionValue2).prop('selected', true)
    
                const id3 = `#${this.props.keyOrigin}${this.props.nd}`
                $(id3).val(val.tdp[0].regletteNbr)
            }else{
                const id = `#head${nd}`
                const optionValue = `option[value="x"]`
                $(id+' '+optionValue).prop('selected', true)
    
    
                const id2 = `#option${nd}`
                const optionValue2 = 'option[value="null"]'
                $(id2+' '+optionValue2).prop('selected', true)
    
                const id3 = `#${this.props.keyOrigin}${this.props.nd}`
                $(id3).val("")
            }
        } 
    }


    render(){
        
        return (
            <div className='RegletteConstructor'>
                <div>
                    <h5><span className="badge badge-secondary">{this.props.nd==="0"?"T":this.props.nd}</span></h5>
                </div>
                
                <div style={{}}>
                    <select className="custom-select custom-select-sm"  id={`head${this.props.nd}`} style={{width:"105px", textAlign:"right"}} onChange={e=>{}} >
                        <option value="x" defaultValue>-----</option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                {
                    this.props.nd==="0"?" |===| ":<input 
                        id={`${this.props.keyOrigin}${this.props.nd}`}
                        type="text" 
                        maxLength="2" 
                        style={{width:"46px"}} 
                        className="form-control form-control-sm" 
                        value=""
                        onChange = {e=>{}}  
                        onBlur={()=>{}}
                        />
                }
                <div style={{marginLeft:'10px'}}>
                    <select className="custom-select custom-select-sm"  id={`option${this.props.nd}`} onChange={e=>{}} style={{}}>
                        <option value="null">...</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Tête Non Isolable</option>
                    </select>
                </div>              
            </div>
        )
    }
}
export default RegletteConstructor