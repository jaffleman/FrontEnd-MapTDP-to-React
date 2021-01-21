const initialState={
    brut:[{_id:null}],
    session : {name : undefined}
}

export default function  repCreatorStore(state = initialState, action){
    let nextState;
    switch (action.type) {
        case 'SET_BRUT_DATA':
            nextState = {...state, brut:[...action.value]}
        return nextState||state

        case 'SET_SESSION_DATA':
            nextState = {...state, session:{...action.value}}
        return nextState||state
        
        default:
            return state
    }
}