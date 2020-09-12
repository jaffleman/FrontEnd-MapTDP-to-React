import React from 'react';

class TdpFlatList extends React.Component{
    constructor(){
        super();
        this.state = {
            data : [  
                {"nd":1,"rep":"vit94","reglette":"L/INX05","posission":"101","salle":1,"magik":[13,6],"rco":1,"colone":2,"posissionReglette":4,"opt":null},
                {"nd":2,"rep":"vit94","reglette":"L/INX06","posission":"082","salle":1,"magik":[11,3],"rco":1,"colone":2,"posissionReglette":5,"opt":null},
                {"nd":3,"rep":"vit94","reglette":"L/INX15","posission":"008","salle":1,"magik":[2,1],"rco":1,"colone":2,"posissionReglette":8,"opt":null},
                {"nd":4,"rep":"vit94","reglette":"L/INX15","posission":"015","salle":1,"magik":[2,8],"rco":1,"colone":2,"posissionReglette":8,"opt":null},
                {"nd":5,"rep":"vit94","reglette":"L/INX15","posission":"024","salle":1,"magik":[4,1],"rco":1,"colone":2,"posissionReglette":8,"opt":null},
                {"nd":6,"rep":"vit94","reglette":"L/INX16","posission":"003","salle":1,"magik":[1,4],"rco":1,"colone":4,"posissionReglette":1,"opt":null},
                {"nd":7,"rep":"vit94","reglette":"L/INX21","posission":"068","salle":1,"magik":[9,5],"rco":1,"colone":4,"posissionReglette":2,"opt":null}
            ],
            
        }
    }
    render(){
        return (
            <div id = "tdp">
                <h3>REPARTITEUR DE vit94</h3>
                <h4>Salle: 1</h4>
                <h5>rco: 1</h5>
                { this.state.data.map((item)=> <List data = {item} key = {item.nd}/>) }
            </div>            
        );
    }    
}
class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mustView: false,
        }
    }
    handleClick(e){ 
        this.setState(this.state.mustView?{ mustView : false }:{ mustView : true })
    }
    render(){
        return(
            <div className = "Letes" onClick = {this.handleClick.bind(this)}>
                <p className = "tdp">{ this.props.data.reglette }-{ this.props.data.posission }</p>
                <DeteilView data = {this.props.data} mustView = {this.state.mustView}/>
            </div>
        )
    }
}
let DeteilView = ({data,mustView}) => {
    return( mustView ? <p className = "mustView">{data.posission}</p>:null )
}
export default TdpFlatList;
