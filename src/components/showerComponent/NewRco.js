import React from "react"
import ShowTdp from "./ShowTdp"

const NewRco = (props) => {
    const {name, payload} = props
    console.log('nameRco: ', name)
    console.log('rco: ', payload)
    //const tabFerme = []
    //payload.forEach(tdp => tabFerme.findIndex(ferme => ferme === tdp.ferme) === -1? tabFerme.push(tdp.ferme):null)
    const next = () => payload.map((tdp, key) => <ShowTdp key={key} tdp={tdp}/>)
    return (
        <div className='main' >
            <h4 className="tdpHead rco">Rco: {name===undefined?"?":name}</h4>
            {next()}
        </div>
    ) 
}
export default NewRco
