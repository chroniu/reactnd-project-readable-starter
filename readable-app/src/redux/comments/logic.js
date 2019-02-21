
import {createLogic} from 'redux-logic';
import * as Actions from './actions';
import {arrayToIndexedObject, getUUID} from '../../utils/helpers';


const fetchCommentsLogic = createLogic({
    type: Actions.FETCH_COMMENTS,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.FETCH_COMMENTS_SUCCESS,
        failType: Actions.FETCH_COMMENTS_FAILURE
    },
    process({API, getState, action}){
        
        return  API.getComments(action.postID).then(resp => arrayToIndexedObject(resp, 'id'));
    }
});


const updateCommentLogic = createLogic({
    type: Actions.UPDATE_COMMENT,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.UPDATE_COMMENT_SUCCESS,
        failType: Actions.UPDATE_COMMENT_FAILURE
    },
    process({API, getState, action}){
        return API.updateComment(action.comment);
    }
});

const deleteCommentLogic = createLogic({
    type: Actions.DELETE_COMMENT,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.DELETE_COMMENT_SUCCESS,
        failType: Actions.DELETE_COMMENT_FAILURE
    },
    process({API, getState, action}){
        return API.deleteComment(action.commentID);
    }
});

const voteCommentLogic = createLogic({
    type: Actions.VOTE_COMMENT,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.VOTE_COMMENT_SUCCESS,
        failType: Actions.VOTE_COMMENT_FAILURE
    },
    process({API, getState, action}){
        return API.voteComment(action.commentID, action.option);
    }
});


const postCommentLogic = createLogic({
    type: Actions.POST_COMMENT,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.POST_COMMENT_SUCCESS,
        failType: Actions.POST_COMMENT_FAILURE
    },
    process({API, getState, action}){
        action.comment.id = getUUID();
        action.comment.timestamp = new Date().getTime();
        action.comment.deleted = false;
        action.comment.parentDeleted = false;
        action.comment.voteScore = 1;
        console.log("action to API", action);
        return API.postComment(action.comment);        
    }
});


export default [fetchCommentsLogic, deleteCommentLogic, voteCommentLogic, postCommentLogic ];//, updateCommentLogic, 
