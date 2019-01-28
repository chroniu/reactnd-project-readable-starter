import React from 'react';
import ReactDOM from 'react-dom';
import { createMockStore } from 'redux-logic-test';
import logics from './logic';
import {posts} from './reducer';
import Actions from './actions';

const logic = logics; 
const initialState = {};
const reducer = posts;


const injectedDeps = {
    API:{
        getAllPosts(){
            return Promise.resolve([
                {"author": "thingone", "body": "Just kidding. It takes more than 10 minutes to learn technology.",
                 "category": "redux", "commentCount": 0, "deleted": false, "id": "6ni6ok3ym7mf1p33lnez",
                 "timestamp": 1468479767190, "title": "Learn Redux in 10 minutes!", "voteScore": -5},
                {"author": "thingtwo", "body": "Everyone says so after all.", "category": "react",
                 "commentCount": 2, "deleted": false, "id": "8xf0y6ziyjabvozdd253nd", "timestamp": 1467166872634,
                 "title": "Udacity is the best place to learn React", "voteScore": 6}]);
        },
        getPosts(categoryID){
            if(categoryID==='react')
                return Promise.resolve(
                    [{"author": "thingtwo", "body": "Everyone says so after all.", "category": "react",
                      "commentCount": 2, "deleted": false, "id": "8xf0y6ziyjabvozdd253nd", "timestamp": 1467166872634,
                      "title": "Udacity is the best place to learn React", "voteScore": 6}]);
            else return Promise.resolve([]);
        }
    
    }
};


describe('Posts Logic', () => {
    let store;
    beforeEach(() => {
        store = createMockStore({
            initialState,
            reducer,
            logic,
            injectedDeps,
        });
    });
    
    
    it('should fetch all posts and dispatch', done => {
        store.dispatch(Actions.fetchPosts());
        store.whenComplete(() => { 
            expect(store.actions).toEqual([
                { type: Actions.FETCH_POSTS, categoryID: undefined },
                { type: Actions.FETCH_POSTS_SUCCESS, payload:{
                    "6ni6ok3ym7mf1p33lnez":  {"author": "thingone", "body": "Just kidding. It takes more than 10 minutes to learn technology.",
                                              "category": "redux", "commentCount": 0, "deleted": false, "id": "6ni6ok3ym7mf1p33lnez",
                                              "timestamp": 1468479767190, "title": "Learn Redux in 10 minutes!", "voteScore": -5},
                    "8xf0y6ziyjabvozdd253nd": {"author": "thingtwo", "body": "Everyone says so after all.", "category": "react",
                                               "commentCount": 2, "deleted": false, "id": "8xf0y6ziyjabvozdd253nd", "timestamp": 1467166872634,
                                               "title": "Udacity is the best place to learn React", "voteScore": 6}
                }}
                
            ]);
            done();
        });
    });


    it('should return nothing because it fetchs posts from an unkown category', done => {
        store.dispatch(Actions.fetchPosts('null'));
        store.whenComplete(() => { 
            expect(store.actions).toEqual([
                { type: Actions.FETCH_POSTS, categoryID: 'null' },
                { type: Actions.FETCH_POSTS_SUCCESS, payload: {}}
            ]);
            done();
        });
    });
    

    it('should fetch all posts from a give known category', done => {
        store.dispatch(Actions.fetchPosts('react'));
        store.whenComplete(() => { 
            expect(store.actions).toEqual([
                { type: Actions.FETCH_POSTS, categoryID: 'react' },
                { type: Actions.FETCH_POSTS_SUCCESS,
                  payload: {"8xf0y6ziyjabvozdd253nd":{"author": "thingtwo", "body": "Everyone says so after all.", "category": "react",
                                                      "commentCount": 2, "deleted": false, "id": "8xf0y6ziyjabvozdd253nd", "timestamp": 1467166872634,
                                                      "title": "Udacity is the best place to learn React", "voteScore": 6}}}
            ]);
            done();
        });
    });
});
