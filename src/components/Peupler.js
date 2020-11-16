import React from 'react'
import {connect} from 'react-redux'
import Switcher from './Switcher'
import RegletteConst from './RegletteConstructor'
import { withRouter } from 'react-router-dom';
import Loader from './Loader';
import VerifRepName from './VerifRepName'

class Peupler extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            repName:'',
            repartiteur:'',
            salle:0,
            rco:0,
            ferme:0,
            structure:[[[[['x'],['x'],['x'],['x'],['x'],['x'],['x'],['x']]]]],
            load:false,
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
        if (VerifRepName(this.state.repName)) {
            this.setState({
                repartiteur:'',
                salle:0,
                rco:0,
                ferme:0,
                structure:[[[[['x'],['x'],['x'],['x'],['x'],['x'],['x'],['x']]]]],
                load:true
            },
            ()=>{
                fetch(`http://82.64.128.239:8082/getrepstruct?arg=${this.state.repName}`)
                .then(res => res.json())
                .then( result=>{
                        this.setState({
                            load:false,
                        })
                        if (result.status === 'ok'){                        
                            const action = {
                                type:"SET_REP_STRUCTURE",
                                value:result.data.tab,
                            }
                            this.props.dispatch(action)
                            this.setState({
                                repartiteur:result.repName,
                                structure:result.data.tab
                            })
                            alert(this.state.repName+' charger avec succes!')
                        }else{
                            alert(result.text)
                        }
                },error => console.error(error))
                .catch(err=>console.log(err))
            })


        } else {
            alert('Nom du Rep incorrect...');
        }    
    }
    fermeUp = () => {
        if ((this.state.ferme+1) < this.state.structure[this.state.salle][this.state.rco].length) {
            this.setState({
                ferme : this.state.ferme +1
            })
        }
    }
    fermeBack = () => {
        if (this.state.ferme > 0) {
            this.setState({
                ferme : this.state.ferme -1
            })
       }
    }

    rcoUp = () => {
        if ((this.state.rco+1) < this.state.structure[this.state.salle].length) {
            this.setState({
                rco : this.state.rco +1,
                ferme : 0
            })
        }
    }
    rcoBack = () => {
        if (this.state.rco > 0) {
            this.setState({
                rco : this.state.rco -1,
                ferme : 0
            })
        }
    }

    salleUp = () => {
        if ((this.state.salle+1) < this.state.structure.length) {
            this.setState({
                salle : this.state.salle +1,
                rco : 0,
                ferme : 0
            })
        }
    }
    salleBack = () => {
        if (this.state.salle > 0) {
            this.setState({
                salle : this.state.salle -1,
                rco : 0,
                ferme : 0
            })            
        }
    }
    handle_valideClick = () => {
        if (VerifRepName(this.state.repName)) {
            const validate = window.confirm('Tout est ok ?? Tu confirmes la sauvegarde des changement de '+this.state.repName)
            if (validate) {
                this.setState({
                    load:true
                },
                ()=>{
                    console.log(JSON.stringify(this.state.structure))
                    fetch(`http://82.64.128.239:8082/CreatRep?arg={"repName":"${this.state.repName}","peupler":true, "structure":{"tab":${JSON.stringify(this.state.structure)}}}`)
                    .then(result=>result.text())
                    .then((result)=>{
                        alert(result.msg);
                        this.setState({
                            load:false
                        })
                    })
                    .catch((err)=>alert('Echec: Le serveur n\'a pas répondu. '+err))
                })
            }else{ alert("T'as oublié le nom du rep bro...")}
        }
    }
    componentDidMount(){
        if (this.props.location.state) {
            this.setState({
                repName : this.props.location.state
            },()=>this.handleClick())
        }
    }
    componentWillUnmount(){
        const action = {
            type:"SET_REP_STRUCTURE",
            value:[[[[["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]]]]],
        }
        this.props.dispatch(action)
    }
    Load = () => {
        return this.state.load?<Loader/>:null
    }
    render(){
        const parentProps = {
            ferme : this.state.ferme,
            rco : this.state.rco,
            salle : this.state.salle,
            structure : this.state.structure
        }
        return (
            <div>
                <div className="MyCard" style={{ marginBottom: '40px'}}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" onChange={this.handleRepChange} placeholder="ex:cho94" aria-label="ex:cho94" aria-describedby="button-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.handleClick}>Charger</button>
                        </div>
                    </div>
                    <div className="Bando-Titre2 rounded" style={{marginBottom:"5px", }}>
                        Repartiteur de <span style={{color:'red', textTransform:'lowerCase'}}>{this.state.repartiteur}</span>
                    </div>
                    <div>
                        <Switcher number={this.state.salle} total={this.state.structure.length} next={this.salleUp} back={this.salleBack} text='salle'/>
                        <Switcher number={this.state.rco} total={this.state.structure[this.state.salle].length} next={this.rcoUp} back={this.rcoBack} text='rco'/>
                        <Switcher number={this.state.ferme} total={this.state.structure[this.state.salle][this.state.rco].length} next={this.fermeUp} back={this.fermeBack} text='colonne'/>
                    </div>
                    <div>
                        <RegletteConst nd="0"  parentProps = {parentProps} trame={true} handleHeadChange = {this.handleHeadChange}/>
                        <RegletteConst nd="1"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="2"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="3"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="4"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="5"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="6"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="7"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="8"  parentProps = {parentProps} trame={false} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                    </div>
                    <div className="d-flex justify-content-around" style={{marginTop: '5px'}}>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.props.history.push('/')}>Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={this.handle_valideClick}>Valider</button>
                    </div>
                </div>
                <this.Load/>
            </div>
        )
    }
}
export default withRouter(connect()(Peupler))