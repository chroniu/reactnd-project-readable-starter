import {createLogic} from 'redux-logic';
import * as Actions from './actions.js';
import {arrayToIndexedObject} from '../../utils/helpers.js';


const fetchPostsLogic = createLogic({
    type: Actions.FETCH_POSTS,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.FETCH_POSTS_SUCCESS,
        failType: Actions.FETCH_POSTS_FAILURE
    },
    process({API, getState, action}){
        if(action.categoryID === undefined)
            return API.getAllPosts().then(resp => arrayToIndexedObject(resp, 'id'));
        else
            return  API.getPosts(action.categoryID).then(resp => arrayToIndexedObject(resp, 'id'));
    }
});

const fetchPostLogic = createLogic({
    type: Actions.FETCH_POST,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.FETCH_POST_SUCCESS,
        failType: Actions.FETCH_POST_FAILURE
    },
    process({API, getState, action}){
        return API.getPost(action.postID)
            .then(resp => arrayToIndexedObject(resp, 'id'));
    }
});

const updatePostLogic = createLogic({
    type: Actions.UPDATE_POST,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.UPDATE_POST_SUCCESS,
        failType: Actions.UPDATE_POST_FAILURE
    },
    process({API, getState, action}){
      
    }
});

const deletePostLogic = createLogic({
    type: Actions.DELETE_POST,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.DELETE_POST_SUCCESS,
        failType: Actions.DELETE_POST_FAILURE
    },
    process({API, getState, action}){

    }
});

const votePostLogic = createLogic({
    type: Actions.VOTE_POST,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.VOTE_POST_SUCCESS,
        failType: Actions.VOTE_POST_FAILURE
    },
    process({API, getState, action}){
        return API.votePost(action.postID, action.option);
    }
});


const postPostLogic = createLogic({
    type: Actions.POST_POST,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.POST_POST_SUCCESS,
        failType: Actions.POST_POST_FAILURE
    },
    process({API, getState, action}){

    }
});


export default [fetchPostsLogic, fetchPostLogic, updatePostLogic, deletePostLogic, votePostLogic, postPostLogic];
