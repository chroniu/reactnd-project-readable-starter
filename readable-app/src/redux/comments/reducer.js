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
    }else if(action.type.startsWith('POST_COMMENT')){
        switch(action.type){
        case Actions.POST_COMMENT:
            return state;
        case Actions.POST_COMMENT_SUCCESS:
            return {...state, [action.payload.id]: action.payload};
        case Actions.POST_COMMENT_FAILURE:
            return state;
        default: return state;
        }
    }else if(action.type.startsWith('VOTE_COMMENT')){
        switch(action.type){
        case Actions.VOTE_COMMENT:
            let commentID = action.commentID;
            let voteScore = state[commentID].voteScore;
            let operation = (action.option === "upVote" ? 1 : -1);
            return {...state,
                    [action.commentID] : {...state[action.commentID],
                                          voteScore: voteScore + operation}};
        case Actions.VOTE_COMMENT_SUCCESS:
            return state;
        case Actions.VOTE_COMMENT_FAILURE:
            commentID = action.commentID;
            voteScore = state[commentID].voteScore;
            operation = (action.option === "upVote" ? -1 : 1);
            return {...state,
                    [action.commentID] : {...state[action.commentID],
                                       voteScore: voteScore + operation}};
        default: return state;
        }
    }else if(action.type.startsWith('DELETE_COMMENT')){
        switch(action.type){
        case Actions.DELETE_COMMENT:
            return {...state,
                    [action.commentID] : {...state[action.commentID],
                                          deleted: true}};
        case Actions.DELETE_COMMENT_SUCCESS:
            return state;
        case Actions.DELETE_COMMENT_FAILURE:
            return {...state,
                    [action.commentID] : {...state[action.commentID],
                                          deleted: false}};
        default: return state;
        }
    }
    return state;
};
