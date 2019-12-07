import * as actionTypes from 'store/actions/user/actionTypes_user';

const initialState = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  }, // stores login information

  taste: {
    // TODO: implement this!
  },

  friend: [{ id: 1, nickname: 'name' }],
  searchUsers: [],

  search: undefined,
  logged_in: false,
};

const reducer = (state = initialState, action) => {
  let newState = state;
  let { user } = state;

  switch (action.type) {
    case actionTypes.USER_IS_NOT_LOGGED_IN:
      newState = { ...state, user: initialState.user, logged_in: false };
      return newState;

    case actionTypes.GET_USER_INFO:
      newState = { ...state, user: action.data, logged_in: true };
      return newState;

    case actionTypes.LOGIN_FAILED:
      user = {
        ...state.user,
        failed: true,
      };

      newState = {
        ...state,
        user,
        logged_in: false,
      };

      return newState;

    case actionTypes.LOGIN:
      newState = {
        ...state,
        user: {
          ...state.user,
          failed: false,
        },
        logged_in: true,
      };

      return newState;

    case actionTypes.LOGOUT:
      newState = {
        ...state,
        user: initialState.user,
        logged_in: false,
      };

      return newState;

    case actionTypes.FIND_ID:
      newState = {
        ...state,
        search: action.data.id,
      };

      return newState;

    case actionTypes.REGISTER:
      return newState;

    case actionTypes.GET_FRIENDS:
      newState = {
        ...state,
        friend: action.data,
      };
      return newState;

    case actionTypes.CLEAR_SEARCH_USERS:
      newState = {
        ...state,
        searchUsers: [],
      };
      return newState;

    case actionTypes.SEARCH_USERS:
      newState = {
        ...state,
        searchUsers: action.data,
      };
      return newState;

    default:
      break;
  }

  return newState;
};

export default reducer;
