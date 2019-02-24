export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const POST_POST = 'POST_POST';
export const POST_POST_SUCCESS = 'POST_POST_SUCCESS';
export const POST_POST_FAILURE = 'POST_POST_FAILURE'; 

export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POSTS = 'DELETE_POSTS';
export const DELETE_POSTS_SUCCESS = 'DELETE_POSTS_SUCCESS';
export const DELETE_POSTS_FAILURE = 'DELETE_POSTS_FAILURE';


export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE';


export const fetchPosts = (categoryID) => {
    return{
        type: FETCH_POSTS,
        categoryID
    };
};

export const fetchPost = (postID) => {
    return{
        type: FETCH_POSTS,
        postID
    };
};

export const deletePost = (postID) =>{
    return{
        type: DELETE_POSTS,
        postID
    };
};

export const votePost = (postID, option) => {
    return{
        type: VOTE_POST,
        postID,
        option
    };
};

export const updatePost = (post) => {
    return{
        type: UPDATE_POST,
        post
    };
};

export const postPost = (post) =>{
    return{
        type: POST_POST,
        post
    };
};


export default {
    FETCH_POST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    DELETE_POSTS,
    DELETE_POSTS_SUCCESS,
    DELETE_POSTS_FAILURE,
    POST_POST,
    POST_POST_SUCCESS,
    POST_POST_FAILURE,
    fetchPosts,
    fetchPost,
    deletePost,
    updatePost,
    postPost,
    votePost
};
