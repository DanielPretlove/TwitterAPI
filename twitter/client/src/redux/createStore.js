//create store
import { createStore, applyMiddleware } from 'redux';

//call function inside of a function
import thunk from 'redux-thunk';

//prefetch data for redux

import rootReducer from './rootReducer';

//export store
export const store = createStore(rootReducer, applyMiddleware(thunk));

//more convenience to use within the app
export default store;
