import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DisplayRco from './DisplayRco';


class DisplaySalle extends React.Component{
    render(){
        const {name,salle}= this.props.data
        return name===undefined?null:<Tabs defaultActiveKey="salle1" id="uncontrolled-tab-example">{salle.map(elem=><Tab key={"Salle"+elem.number} eventKey={`salle${elem.number}`} title={`salle${elem.number}`}><DisplayRco key={"rco"+elem.number} data={elem.rco} salleNumb={elem.number}/></Tab>)}</Tabs>

    }
}
export default DisplaySalle