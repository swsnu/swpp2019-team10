import * as actionTypes from 'store/actions/user/actionTypes_user';

const initialState = {
  info: {
    id: '',
    username: '',
    login: false,
    friendCount: 0,
    writeCount: 0,
  }, // stores login information

  taste: {
    // TODO: implement this!
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FRIEND:
      break;

    default:
      break;
  }

  return state;
};

export default reducer;
