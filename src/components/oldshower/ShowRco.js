import React from 'react';
import ShowFerme from './ShowFerme'

class ShowRco extends React.Component{
    render(){
        const rco = this.props.rco
        const lister = (props)=> props.map((ferme, key)=><ShowFerme key={key} ferme = {ferme}/>)
        
        return (
            <div className='main' style={{color:'lightgreen'}}>
                <h5 className="tdpHead rco">Rco: {rco.number===undefined?"?":rco.number}</h5>
                {lister(rco.ferme)}
            </div>
        )       
    }
}
export default ShowRco;