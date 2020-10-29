import React from 'react';
import {connect} from 'react-redux'
import Tdp from './Tdp'
import TdpErr from './TdpErr'
import Modal from './Modal'


class Lister extends React.Component{
 
        const {data,err,showModalFunction, visibility} = props;
        let preRep, preSalle, PreRco;
        if (err){ 
            function test(){
                console.log('ok');
            }

            
            data.map(function (item, key) {
                const mKey= 'Modal'+key
                const divKey= 'div'+key
                return <div key={divKey}> 
                    <TdpErr onClick={()=>{test()}} data={item} key={key}/>
                    <Modal visible={visibility} key={mKey}/>
                </div>
            })

            return <div>
                <h3>REGLETTE(S) NON TROUVEE(S)</h3>
                {compoRender}
            </div>
            
        }else{
            const compoRender = data.map(function (item, key) {
                let withRep, withSalle, withRco;

                if (item.rep !== preRep){
                    preRep = item.rep;
                    preSalle = item.salle;
                    PreRco = item.rco;
                    withRep = true
                    withSalle = true
                    withRco = true
                }else{   
                    if (item.salle !== preSalle){
                        preRep = item.rep;
                        preSalle = item.salle;
                        PreRco = item.rco;
                        withRep = false
                        withSalle = true
                        withRco = true
                    }else{
                        if (item.rco !== PreRco){
                            preRep = item.rep;
                            preSalle = item.salle;
                            PreRco = item.rco;
                            withRep = false
                            withSalle = false
                            withRco = true
                        }else{
                            withRep = false
                            withSalle = false                        
                            withRco = false
                        }                    
                    } 
                }


                
                
                const withHeader = {
                    showRep: withRep,
                    showSalle: withSalle,
                    showRco: withRco
                }
                return <Tdp data={item} key={key} nd={key++} headCompos={withHeader}/>
            })

            return compoRender
        }
    }

  
    render(){

    }    
}

const mapStateToProps = (state)=>{return {fetchedResultData:state.fetchedResultData}}
export default connect(mapStateToProps)(Lister);
