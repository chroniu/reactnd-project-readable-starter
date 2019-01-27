import React from 'react';
import ReactDOM from 'react-dom';
import { createMockStore } from 'redux-logic-test';
import categoriesLogic from './logic';
import {categories} from './reducer';
import Actions from './actions';
const logic = [categoriesLogic]; // array of logic to use/test

const injectedDeps = {
    API:{
        getCategories(){return Promise.resolve({"categories":[ {"name":"react", "path":"react"}]});}
    }
};

const initialState = {};
const reducer = categories;

const store = createMockStore({
    initialState,
    reducer,
    logic,
    injectedDeps
});

describe('Categories Logic', () => {
    it('should fetch categories and dispatch', done => {

        store.dispatch(Actions.fetchCategories());
        store.whenComplete(() => { 
            expect(store.actions).toEqual([
                { type: Actions.FETCH_CATEGORIES },
                { type: Actions.FETCH_CATEGORIES_SUCCESS, payload: {
                    "react":{name:"react", "path":"react"}
                }}
            ]);
            done();
        });
    });
});
