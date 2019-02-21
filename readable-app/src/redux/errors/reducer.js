/*
  Adapted from https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
*/

const regex = new RegExp('^(FETCH)_([A-Z]*)_?(FAILURE|SUCCESS)?');

export const errors = (state = {}, action) =>{
    const { type } = action;
    const matches = regex.exec(type);

    if (!matches) return state;  
  
    const [, , resource, status] = matches;

      return {
        ...state,
          [resource.toLowerCase()]: status === 'FAILURE' ? true: false};
};

