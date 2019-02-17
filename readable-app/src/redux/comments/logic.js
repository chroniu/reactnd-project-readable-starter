import {createLogic} from 'redux-logic';
import * as Actions from './actions.js';
import {arrayToIndexedObject} from '../../utils/helpers.js';


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


export default [fetchCommentsLogic];
