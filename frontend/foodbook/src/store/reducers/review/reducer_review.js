import * as actionTypes from 'store/actions/review/actionTypes_review';

const initialState = {
  reviewList: [],
  reviewDetail: {
    id: -1,
    author: '',
    restaurant: '',
    menu: '',
    content: '',
    image: '',
    rating: -1,
    date: '0000-00-00', // should be provided this form
    tag: {}, // TODO: should decide first.
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      return { ...state, reviewList: action.data };

    case actionTypes.CLEAR_REVIEWS:
      return { ...state, reviewList: [] };

    default:
      break;
  }

  return state;
};

export default reducer;
