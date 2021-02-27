import React from 'react';
import RegletteConst from '../repCreator/RegletteConstructor';
import RegletteTrame from '../repCreator/RegletteTrame';

class DisplayLevel extends React.Component{
    reglette(data){
        return data.map(elem=><RegletteConst tdpRegNbrChange={this.props.tdpRegNbrChange} nd={elem.number} key={elem.number}  keyOrigin={`level${elem.number}`} val = {elem}/>)
    }
    render(){
        return <div >
            <RegletteTrame/>
            {this.reglette(this.props.data)}
        </div>
    }
}
export default DisplayLevel