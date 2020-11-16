import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



function Card(props) {
        const [formValue,setFormValue] = useState('')
        const title = props.data.title;
        const type = props.data.type;
        const buttonName = props.data.bName;
        const route = props.data.route;
        const textValue = props.data.textValue;
    

    const Content = () => {
        switch (type) {
            case 'textarea':
                return(
                    
                    <form>
                        <textarea id="msg" type="text" className='cardArea'
                            name="tdp_list" rows="6"  
                            placeholder="Coller votre liste de TDP ici..." 
                            value={formValue}  onChange={e=>textareaHandleChange(e)}>
                        </textarea>
                    </form>
                )
            case 'text':
                return(
                    <div>
                        <div style={{padding:'10px', fontSize:'15px', textAlign:'justify'}}>{textValue}</div>
                    </div>
                )      
            default:
                return null
        }
    }


    const textareaHandleChange=(e)=>{
        setFormValue(e.target.value)
    }

    async function getClipboardContent(){
        try {
            const clipText = await navigator.clipboard.readText()
            
                const result = clipText??'LaMerde'
                props.dispatch({
                    type: "GET_FORM_VALUE",
                    value: result
                })
                      
        } catch (error) {
            console.error('failed to read contents', error);
        }
    }

    const textareaHandleClick=(e)=>{
        getClipboardContent()
    }



  
        return (
            <div className="MyCard">
                <div className="Bando-Titre">
                    <p>{title}</p>
                </div>
                <Content textValue={textValue}/>
                <div className="Bando-Valider">
                    <button className="btn btn-sm btn-outline-dark" type="button"  onClick={()=>{props.history.push(route)}}>{buttonName}</button>                
                </div>
            </div>
        )
}
const mapStateToProps = (state)=>{return {formValue:state.formValue,getFetch:state.getFetch}}
export default withRouter(connect(mapStateToProps)(Card));