import React, {useRef, useState} from 'react';
import Card from './Card';
import { useHistory } from 'react-router-dom';
import { filter } from '../functions/filter';
import { transforme } from '../functions/transforme';
import { reduce } from '../functions/reduce';
import { Session } from '../classes/session';
import {connect} from 'react-redux';
import { Container } from 'react-bootstrap';
import getClipboardContent from '../functions/getClipboard'


const Accueil = (props) => {
  const textAreaRef = useRef()
  const history = useHistory()
  const [formValue,setFormValue] = useState('')
  const textareaHandleChange=(e)=>{
    setFormValue(e.target.value)
  }
  const handle_click = ()=>{
    getClipboardContent(callback)
    function callback(clipContent){
      if (clipContent.length>0){ 
        textAreaRef.current.value=clipContent
        setFormValue(clipContent)
      }
    }
  }
  const textareaHandleClick = () =>{
    props.dispatch({
      type: "UPDATE_LOADER",
      value: true
    })
    const noTdp = ()=>{
      setFormValue('')
      alert('Aucun TDP trouvé...')
      props.dispatch({
        type: "UPDATE_LOADER",
        value: false
      })
    }

    const plotTab = reduce(transforme(filter(formValue)))
    plotTab.length? new Session(plotTab, (session)=>history.push('/Shower', session)): noTdp()
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
                      <button className="btn btn-sm btn-outline-dark" type="button" onClick={()=>textareaHandleClick()}>Lancer la recherche</button>                
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