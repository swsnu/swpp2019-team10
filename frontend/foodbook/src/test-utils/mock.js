import { createStore, combineReducers, applyMiddleware } from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const getMockReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = (userState, reviewState, recommendationState) => {
  const mockUserReducer = getMockReducer(userState);
  const mockReviewReducer = getMockReducer(reviewState);
  const mockRecoReducer = getMockReducer(recommendationState);

  const rootReducer = combineReducers({
    user: mockUserReducer,
    review: mockReviewReducer,
    reco: mockRecoReducer,
    router: connectRouter(history),
  });

  const mockStore = createStore(rootReducer,
    applyMiddleware(thunk, routerMiddleware(history)));

  return mockStore;
};
