import * as actionTypes from 'store/actions/review/actionTypes_review';

const initialState = {
  reviewList: [],
  reviewDetail: {},
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

    case actionTypes.GET_REVIEW:
      newState = {
        ...state,
        reviewDetail: action.data,
      };
      return newState;

    case actionTypes.CLEAR_REVIEWS:
      return { ...state, reviewList: [] };

    case actionTypes.CLEAR_REVIEW:
      return { ...state, reviewDetail: {} };

    case actionTypes.POST_REVIEW:
      // eslint-disable-next-line no-case-declarations
      const newReview = {
        id: action.id,
        restaurant: action.restaurant,
        menu: action.menu,
        rating: action.rating,
        date: action.date,
        image: action.image,
        tag: action.tag,
      };
      return { ...state, reviewList: state.reviewList.concat(newReview) };

    default:
      break;
  }
  return state;
};

export default reducer;
