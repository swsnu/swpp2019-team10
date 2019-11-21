import * as actionTypes from 'store/actions/user/actionTypes_user';

const initialState = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    profile_pic: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  }, // stores login information

  taste: {
    // TODO: implement this!
  },

  search: undefined,
};

const reducer = (state = initialState, action) => {
  let newState = state;
  let { user } = state;

  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      newState = { ...state, user: action.data };
      return newState;

    case actionTypes.LOGIN_FAILED:
      user = {
        ...state.user,
        failed: true,
      };

      newState = {
        ...state,
        user,
      };

      return newState;

    case actionTypes.LOGIN:
      newState = {
        ...state,
        user: {
          ...state.user,
          failed: false,
        },
      };

      return newState;

    case actionTypes.FIND_ID:
      newState = {
        ...state,
        search: action.data,
      };

      return newState;

    case actionTypes.REGISTER:
      return newState;

    default:
      break;
  }

  return newState;
};

export default reducer;
