import * as actionTypes from './actionTypes_user';
// import axios from 'axios'; TODO: API Required. Below is mock for test code.

export const LOGIN_INNER = () => ({
  type: actionTypes.LOGIN,
  userInfo: {},
}); // TODO: @ sprint 4


export const LOGIN = () => (dispatch) => (dispatch(LOGIN_INNER()));
