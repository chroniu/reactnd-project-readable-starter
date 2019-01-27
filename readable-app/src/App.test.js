import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMockStore } from 'redux-logic-test';
import categoriesLogic from './redux/categories/logic';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Categories Logic', () => {
    

});
