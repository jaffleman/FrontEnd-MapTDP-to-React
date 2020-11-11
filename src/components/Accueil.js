import React from 'react';
import Card from './Card';


const Accueil = () => {
  return (
    <div className='main'>
      <div className='row'>
        <div className='col-lg' style={{marginTop:'20px'}}>
          <Card data={{
            title:'Recherche de TDP:',
            type:'textarea',
            bName:'Rechercher',
            route:'/recherche'}}/> 
        </div>       
        <div className='col-lg' style={{marginTop:'20px'}}>
          <Card data={{
            title:'Création de répartiteur:',
            type:'text',
            textValue:'Le mode "création de rep" te permets d\'intégrer ton répartiteur. Une fois créé, il sera accessible par tout les utilisateurs de MapTDP. Il est important de prendre le temps d\'intégrer les répartiteurs afin de peupler la base de MapTDP et aissi faciliter la recherche des futues TDP. Si tu souhaites intégrer un répartiteur cliques sur "GO=>"',
            bName:'Go=>',
            route:'/CreatRep'}}/> 
        </div>
        <div className='col-lg' style={{marginTop:'20px'}}>
          <Card data={{
            title:'Peupler un repartiteur:',
            type:'text',
            textValue:'Si tu souhaites completer les rco pour un rep precis, cliques sur "GO=>"',
            bName:'Go=>',
            route:'/Peupler'}}/> 
        </div>
      </div>
    </div>
  ) 
}   

export default (Accueil);