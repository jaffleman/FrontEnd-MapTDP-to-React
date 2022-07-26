import React from 'react'


function TdpHeader(props) {
    const {data, compos}=props
    return (
            <div>
                { compos.showRep?<h3 className="tdpHead rep">REPARTITEUR DE {data.rep}</h3>:null}
                { compos.showSalle?<h4 className="tdpHead salle">Salle: {data.salle}</h4>:null } 
                { compos.showRco?<h5 className="tdpHead rco">Rco: {data.rco}</h5>:null  }           
            </div>    
    )
}
export default TdpHeader