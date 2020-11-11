import React from 'react'
import RegletteConst from './RegletteConstructor'
import Switcher from './Switcher'

class fermeCreator extends React.Component{
    HeadChanger = (e) => {
        
    }
    render(){
        const parentProps = this.props.parentProps
        return (
            <div className="">
                <Switcher number={this.props.parentProps.ferme} next={this.props.fermeUp} back={this.props.fermeBack} text='colonne'/>
                    <RegletteConst nd="0" parentProps = {parentProps} trame={true}/>
                    <RegletteConst nd="1" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="2" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="3" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="4" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="5" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="6" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="7" parentProps = {parentProps} trame={false}/>
                    <RegletteConst nd="8" parentProps = {parentProps} trame={false}/>
            </div>
        )
    }
}
export default fermeCreator