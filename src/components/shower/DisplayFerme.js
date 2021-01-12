import React from 'react';
import {connect} from 'react-redux';
import Switcher from '../repCreator/Switcher';
import RegletteConst from '../repCreator/RegletteConstructor';
import { withRouter } from 'react-router-dom';

class DisplayFerme extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            increment : 0,
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
    handleHeadChange = (e) => {
    }

    handleBodyChange = (e) => {
    }

    fermeUp = () => {
        let inc = this.state.increment
        if (this.props.data.ferme[inc].number <this.props.data.ferme[this.props.data.ferme.length-1].number) {
            this.setState({
                increment : inc+1
            })
        }
    }
    fermeBack = () => {
        let inc = this.state.increment
        if (this.props.data.ferme[inc].number > this.props.data.ferme[0].number) {
            this.setState({
                increment : inc-1
            })
       }
    }

    componentDidMount(){
        
    }
    componentWillUnmount(){
    }

    render(){
        const fermes = this.props.data.ferme
        const inc = this.state.increment
        return (
            
            <div>
                <div>
                    <div>
                        <Switcher number={fermes[inc].number} total={fermes[fermes.length-1].number} next={this.fermeUp} back={this.fermeBack} text='ferme'/>
                    </div>
                    <div>
                        <RegletteConst nd="0" handleHeadChange = {this.handleHeadChange}/>
                        <RegletteConst nd="1"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[0]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="2"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[1]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="3"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[2]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="4"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[3]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="5"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[4]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="6"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[5]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="7"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[6]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                        <RegletteConst nd="8"  keyOrigin={`${this.props.salleNumb}${this.props.rcoNumb}${fermes[inc].number}`} val = {fermes[inc].level[7]} handleHeadChange = {this.handleHeadChange} handleBodyChange={this.handleBodyChange}/>
                    </div>
                    <div className="d-flex justify-content-around" style={{marginTop: '5px'}}>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.props.history.push('/')}>Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={this.handle_valideClick}>Valider</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(connect()(DisplayFerme))