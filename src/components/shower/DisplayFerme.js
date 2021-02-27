import React from 'react';
import {connect} from 'react-redux';
import Switcher from '../repCreator/Switcher';
import { withRouter } from 'react-router-dom';
import DisplayLevel from './DisplayLevel';

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
    /*levelConstructor(ferme){
        const levels = [1,2,3,4,5,6,7,8]
        return levels.map(level=>{
            if (level===ferme)
        })
    }*/
    render(){
        const fermes = this.props.data.ferme
        const inc = this.state.increment
        return (
            
            <>
                
                    <div>
                        <Switcher number={fermes[inc].number} total={fermes[fermes.length-1].number} next={this.fermeUp} back={this.fermeBack} text='ferme'/>
                    </div>
                    <div>
                        <DisplayLevel key={fermes[inc].level} data={fermes[inc].level}/>
                    </div>
                    <div className="d-flex justify-content-around" style={{marginTop: '5px'}}>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.props.history.push('/')}>Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={this.handle_valideClick}>Valider</button>
                    </div>
                
            </>
        )
    }
}
export default withRouter(connect()(DisplayFerme))