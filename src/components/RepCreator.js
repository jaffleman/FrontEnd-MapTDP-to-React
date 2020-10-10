import React from 'react';

const RepCreator = () =>{
    const myStyle = {
        marginTop:'10px', 
        fontWeight:'bold', 
        textTransform:'uppercase'
    }
    return(
        <div className="dark">
            <div className="bandoRechercheTdp"><p style={myStyle}>Création de répartiteurs</p></div>
            <div>
                <div style={{padding:'10px', fontSize:'15px', textAlign:'justify'}}>Le mode "création de rep" te permets d'intégrer ton répartiteur. Une fois créé, il sera accessible par tout les utilisateurs de MapTDP. Il est important de prendre le temps d'intégrer les répartiteurs afin de peupler la base de MapTDP et aissi faciliter la recherche des futues TDP. Si tu souhaites intégrer un répartiteur cliques sur "GO" </div>
                <input type="button" id="ButtonStyle" value='Go =>' onClick={()=>{alert('En cours de développement. La fonctionalité sera bientôt disponible!')}}/>                  
            </div>
        </div>
    )
}
export default RepCreator;
