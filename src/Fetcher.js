import React  from 'react';
import TdpFlatList from './TdpFlatList';
import { connect } from 'react-redux';


class Fetcher extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
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
              this.setState({
                isLoaded: true,
                items: result.value
              });
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
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          return (
            <TdpFlatList data={items}/>
          );
        }
      }
}

export default connect()(Fetcher);