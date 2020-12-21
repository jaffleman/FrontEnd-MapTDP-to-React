import React from 'react';
import ShowLevel from './ShowLevel'

class ShowFerme extends React.Component{
    render(){
        const ferme = this.props.ferme
        const lister = (props)=>{
            if (props.length) return props.map((level, key)=><ShowLevel key={key} level = {level}/>)
        }
        return (
            <div className='main' style={{color:'blue'}}>
                {lister(ferme.level)}
            </div>
        )       
    }
}
export default ShowFerme;