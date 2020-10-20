import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Card extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            texteAreaValue: "",
            redirect: false,
        }
        this.textareaHandleChange = this.textareaHandleChange.bind(this);
        this.title = this.props.data.title;
        this.type = this.props.data.type;
        this.buttonName = this.props.data.bName;
        this.route = this.props.data.route;
        this.textValue = this.props.data.textValue;
    }

    Content = () => {
        switch (this.type) {
            case 'textarea':
                return(
                    <form>
                        <textarea id="msg" type="text" className='cardArea'
                            name="tdp_list" rows="6"  
                            spellCheck="false" placeholder="Coller votre liste de TDP ici..." 
                            value={this.props.formValue} onChange={this.textareaHandleChange}>
                        </textarea>
                    </form>
                )
            case 'text':
                return(
                    <div>
                        <div style={{padding:'10px', fontSize:'15px', textAlign:'justify'}}>{this.textValue}</div>
                    </div>
                )      
            default:
                return null
        }
    }


    setRedirect = () => {
        this.setState({
            ...this.state,
          redirect: true
        })
      }







    textareaHandleChange(e){
        this.props.dispatch({
            type: "GET_FORM_VALUE",
            value: e.target.value
        });
    }




    render(){
        return (
            <div className="MyCard">
            
                <div className="Bando-Titre">
                    <p>{this.title}</p>
                </div>
                <this.Content textValue={this.textValue}/>
                <div className="Bando-Valider">
                    <button className="btn btn-sm btn-outline-dark" type="button"  onClick={()=>{this.props.history.push(this.route)}}>{this.buttonName}</button>                
                </div>
            </div>
        );    
    }
}
const mapStateToProps = (state)=>{return {formValue:state.formValue,getFetch:state.getFetch}}
export default withRouter(connect(mapStateToProps)(Card));