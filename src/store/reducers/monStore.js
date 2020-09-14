 const  initialState = {
    ndToShow: null,
    lesDonneesCopierColler: ""
};
export default function  monStore(state = initialState, action){
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            nextState = state.ndToShow !== action.value? { ndToShow : action.value } : { ndToShow : null } 
        return nextState||state

        
        case 'CAPTER_DATA':
            nextState = state.lesDonneesCopierColler !== action.value? { lesDonneesCopierColler : action.value } : { lesDonneesCopierColler : "" } 
        return nextState||state

        default:
            return state
    }
}







