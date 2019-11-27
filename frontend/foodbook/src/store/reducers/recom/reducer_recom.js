import * as actionTypes from 'store/actions/review/actionTypes_recom';

const initialState = {
  recomList: [],
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_RECOMS:
      newState = {
        ...state,
        recomList: action.data,
      };
      return newState;

    case actionTypes.CLEAR_RECOMS:
      return { ...state, recomList: [] };

    default:
      break;
  }

  return state;
};

export default reducer;
