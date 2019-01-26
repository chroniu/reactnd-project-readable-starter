import {createStore, applyMiddleware, compose} from 'redux';
import {createLogicMiddleware} from 'redux-logic';
import {rootReducer} from './rootReducer';

import categoriesLogic from '../categories/logic';


const deps = {
    //TODO remove if not used
};

export const configureStore = () => {
    const arrLogic = [categoriesLogic];
    const logicMiddleware = createLogicMiddleware(arrLogic, deps);
    const middlewares = [
        logicMiddleware,
    ];
        
    return createStore(rootReducer, compose(applyMiddleware(...middlewares)));
};

export default configureStore;
