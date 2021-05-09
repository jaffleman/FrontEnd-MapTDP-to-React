import React, {useRef, useState} from 'react';
import Switch from "react-switch";
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Card from './Card';
import LastSearch from './shower/LastSearch'

import { Session } from '../classes/session';
import { SessionDeRecherche } from '../classes/sessionDeRecherche';

import getClipboardContent from '../functions/getClipboard'
import loader from '../functions/loaderManager'
import storageAvailable from '../functions/storageCheck'






const Accueil = (props) => {
  const localStoAccess = storageAvailable('localStorage')

  const checkInitValue = ()=>{
    if (!localStoAccess) return false
    const parseSession = JSON.parse(localStorage.getItem('sessionStockage'))
    if (!parseSession) return false
    if (!('autopast' in parseSession)) return false
    return parseSession.autopast  
  }

  const url = !(localStoAccess && 'credentials' in navigator)
  const textAreaRef = useRef()
  const history = useHistory()
  const [formValue,setFormValue] = useState('')
  const [checked, setChecked] = useState(checkInitValue)

  const textareaHandleChange=(e)=> setFormValue(e.target.value)

  const localStorageCleaner = ()=>{
    if (localStoAccess){
      const parseLS = JSON.parse(localStorage.getItem('sessionStockage'))
      if ('data' in parseLS) localStorage.setItem('sessionStockage',  JSON.stringify({'autopast':parseLS.autopast}))
      history.go(0)
    }
  }

  const handleSwitchChange = (e)=>{
    setChecked(e)  
    if (localStoAccess) {
      const parseSession = JSON.parse(localStorage.getItem('sessionStockage'))
      localStorage.setItem('sessionStockage', JSON.stringify({...parseSession, 'autopast':e}))
      if (!e) setFormValue('')
    }
  }

  const handle_click = ()=>{
    if (checked){
      getClipboardContent(callback)
      function callback(clipContent){
        if (clipContent.length>0){ 
          textAreaRef.current.value=clipContent
          setFormValue(clipContent)
        }
      }
    }
  }

  const textareaHandleClick = () =>{
    loader(true, props)
    const noTdp = ()=>{
      setFormValue('')
      alert('Aucun TDP trouvé...')
      loader(false, props)
    }
    const maRecherche = new SessionDeRecherche(formValue)
    if (maRecherche.valide) {
      throwSession(maRecherche.donneesExtraites)
    }else noTdp()   
  }

  const throwSession = (data)=>{
    new Session([...data], (session)=>history.push('/Shower', session), ()=>{loader(false, props)} )
  }



  return (
    <Container>
      <div className='main'>
        <div className='row'>
          <div className='col-lg' style={{marginTop:'20px'}}>
          <div className="MyCard">
            <div className="Bando-Titre">
              <p>TDP Search</p>
            </div>
            <form>
              <textarea 
                ref= {textAreaRef}
                id="msg" 
                type="text" 
                className='cardArea'
                name="tdp_list" rows="6"  
                placeholder="Coller votre liste de TDP ici ou taper la position recherchée: ex: cho94 linx19127..." 
                value={formValue} onClick={()=>handle_click()}  onChange={e=>textareaHandleChange(e)}>
              </textarea>
            </form>
            <div className="Bando-Valider">
              <Container>
                <Row>
                  <Col className='align-items-center'>
                    <div style={{marginTop:'10px'}}>
                      <Switch  onChange={e=>handleSwitchChange(e)} checked={checked} disabled={url}/>
                    </div>
                  </Col>
                  <Col xs={6}><button className="btn btn-sm btn-outline-dark" type="button" onClick={()=>textareaHandleClick()}>Lancer la recherche</button></Col>
                  <Col></Col>
                </Row>
              </Container>                            
            </div>
          </div>
        </div>  


        <div className='col-lg' style={{marginTop:'20px'}}>
          <div className="MyCard">
            <div className="Bando-Titre">
              <p>dernières recherches</p>
            </div>
            <LastSearch callback={throwSession}/> 
            <div className="Bando-Valider">
              <button className="btn btn-sm btn-outline-dark" type="button" onClick={()=>localStorageCleaner()}>Effacer l'historique</button>                
            </div>
          </div>
        </div>
          


          <div className='col-lg' style={{marginTop:'20px'}}>
            <Card data={{
              title:'Création de répartiteur:',
              type:'text',
              textValue:'Le mode "création de rep" te permets d\'intégrer ton répartiteur. Une fois créé, il sera accessible par tout les utilisateurs de MapTDP. Il est important de prendre le temps d\'intégrer les répartiteurs afin de peupler la base de MapTDP et aissi faciliter la recherche des futurs TDP. Si tu souhaites intégrer un répartiteur cliques sur "GO=>"',
              bName:'Go=>',
              route:'/Displayer'}}/> 
          </div>
        </div>
      </div>
    </Container>
  )

}   
const mapStateToProps = (state)=>{return {mustLoad:state.mustLoad}}
export default connect(mapStateToProps)(Accueil);