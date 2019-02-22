import {createLogic} from 'redux-logic';
import * as Actions from './actions.js';
import {arrayToIndexedObject} from '../../utils/helpers.js';

const categoriesLogic = createLogic({
    type: Actions.FETCH_CATEGORIES,
    latest: true,
    processOptions:{
        dispatchReturn: true,
        successType: Actions.FETCH_CATEGORIES_SUCCESS,
        failType: Actions.FETCH_CATEGORIES_FAILURE
    },
    process({API, getState, action}){
        return API.getCategories()
            .then(resp => arrayToIndexedObject(resp.categories, 'name'));
    }
});

export default categoriesLogic;
