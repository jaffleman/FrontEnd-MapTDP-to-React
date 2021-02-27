import React from 'react'
import Increment from './Increment'
import RcoCreator from './RcoCreator'
class CreatSalle extends React.Component{
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
            <Increment name="rco" call={this.CallNext}/>
        )
    }
}
export default CreatSalle;