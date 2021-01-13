import React from 'react';
import RegletteConst from '../repCreator/RegletteConstructor';
import RegletteTrame from '../repCreator/RegletteTrame';

class DisplayLevel extends React.Component{
    reglette(data){
        
        let i=0
        const roulette=data.map(elem=><RegletteConst nd={elem.number} key={elem.number}  keyOrigin={`level${i}`} val = {elem}/>)
        console.log(roulette)
        return roulette
    }
    render(){
        console.log(this.props.data)
        return <div>
            <RegletteTrame/>
            {this.reglette(this.props.data)}
        </div>
    }
    
}
export default DisplayLevel