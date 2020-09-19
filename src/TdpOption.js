import React from 'react'
class TdpOption extends React.Component{
   
    render(){
        return(this.props.opt !== null? <spam className = {this.props.opt === "NON ISOLABLE"?"optTNI":"optI"}>{this.props.opt}</spam>:null)
    }
}
export default TdpOption