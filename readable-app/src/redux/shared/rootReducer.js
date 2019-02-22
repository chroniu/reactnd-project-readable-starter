/**
   @describle Export the root reducer
*/
import {combineReducers} from 'redux';
import {categories} from '../categories/reducer';
import {posts} from '../posts/reducer';
import {comments} from '../comments/reducer';
import {loading} from '../loading/reducer';
import {errors} from '../errors/reducer';

export const rootReducer = combineReducers({
    categories,
    posts,
    comments,
    loading,
    errors
});

export default rootReducer;
