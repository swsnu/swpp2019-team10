import { createStore, combineReducers, applyMiddleware } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import userReducer from 'store/actions/user/action_user';
import reviewReducer from 'store/actions/review/action_review';
import recoReducer from 'store/actions/reco/action_reco';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userReducer,
  review: reviewReducer,
  reco: recoReducer,
});

const store = createStore(rootReducer,
  applyMiddleware(thunk, routerMiddleware(history)));

export default store;
