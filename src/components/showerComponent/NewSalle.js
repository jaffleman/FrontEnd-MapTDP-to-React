import React from "react"
import NewRco from './NewRco'
const NewSalle = (props) => {
    const {name, payload} = props
    const tabRco = []
    payload.forEach(tdp => tabRco.findIndex(rco => rco === tdp.rco) === -1? tabRco.push(tdp.rco):null)
    const next = () => tabRco.map((rco, key) => <NewRco key={key} name={rco} payload={payload.map((tdp)=>tdp.rco===rco?tdp:null)}/>)
    return <div className='main' style={{color:'yellow'}}>
            <h4 className="tdpHead salle">Salle: {name===undefined?"?":name}</h4>
            {next()}
        </div>
}
export default NewSalle