import * as actionTypes from 'store/actions/recom/actionTypes_recom';

const initialState = {
  recomlocList: [],
  recomtstList: [],
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_RECOMS_LOC:
      newState = {
        ...state,
        recomlocList: action.data,
      };
      return newState;

    case actionTypes.GET_RECOMS_TST:
      newState = {
        ...state,
        recomtstList: action.data,
      };
      return newState;
    case actionTypes.GET_RECOMS_IFH:
      newState = {
        ...state,
        recomtstList: action.data,
      };
      return newState;
    case actionTypes.CLEAR_RECOMS:
      return { ...state, recomlocList: [], recomtstList: [] };

    default:
      break;
  }

  return state;
};

export default reducer;
