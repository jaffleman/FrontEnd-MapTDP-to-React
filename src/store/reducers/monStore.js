const  initialState = {
    ndToShow: null,
    formValue: null,
    getFetch: false,
    fetchedResultData:[],
    alreadyShow:[],
    tdpErr:{
        showModal: false,
        data:[]
    },
    createReglette:false,

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

        case 'SHOW_MODAL':
            nextState = {...state, tdpErr:{showModal:action.value, data:action.data}}
        return nextState||state

        case 'CLOSE_MODAL':
            nextState = {...state, tdpErr:{showModal:action.value, data:[]}}
        return nextState||state

        case 'SEND_REGLETTE_VALUE':
            nextState = {...state, createReglette:false}
        return nextState||state

        case 'GET_FETCH_VALUE':
            nextState = {...state, fetchedResultData: action.value, getFetch:false}
        return nextState||state

        case 'CREATE_REGLETTE':
            const {salle, rco, colone, posissionReglette, opt,} = action.value;

            nextState = {...state, tdpErr:{...state.tdpErr, getFetch:false, showModal:false, data:{...state.tdpErr.data,salle,rco,colone,posissionReglette,opt, }}, createReglette:true}
        return nextState||state

        case 'CLOSE_REGLETTE':
            nextState = {...state,tdpErr:{...state.tdpErr, data:[]}, getFetch:true, createReglette:false}
            return nextState||state

        case 'STORE_TDP_STATE':
            nextState = {...state, TdpPreviousState: action.value }
        return nextState||state

        case 'RESET_APP':
            nextState = initialState
        return nextState||state

        default:
            return state
    }
}







