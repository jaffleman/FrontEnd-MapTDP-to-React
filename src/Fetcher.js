import {connect} from 'react-redux';
import React  from 'react';



class Fetcher extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : "",
            error : null
        }
    }


    componentDidMount(){
        console.log("componentDidMount");
        const arg = this.props.lesDonneesCopierColler;
        fetch("http://tdp.jaffleman.tech:8081/datas?arg="+arg)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                data: result.msg,
            });
          },
          // Remarque : il est important de traiter les erreurs ici
          // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
          // des exceptions provenant de réels bugs du composant.
          (error) => {
            this.setState({
             
              error
            });
          }
        )    
    }
    
    render(){
        return null 
    }
}
const mapStateToProps = (state)=>{return {lesDonneesCopierColler:state.lesDonneesCopierColler }}
export default connect(mapStateToProps)(Fetcher);