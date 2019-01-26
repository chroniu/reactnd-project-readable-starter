import * as Actions from './actions.js';


export const categories = (state ={}, action) =>{
    switch(action.type){
    case action.type === Actions.FETCH_CATEGORIES:
        return state;
    case action.type === Actions.FETCH_CATEGORIES_FAILURE:
        return state;
    case action.type === Actions.FETCH_CATEGORIES_SUCCESS:
        return action.payload;
    default:
        return state;
    }
};
