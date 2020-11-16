import React from 'react';

const Loader = () => {
    return(
        <div class="d-flex align-items-center" id='loader'>
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
    )
}
export default Loader