import React from 'react';

function MapTdpHeader(){
    return(
        <div className="fixed-top">
          <div className='title' style={{display:'flex'}}>
            <div style={{flex:1}}/>
            <div style={{flex:5}}>
              <h2 style={{fontWeight: 'bold'}}>MapTDP</h2>
            </div> 
            <div style={{flex:1}}/> 
          </div>
        </div>
    )
}
export default MapTdpHeader