 const  initialState = {
    ndToShow: null,
    formValue: null,
    getFetch: false,
    fetchedResultData:[],
    alreadyShow:[]
    
};
export default function  monStore(state = initialState, action){
    let nextState;
    switch (action.type) {

        case 'TOGGLE_FAVORITE':{
           const check = state.alreadyShow.indexOf(action.value)===-1?true:false
            nextState = state.ndToShow !== action.value? {...state, ndToShow : action.value, alreadyShow : check?[...state.alreadyShow, action.value]:[...state.alreadyShow]} : {...state, ndToShow : null } 
                    
        }
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







