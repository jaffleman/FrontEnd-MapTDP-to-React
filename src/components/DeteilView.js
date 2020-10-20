import React from 'react';
import {connect} from 'react-redux'

class DeteilView extends React.Component{

    render(){
        let  {rep,salle,magik,rco,colone,posissionReglette, nd} = this.props.data;
        if (this.props.ndToShow === nd) {
            return <div>
                <p style={{margin:0}}>{"COORDONNEES: ["}<span style={{fontWeight: 'bold'}}>{`${colone}`}</span>{"-"}<span style={{fontWeight: 'bold'}}>{`${posissionReglette}`}</span>{"]["}<span style={{fontWeight: 'bold'}}>{`${magik}`}</span>{"]"}</p>
                <p style={{margin:0}}>{"["}<span style={{fontWeight: 'bold'}}>{`${rep}`}</span>{"]  Salle:["}<span style={{fontWeight: 'bold'}}>{`${salle}`}</span>{"]  rco:["}<span style={{fontWeight: 'bold'}}>{`${rco}`}</span>{"]"}</p>
            </div>         
        }else return null        
    }


}
const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow}}
export default connect(mapStateToProps)(DeteilView);