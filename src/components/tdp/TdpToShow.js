import React from 'react'

class TdpToShow extends React.Component{
    render(){
        const tdp = this.props.tdp
        return <div>{tdp.regletteType+tdp.regletteNbr}</div>
    }
}
export default TdpToShow





