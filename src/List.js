import React from 'react';
import {connect} from 'react-redux'



class List extends React.Component{
      
    _toggleFavorite(elem) {  
        const action = { type: "TOGGLE_FAVORITE", value: elem }
        this.props.dispatch(action)
    }

    showInfo(){ 
       
        return( this.props.ndToShow === this.props.data.nd? <DeteilView data = {this.props.data}/>:null )
    }
    showOption(){
        return(this.props.data.opt !== null? <div className = "optTNI">{this.props.data.opt}</div>:null)
    }
    render(){
        const { nd, reglette, posission } = this.props.data
        return(
            <div className = "Letes" onClick = {()=>{this._toggleFavorite(nd)}}>
                <p className = "tdp">{ reglette }-{ posission }</p>
                {this.showOption()}
                {this.showInfo()}
            </div>
        )
    }
}
let DeteilView = ({data}) => {
    let  {rep,salle,magik,rco,colone,posissionReglette} = data;
    return <div>
        <p className = "mustView">{`COORDONNEES: [${colone}-${posissionReglette}][${magik}]`}</p>
        <p className = "mustView">{`[${rep}]  Salle:[${salle}]  rco:[${rco}]`}</p>
    </div> 
}
const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow}}
export default connect(mapStateToProps)(List);