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
        }
    }
    return state;
};



