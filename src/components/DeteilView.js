import React from 'react';
import {connect} from 'react-redux'

class DeteilView extends React.Component{

    render(){
        let  {rep,salle,magik,rco,colone,posissionReglette, nd} = this.props.data;
        if (this.props.ndToShow === nd) {
            return <div>
                <p className = "mustView">{`COORDONNEES: [${colone}-${posissionReglette}][${magik}]`}</p>
                <p className = "mustView">{`[${rep}]  Salle:[${salle}]  rco:[${rco}]`}</p>
            </div>         
        }else return null        
    }


}
const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow}}
export default connect(mapStateToProps)(DeteilView);