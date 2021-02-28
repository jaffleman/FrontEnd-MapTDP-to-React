import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import VerifRepName from './VerifRepName';
import DisplaySalle from './DisplaySalle';
import { Container } from 'react-bootstrap';
import ExtraSession from '../../classes/extraSession'

class Displayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            repName :'',
            theSession: undefined
        }
    }

    handleRepChange = (e)=> {
        this.setState({
            repName:e.target.value.toLowerCase(),
        })
    }
    handleClick = ()=>{
        const callback = (data)=>{
            this.props.dispatch({
                type:'SET_BRUT_DATA',
                value: data
            })
            const mySession = new ExtraSession(data)
            console.log(mySession)
            if (mySession.length===0) alert('Nom du Rep introuvable...')
            else  this.setState({ theSession : mySession}, ()=>{
                this.props.dispatch({
                    type:'SET_SESSION_DATA',
                    value: mySession
                })
            })
        }
        VerifRepName(this.state.repName, callback)
    }
    SalleDisplayer({data}){
        if (data) return <DisplaySalle data={data.rep[0]}/> 
        else return null
    }

    render(){
        return (
            <Container>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={this.handleRepChange} placeholder="Rep à créer/modifier ex:cho94" aria-label="ex:cho94" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.handleClick}>OK</button>
                    </div>
                </div>
                <this.SalleDisplayer data={this.props.mySession}/>
            </Container>
        )
    }
}
const mapStateToProps = (state)=>{return {
    mySession: state.session
}}
export default withRouter(connect(mapStateToProps)(Displayer))