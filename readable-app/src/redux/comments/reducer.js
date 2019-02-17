import * as Actions from './actions.js';

export const comments = (state = {}, action) =>{
    if(action.type.startsWith('FETCH_COMMENT')){
        switch(action.type){
        case Actions.FETCH_COMMENTS:
            return {};
        case Actions.FETCH_COMMENTS_FAILURE:
            return {};
        case Actions.FETCH_COMMENTS_SUCCESS:
            return { ...action.payload};
        default: return state;
        }
    }
    return state;
};
