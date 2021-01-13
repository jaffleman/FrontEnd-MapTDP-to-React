import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import VerifRepName from './VerifRepName';
import {Rep} from '../../classes/rep';
import DisplaySalle from './DisplaySalle';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


const extraSession = (sessionData)=>{
        const tab = []
        const reverseData = sessionData.reverse()
        reverseData.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
        const obj = tab.map(elem => new Rep(elem, reverseData))
        return obj
}

const extractStructure = (data) =>{
    return data.map(elem=>{
       return elem.salle.map(elem =>{
           return elem.rco.map(elem=>{
               return elem.ferme.map(elem=>{
                   return elem.level.map(elem=>{
                       return elem
                    })
               })
           })
       })
    })
}

class Displayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            session : {name : undefined},
            repName:'',
            repartiteur:'',
            salle:0,
            rco:0,
            ferme:0,
            structure:[[[[['x'],['x'],['x'],['x'],['x'],['x'],['x'],['x']]]]],
            load:false,
            loadRepResult:''
        }
    }
    handleBodyChange = (e) => {
        const body = e.target.value
        const newStructure = this.state.structure
        const modif = this.state.structure[this.state.salle][this.state.rco][this.state.ferme][parseInt(e.target.id.slice(-1))-1][0]
        newStructure[this.state.salle][this.state.rco][this.state.ferme][parseInt(e.target.id.slice(-1))-1][0]=modif+body
        this.setState({
            structure: newStructure
        })
    }
    handleHeadChange = (e) => {
        const head = e.target.value
        const newStructure = this.state.structure
        if (e.target.id==='head0') {
            const modif = [[head],[head],[head],[head],[head],[head],[head],[head]]
            newStructure[this.state.salle][this.state.rco][this.state.ferme] = [...modif]    
        }else{
            const modif = [head]
            newStructure[this.state.salle][this.state.rco][this.state.ferme][parseInt(e.target.id.slice(-1))-1] = [...modif]
        }
        this.setState({
            structure: newStructure
        })

    }


    handleRepChange = (e)=> {
        this.setState({
            repName:e.target.value.toLowerCase(),
        })
    }
    handleClick = ()=>{
        const callback = (data)=>{
            const mySession = extraSession(data)
            if (mySession.length===0) alert('Nom du Rep introuvable...')
            else  {
                this.setState({session : mySession[0]})
            }
        }
        VerifRepName(this.state.repName, callback)
    }

    handle_valideClick = () => {}
    componentDidMount(){
        if (this.props.location.state) {
            this.setState({
                repName : this.props.location.state.repartiteur,
                structure: [...this.props.location.state.structure['tab']]
            })
        }
        //$( "#salle1" ).addClass( "active" );
    }
    componentWillUnmount(){
        const action = {
            type:"SET_REP_STRUCTURE",
            value:[[[[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]]]]],
        }
        this.props.dispatch(action)
    }
    Tableur({data}){
        const {name,salle}= data
        return name===undefined?null:<Tabs defaultActiveKey="salle1" id="uncontrolled-tab-example">{salle.map(elem=><Tab key={elem.number} eventKey={`salle${elem.number}`} title={`salle${elem.number}`}>data</Tab>)}</Tabs>

    }
    render(){

        
        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={this.handleRepChange} placeholder="ex:cho94" aria-label="ex:cho94" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.handleClick}>Charger</button>
                    </div>
                </div>
                <div className="MyCard" style={{ marginBottom: '40px'}}>
                    <div className="Bando-Titre2 rounded" style={{marginBottom:"1px", }}>
                        Repartiteur de <span style={{color:'red', textTransform:'lowerCase'}}>{this.state.session.name}</span>
                    </div>
                    <DisplaySalle data={this.state.session}/> 
                </div>
            </div>
        )
    }
}
export default withRouter(connect()(Displayer))