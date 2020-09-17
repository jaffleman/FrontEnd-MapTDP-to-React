import React from 'react'


function TdpHeader(props) {
const {rep, compos}=props
return compos.showRep?<h3>REPARTITEUR DE {rep}</h3>:null
    
}
export default TdpHeader