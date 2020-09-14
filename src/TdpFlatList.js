import React from 'react';
import {connect} from 'react-redux'
import List from './List'

class TdpFlatList extends React.Component{
    constructor(){
        super();
        this.state = {
            data : [  
                {"nd":1,"rep":"vit94","reglette":"L/INX05","posission":"101","salle":1,"magik":[13,6],"rco":1,"colone":2,"posissionReglette":4,"opt":null},
                {"nd":2,"rep":"vit94","reglette":"L/INX06","posission":"082","salle":1,"magik":[11,3],"rco":1,"colone":2,"posissionReglette":5,"opt":null},
                {"nd":3,"rep":"vit94","reglette":"L/INX15","posission":"008","salle":1,"magik":[2,1],"rco":1,"colone":2,"posissionReglette":8,"opt":"INVERSEE"},
                {"nd":4,"rep":"vit94","reglette":"L/INX15","posission":"015","salle":1,"magik":[2,8],"rco":1,"colone":2,"posissionReglette":8,"opt":null},
                {"nd":5,"rep":"vit94","reglette":"L/INX15","posission":"024","salle":1,"magik":[4,1],"rco":1,"colone":2,"posissionReglette":8,"opt":null},
                {"nd":6,"rep":"vit94","reglette":"L/INX16","posission":"003","salle":1,"magik":[1,4],"rco":1,"colone":4,"posissionReglette":1,"opt":null},
                {"nd":7,"rep":"vit94","reglette":"L/INX21","posission":"068","salle":1,"magik":[9,5],"rco":1,"colone":4,"posissionReglette":2,"opt":null}
            ],

        }
    }

    showheader(){
        return <div>
                <h3>{`REPARTITEUR DE ${this.state.data.rep}`}</h3>
                <h4>{`Salle: ${this.state.data.salle}`}</h4>
                <h5>{`rco: ${this.state.rco}`}</h5>            
        </div>
    }
    componentDidMount(){
      
    }
    render(){
        return (
            <div id = "tdp">
                {this.showheader()}
                { this.state.data.map((item)=> <List data = {item} key = {item.nd}/>) }
            </div>            
        );
    }    
}

const mapStateToProps = (state)=>{return {favoritesFilms:state.favoritesFilms}}
export default connect(mapStateToProps)(TdpFlatList);
