import * as Actions from './actions.js';

export const posts = (state = {}, action) =>{
    if(action.type.startsWith('FETCH_POST')){
        switch(action.type){
        case Actions.FETCH_POSTS:
            return {};
        case Actions.FETCH_POSTS_FAILURE:
            return {};
        case Actions.FETCH_POSTS_SUCCESS:
            return { ...action.payload};
        default: return state;
        }
    }else if(action.type.startsWith('VOTE_POST')){
        switch(action.type){
        case Actions.VOTE_POST:
            let postID = action.postID;
            let voteScore = state[postID].voteScore;
            let operation = (action.option === "upVote" ? 1 : -1);
            return {...state,
                    [action.postID] : {...state[action.postID],
                                       voteScore: voteScore + operation}
                   };
        case Actions.VOTE_POST_SUCCESS:
            return state;
        case Actions.VOTE_POST_FAILURE:
            postID = action.postID;
            voteScore = state[postID].voteScore;
            operation = (action.option === "upVote" ? -1 : 1);
            return {...state,
                    [action.postID] : {...state[action.postID],
                                       voteScore: voteScore + operation}
                   };
        default: return state;
        }
    }else if(action.type.startsWith('DELETE_POST')){
        switch(action.type){
        case Actions.DELETE_POST:
            return {...state,
                    [action.postID]:{...state[action.postID],
                                     deleted: true}};
        case Actions.DELETE_POST_SUCCESS:
            return state;
        case Actions.DELETE_POST_FAILURE:
            return {...state,
                    [action.postID]:{...state[action.postID],
                                     deleted: false}};
        default: return state;
        }
    }else if(action.type.startsWith('POST_POST')){
        switch(action.type){
        case Actions.POST_POST:
            return state;
        case Actions.POST_POST_SUCCESS:
            return {...state, [action.post.ID]:{...action.post}};
        case Actions.POST_POST_FAILURE:
            return state;
        default: return state;
        }
    }else if(action.type.startsWith('UPDATE_POST')){
        switch(action.type){
        case Actions.UPDATE_POST:
            return state;
        case Actions.UPDATE_POST_SUCCESS:
            return state;
        case Actions.UPDATE_POST_FAILURE:
            return state;
        default: return state;
        }
    }
    return state;
};



