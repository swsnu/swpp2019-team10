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
  }, // stores login information

  taste: {
    // TODO: implement this!
  },
};

const reducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      newState = { ...state, user: action.data };
      return newState;

    case actionTypes.REGISTER: case actionTypes.LOGIN:
      return newState;

    default:
      break;
  }

  return newState;
};

export default reducer;
