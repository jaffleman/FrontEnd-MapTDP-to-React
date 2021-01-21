import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import VerifRepName from './VerifRepName';
import {Rep} from '../../classes/rep';
import DisplaySalle from './DisplaySalle';


const extraSession = (sessionData)=>{
        const tab = []
        const reverseData = sessionData
        reverseData.forEach(tdp => tab.findIndex(elem => elem === tdp.rep) === -1? tab.push(tdp.rep):null)
        const obj = tab.map(elem => new Rep(elem, reverseData))
        return obj
}

class Displayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            repName :''
        }
    }

    handleBodyChange(e){
    }
    handleHeadChange(e){
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
            const mySession = extraSession(data)
            if (mySession.length===0) alert('Nom du Rep introuvable...')
            else  this.props.dispatch({
                type:'SET_SESSION_DATA',
                value: mySession[0]
            })
        }
        VerifRepName(this.state.repName, callback)
    }
    SalleDisplayer({data}){
        if (data.length>0) {
            const mySession = extraSession(data)
            if (mySession.length===0){
                alert('Nom du Rep introuvable...')
                return null
            }
            else  return <DisplaySalle data={mySession[0]}/>
        }else return null
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
                        Repartiteur de <span style={{color:'red', textTransform:'lowerCase'}}>{'this.state.session.name'}</span>
                    </div>
                    <this.SalleDisplayer data={this.props.brut}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{return { brut: state.repCreatorData.brut}}
export default withRouter(connect(mapStateToProps)(Displayer))