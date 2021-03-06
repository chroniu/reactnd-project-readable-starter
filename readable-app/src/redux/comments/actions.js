export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE';

export const POST_COMMENT = 'POST_COMMENT';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE'; 

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';


export const VOTE_COMMENT = 'VOTE_COMMENT';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE';


export const fetchComments = (postID) => {
    return{
        type: FETCH_COMMENTS,
        postID
    };
};

export const fetchComment = (commentID) => {
    return{
        type: FETCH_COMMENTS,
        commentID
    };
};

export const deleteComment = (commentID) =>{
    return{
        type: DELETE_COMMENT,
        commentID
    };
};

export const voteComment = (commentID, option) => {
    return{
        type: VOTE_COMMENT,
        commentID,
        option
    };
};

export const updateComment = (comment) => {
    return{
        type: UPDATE_COMMENT,
        comment
    };
};

export const postComment = (comment) =>{
    return{
        type: POST_COMMENT,
        comment
    };
};


export default {
    FETCH_COMMENT,
    FETCH_COMMENT_SUCCESS,
    FETCH_COMMENT_FAILURE,
    FETCH_COMMENTS,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    UPDATE_COMMENT,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    POST_COMMENT,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,
    fetchComments,
    fetchComment,
    deleteComment,
    updateComment,
    postComment,
    voteComment
};
