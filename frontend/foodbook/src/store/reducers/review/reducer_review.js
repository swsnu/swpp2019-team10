import * as actionTypes from 'store/actions/review/actionTypes_review';

const initialState = {
  reviewList: [],
  reviewDetail: {
    content: '',
    restaurant: '',
    author: '',
    menu: '',
    image: '',
    rating: 5,
    date: '0000-00-00', // should be provided this form
    tag: [], // TODO: should decide first.
    ready: true,
    longitude: 0.0,
    latitude: 0.0,
  },
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      newState = {
        ...state,
        reviewList: action.data,
      };
      return newState;

    case actionTypes.CLEAR_REVIEWS:
      return { ...state, reviewList: [] };

    default:
      break;
  }

  return state;
};

export default reducer;
