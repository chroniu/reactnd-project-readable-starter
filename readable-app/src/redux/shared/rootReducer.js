/**
   @describle Export the root reducer
*/

import {combineReducers} from 'redux';
import {categories} from '../categories/reducer';
import {posts} from '../posts/reducer';
import {loading} from '../loading/reducer';

export const rootReducer = combineReducers({
    categories,
    posts,
    loading
});

export default rootReducer;
