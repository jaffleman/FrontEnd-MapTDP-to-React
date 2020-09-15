 const  initialState = {
    ndToShow: null,
    formValue: "",
    getFetch: false
};
export default function  monStore(state = initialState, action){
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            nextState = state.ndToShow !== action.value? {...state, ndToShow : action.value } : {...state, ndToShow : null } 
        return nextState||state

        
        case 'GET_FORM_VALUE':
            nextState = {...state, formValue: action.value, getFetch: true}
        return nextState||state

        default:
            return state
    }
}







