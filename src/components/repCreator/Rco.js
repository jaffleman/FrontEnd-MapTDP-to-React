import React from 'react'
import {connect} from 'react-redux'

class Rco extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fermeNumber:1,
        }
    }

    nbFerme_handleChange = (e) => {
        const localstructure = this.props.repStructure.tab
        const rcoRang = this.props.number
        const expectedFermeNumberConvert = parseInt(e.target.value);
        if (expectedFermeNumberConvert<99 && expectedFermeNumberConvert>0) {
            if  (expectedFermeNumberConvert!==localstructure[this.props.parentKey][rcoRang].length){
                if (expectedFermeNumberConvert>localstructure[this.props.parentKey][rcoRang].length) {
                    const difference = expectedFermeNumberConvert - this.state.fermeNumber
                    //while (tab.length!==localstructure[this.props.parentKey].length) {
                        for (let index = 0; index < difference; index++) {
                            localstructure[this.props.parentKey][rcoRang].push([["x"],["x"],["x"],["x"],["x"],["x"],["x"],["x"]])  
                        }
                    //}
                }else{
                    //while (tab.length!==localstructure[this.props.parentKey].length) {
                        const difference =  this.state.fermeNumber - expectedFermeNumberConvert
                        for (let index = 0; index < difference; index++) {
                            localstructure[this.props.parentKey][rcoRang].pop()
                        }
                    //}
                }
                const action = {type: "SET_REP_STRUCTURE",value: localstructure};
                this.props.dispatch(action)
            }

            this.setState({
                fermeNumber:expectedFermeNumberConvert
            })
        }else{
            
        }
    }
    render(){
        return (

                    <div className="input-group d-flex  ">
                        <div className="input-group-prepend">
                            <div className="input-group-text" id="btnGroupAddon">{'rco: '+(this.props.number+1)}: Nombre de colonne :</div>
                        </div>
                            <input type="number" className="form-control" style={{}} defaultValue={this.fermeNumber} onChange={this.nbFerme_handleChange} aria-describedby="btnGroupAddon"/>
                    </div>                        
        )    
    }
}
const mapStateToProps = (state)=>{return {
    repStructure: state.repStructure}
}
export default connect(mapStateToProps)(Rco);