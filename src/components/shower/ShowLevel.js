import React from 'react';
import ShowTdp from './ShowTdp'

class ShowLevel extends React.Component{
    render(){
        const level = this.props.level
        const lister = (props)=> props.map((tdp, key)=><ShowTdp key={key} tdp = {tdp}/>)
        
        return (
            <div className='main' style={{color:'red'}}>
                {lister(level.tdp)}
            </div>
        )       
    }
}
export default ShowLevel;