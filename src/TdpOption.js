import React from 'react'
class TdpOption extends React.Component{
    render(){
        return(this.props.opt !== null? <div className = "optTNI">{this.props.data.opt}</div>:null)
    }
}
export default TdpOption