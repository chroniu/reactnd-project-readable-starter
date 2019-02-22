import {createStore, applyMiddleware, compose} from 'redux';
import {createLogicMiddleware} from 'redux-logic';
import {rootReducer} from './rootReducer';
import * as API from '../../utils/API';

import categoriesLogic from '../categories/logic';
import postsLogic from '../posts/logic';
import commentsLogic from '../comments/logic';

import logger from 'redux-logger';


const deps = {
    API,
};  

export const configureStore = () => {
    const arrLogic = [categoriesLogic,
                      ...postsLogic,
                      ...commentsLogic];
    
    const logicMiddleware = createLogicMiddleware(arrLogic, deps);
    const middlewares = [
        logicMiddleware,
        logger,
    ];
        
    return createStore(rootReducer, compose(applyMiddleware(...middlewares)));
};

export default configureStore;
