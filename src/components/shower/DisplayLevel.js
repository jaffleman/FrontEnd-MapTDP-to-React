import React from 'react';
import RegletteConst from '../repCreator/RegletteConstructor';
import RegletteTrame from '../repCreator/RegletteTrame';

class DisplayLevel extends React.Component{
    reglette(data){
        function fullfil(data){
            const newTab = []
            for (let index = 1; index < 9; index++) {
                const match = data.find(elem=>elem.number===index)
                newTab.push(match===undefined?{'number':index, 'tdps':[{
                    cd: 94,
                    ferme: null,
                    level: null,
                    option: "null",
                    rco: null,
                    regletteNbr: "...",
                    regletteType: "x",
                    rep: "",
                    salle: null,
                    _id: "0000",
                }]}:match)
            }
            return newTab
        }
        if (data.length===8) {
            return data.map(elem=><RegletteConst tdpRegNbrChange={this.props.tdpRegNbrChange} nd={elem.number} key={elem.number}  keyOrigin={`level${elem.number}`} val = {elem}/>)
        }
        else {
            return fullfil(data).map(elem=><RegletteConst nd={elem.number} key={elem.number}  keyOrigin={`level${elem.number}`} val = {elem}/>)
        }
    }
    render(){
        return <div >
            <RegletteTrame/>
            {this.reglette(this.props.data)}
        </div>
    }
    
}
export default DisplayLevel