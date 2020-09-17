import React  from 'react';
//import TdpFlatList from './TdpFlatList';
import { connect } from 'react-redux';


class Fetcher extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {}
        };
      }
      _toggleForm(){
          const action = {
            type: "TOGGLE_FORM",
            value : false
          }
          this.props.dispatch(action)
      }
    
      componentDidMount() {
        fetch("http://tdp.jaffleman.tech:8081/datas?arg="+this.props.arg)
          .then(res => res.json())
          .then(
            (result) => {
                const action = {
                    type: "GET_FETCH_VALUE",
                    value: result
                }
              this.props.dispatch(action);
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
          this._toggleForm();
      }
    
      render() {

            /*if (status === 300) {*/
              return null
            /*}else{
                return <div id = "tdp"><h3>{msg}</h3></div>
            }
          
             switch (items.status) {
                  case "300": return <TdpFlatList data={items.value}/>
                  case "200": return <div>{items.msg}</div>
                  case "100": return <div>{items.msg}</div>
                  default:
                      break;
              }*/
      
       
    }     
      
}

export default connect()(Fetcher);