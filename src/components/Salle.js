import React from 'react'
import Increment from './Increment'
import RcoCreator from './RcoCreator'
import SalleCreator from './SalleCreator'
class Salle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rcoNumber:0,
        }
    }

    CallNext = (nb) =>{
        return <RcoCreator parentKey={this.props.salleNum} number={nb}/>
    }
    render(){
        return (
            <Increment name="RCO" call={this.CallNext}/>
        )
    }
}
export default Salle;