import * as actionTypes from 'store/actions/review/actionTypes_review';

const initialState = {
  reviewList: [],
  reviewDetail: {
    author_name: '',
    date: '0000-00-00', // should be provided this form
    photo: 'url', // TODO: should save url? not yet decided.
    comment: '',
    rating: -1,
    location: {},
    restaurant: {
      name: '',
      location: {},
      rating: -1,
    },
    tag: {}, // TODO: should decide first.
  }, // use it for both uploading and saving.

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_REVIEW:
      break;

    default:
      break;
  }

  return state;
};

export default reducer;
