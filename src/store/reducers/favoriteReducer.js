const initialState={favoritesFilms: null}

function toggleFavorite(state=initialState, action){
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            nextState = state.favoritesFilms !== action.value? { favoritesFilms : action.value } : { favoritesFilms : null } 
        return nextState||state
        default:
            return state
    }
}
export default toggleFavorite