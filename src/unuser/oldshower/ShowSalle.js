import React from 'react';
import ShowRco from './ShowRco'

class ShowSalle extends React.Component{
    render(){
        const salle = this.props.salle
        const lister = (props)=> props.map((rco, key)=><ShowRco key={key} rco = {rco}/>)
        
        return (
            <div className='main' style={{color:'yellow'}}>
                <h4 className="tdpHead salle">Salle: {salle.number===undefined?"?":salle.number}</h4>
                {lister(salle.rco)}
            </div>
        )       
    }
}
export default ShowSalle;