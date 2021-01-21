import React from 'react'

class Switcher extends React.Component{
    render(){
        const {number, back, next, text, total} = this.props 
        return (
            <div className="input-group" style={{marginBottom:'2px'}}>
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary btn-dark" type="button" id="inputGroupFileAddon03" onClick={back}>{'<-'}</button>
                </div>
                <div className="custom-file Bando-Titre2" style={{display:'block', paddingTop:'6px'}}>
                    {text} <span style={{color:'red'}}>{number}</span>{'/'+total}
                </div>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary btn-dark" type="button" id="inputGroupFileAddon03" onClick={next}>{'->'}</button>
                </div>
            </div>
        )
    }

}
export default Switcher