import { createStore, combineReducers, applyMiddleware } from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import userReducer from './reducers/user/reducer_user';
import reviewReducer from './reducers/review/reducer_review';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userReducer,
  review: reviewReducer,
  router: connectRouter(history),
});

const store = createStore(rootReducer,
  applyMiddleware(thunk, routerMiddleware(history)));

export default store;
