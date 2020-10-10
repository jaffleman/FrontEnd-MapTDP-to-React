import React from 'react'


function TdpHeader(props) {
    const {data, compos}=props
    return (
            <div>
                { compos.showRep?<h2>REPARTITEUR DE {data.rep}</h2>:null}
                { compos.showSalle?<h4>Salle: {data.salle}</h4>:null } 
                { compos.showRco?<h5>Rco: {data.rco}</h5>:null  }           
            </div>    
    )
}
export default TdpHeader