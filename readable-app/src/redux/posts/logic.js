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


                                    
export default [fetchPostsLogic, fetchPostLogic];
