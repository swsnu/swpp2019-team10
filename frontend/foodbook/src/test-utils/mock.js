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

export const getMockUserStore = (userState) => {
  const mockUserReducer = getMockReducer(userState);

  const rootReducer = combineReducers({
    user: mockUserReducer,
    router: connectRouter(history),
  });

  const mockStore = createStore(rootReducer,
    applyMiddleware(thunk, routerMiddleware(history)));

  return mockStore;
};

export const getMockReviewStore = (reviewState) => {
  const mockReviewReducer = getMockReducer(reviewState);

  const rootReducer = combineReducers({
    review: mockReviewReducer,
    router: connectRouter(history),
  });

  const mockStore = createStore(rootReducer,
    applyMiddleware(thunk, routerMiddleware(history)));

  return mockStore;
};

export const getMockRecoStore = (recoState) => {
  const mockRecoReducer = getMockReducer(recoState);

  const rootReducer = combineReducers({
    reco: mockRecoReducer,
    router: connectRouter(history),
  });

  const mockStore = createStore(rootReducer,
    applyMiddleware(thunk, routerMiddleware(history)));

  return mockStore;
};

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
