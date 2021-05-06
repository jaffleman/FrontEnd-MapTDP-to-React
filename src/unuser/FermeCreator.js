import React, { createRef } from 'react'
import RegletteConst from '../components/repCreator/RegletteConstructor'
import Switcher from '../components/repCreator/Switcher'

class fermeCreator extends React.Component{
    constructor(props){
        super(props)
        this.refL1 = "hello"
        this.refL2 = createRef()
        this.refL3 = createRef()
        this.refL4 = createRef()
        this.refL4 = createRef()
        this.refL6 = createRef()
        this.refL7 = createRef()
        this.refL8 = createRef()
        this.refTab = [this.refL1, this.refL2, this.refL3, this.refL4, this.refL5, this.refL6, this.refL7, this.refL8]
    }
    HeadChanger = (e) => {
        
    }
    nextFocus = (nd)=>{
        /*if (nd===8) return null
        this.refTab[nd].current.focus()*/
        console.log(nd)
    }
    render(){
        const parentProps = this.props.parentProps
        
        return (
            <div className="">
                <Switcher number={this.props.parentProps.ferme} next={this.props.fermeUp} back={this.props.fermeBack} text='colonne'/>
                    <RegletteConst nd="0" parentProps = {parentProps} trame={true}/>
                    <RegletteConst nd="1" parentProps = {parentProps} trame={false} laRef= {this.refL1} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="2" parentProps = {parentProps} trame={false} laRef= {this.refL2} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="3" parentProps = {parentProps} trame={false} laRef= {this.refL3} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="4" parentProps = {parentProps} trame={false} laRef= {this.refL4} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="5" parentProps = {parentProps} trame={false} laRef= {this.refL5} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="6" parentProps = {parentProps} trame={false} laRef= {this.refL6} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="7" parentProps = {parentProps} trame={false} laRef= {this.refL7} nextFocus={this.nextFocus}/>
                    <RegletteConst nd="8" parentProps = {parentProps} trame={false} laRef= {this.refL8} nextFocus={this.nextFocus}/>
            </div>
        )
    }
}
export default fermeCreator