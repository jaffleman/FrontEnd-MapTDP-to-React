import React from 'react';
import ShowSalle from './ShowSalle'

class ShowRep extends React.Component{
    render(){
        const rep = this.props.rep
        const lister = (props)=>props.map((salle, key)=><ShowSalle key={key} salle = {salle}/>)
        
        return (
            <div className='main' style={{color:'white'}}>
                <h3 className="tdpHead rep">REPARTITEUR DE {rep.name}</h3>
                {lister(rep.salle)}
            </div>
        )       
    }
}
export default ShowRep;