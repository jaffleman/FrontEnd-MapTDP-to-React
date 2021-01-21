import React from 'react'
import Tab from 'react-bootstrap/Tab';
import {Nav} from 'react-bootstrap';
import DisplayFerme from '../shower/DisplayFerme';


class DisplayRco extends React.Component{
    render(){
        return (
            <Tab.Container  key={'Tab.Container'+this.props.data.number} id="left-tabs-example" defaultActiveKey="rco1" style={{backgroundColor:'white'}}>
                <Nav fill variant="pills" className="flex">{this.props.data.map(elem=><Nav.Item key={'Nav.Item'+this.props.data.number}><Nav.Link key={`rco${elem.number}`} eventKey={`rco${elem.number}`}>{`rco${elem.number}`}</Nav.Link></Nav.Item>)}</Nav>
                <Tab.Content style={{marginLeft:'10px'}}>{this.props.data.map(elem=><Tab.Pane key={`tabPanse${this.props.salleNumb}${elem.number}`} eventKey={`rco${elem.number}`}><DisplayFerme key={`displayFerme${this.props.salleNumb}${elem.number}`} data={elem} salleNumb={this.props.salleNumb} rcoNumb={elem.number}/></Tab.Pane>)}</Tab.Content>
            </Tab.Container>
        )
    }
}
export default DisplayRco