import React from 'react'
import Tab from 'react-bootstrap/Tab'

class SalleD extends React.Component{
    render(){
        return (
            <Tab eventKey={`Salle${this.props.num}`} title={`Salle${this.props.num}`}>
                {"Salle: " + this.props.num}
            </Tab>
        )
    }
}
export default SalleD