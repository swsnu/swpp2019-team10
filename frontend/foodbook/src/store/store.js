import { createStore, combineReducers, applyMiddleware } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import userReducer from './reducers/user/reducer_user';
import reviewReducer from './reducers/review/reducer_review';
import recoReducer from './reducers/reco/reducer_reco';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userReducer,
  review: reviewReducer,
  reco: recoReducer,
});

const store = createStore(rootReducer,
  applyMiddleware(thunk, routerMiddleware(history)));

export default store;
