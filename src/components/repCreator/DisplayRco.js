import React from 'react'
import Tab from 'react-bootstrap/Tab';
import {Row, Col, Nav} from 'react-bootstrap';
import DisplayFerme from '../shower/DisplayFerme';


class DisplayRco extends React.Component{
    render(){
        
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="rco1">
                <Row>
                    <Col xs={2}>
                        <Nav variant="pills" className="flex-column">{this.props.data.map(elem=><Nav.Item><Nav.Link key={`rco${elem.number}`} eventKey={`rco${elem.number}`}>{`rco${elem.number}`}</Nav.Link></Nav.Item>)}</Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>{this.props.data.map(elem=><Tab.Pane key={`tabPanse${this.props.salleNumb}${elem.number}`} eventKey={`rco${elem.number}`}><DisplayFerme key={`displayFerme${this.props.salleNumb}${elem.number}`} data={elem} salleNumb={this.props.salleNumb} rcoNumb={elem.number}/></Tab.Pane>)}</Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}
export default DisplayRco