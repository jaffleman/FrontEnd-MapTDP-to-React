import {connect} from 'react-redux';
import React, { useContext, useState, useEffect } from 'react';


const Fetcher = ()=>{
    const [presentation, setPresentation] = useState(null)
    useEffect(()=>{
        const url = `http://tdp.jaffleman.tech:8081/datas?arg=lePutainDeTest`
        fetch(url).then((response)=>{response.json()})
            .then((data)=>setPresentation(data))       
            .catch((error)=>{return alert("Erreur: Le serveur n'a pas répondu... Contactez le dev.")})

    },[]
    )
console.log(presentation);
}
const mapStateToProps = (state)=>{return {fetchData:state.presentation }}
export default connect(mapStateToProps)(Fetcher);