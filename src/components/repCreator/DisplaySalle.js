import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DisplayRco from './DisplayRco';
import ItemsManager from './ItemsManager';


class DisplaySalle extends React.Component{
    
    render(){
        const {name,salle} = this.props.data
        return(
            <div className="MyCard" style={{ marginBottom: '40px'}}>
                <div className="Bando-Titre2 rounded" style={{marginBottom:"1px", }}>
                    Repartiteur de <span style={{color:'red', textTransform:'lowerCase'}}>{name}</span>
                </div>
                {name===undefined?null:<Tabs justify defaultActiveKey="salle1" id="uncontrolled-tab-example">{salle.map(elem=><Tab key={"Salle"+elem.number} eventKey={`salle${elem.number}`} title={`salle${elem.number}`}><DisplayRco key={"rco"+elem.number} data={elem.rco} salleNumb={elem.number}/></Tab>)}<Tab key={'0'} eventKey={'+'} title={'+/-'}><ItemsManager function={this.props.function}/></Tab></Tabs>}
            </div>
        ) 

    }
}
export default DisplaySalle