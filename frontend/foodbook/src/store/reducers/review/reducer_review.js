import * as actionTypes from 'store/actions/review/actionTypes_review';

const initialState = {
  reviewList: [],
  reviewDetail: {},
  reviewRestaurantList: [],
};

const reducer = (state = initialState, action) => {
  let newState = state;
  let newReview;
  let newList;

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
      newReview = {
        id: action.id,
        restaurant: action.restaurant,
        menu: action.menu,
        rating: action.rating,
        date: action.date,
        image: action.image,
        tag: action.tag,
        category: action.category,
      };
      return { ...state, reviewList: state.reviewList.concat(newReview) };

    case actionTypes.EDIT_REVIEW:
      newReview = {
        id: action.id,
        restaurant: action.restaurant,
        menu: action.menu,
        rating: action.rating,
        date: action.date,
        image: action.image,
        tag: action.tag,
        category: action.category,
      };

      newList = state.reviewList.map((review) => (review.id === action.id ? newReview : review));

      return { ...state, reviewList: newList, reviewDetail: newReview };

    case actionTypes.CLEAR_RESTAURANT_REVIEWS:
      return { ...state, reviewRestaurantList: [] };

    case actionTypes.GET_RESTAURANT_REVIEWS:
      newState = {
        ...state,
        reviewRestaurantList: action.data,
      };
      return newState;

    default:
      break;
  }
  return state;
};

export default reducer;
