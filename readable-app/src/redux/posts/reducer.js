import * as Actions from './actions.js';


export const posts = (state = {}, action) =>{
    switch(action.type){
    case action.type === Actions.FETCH_POSTS:
        return state;
    case action.type === Actions.FETCH_POSTS_FAILURE:
        return {};
    case action.type === Actions.FETCH_POSTS_SUCCESS:
        return action.payload;
    default:
        return state;
    }
}


