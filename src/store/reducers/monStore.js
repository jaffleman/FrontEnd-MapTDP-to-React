 const  initialState = {
    ndToShow: null,
    formValue: null,
    getFetch: false,
    fetchedResultData:[],
    regex:[]
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


        case 'GET_FETCH_VALUE':
            nextState = {...state, fetchedResultData: action.value}
        return nextState||state


        case 'STORE_TDP_STATE':
            nextState = {...state, TdpPreviousState: action.value }
        return nextState||state

        
        default:
            return state
    }
}







