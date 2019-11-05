import axios from 'axios';
import * as actionTypes from './actionTypes_user';
// import axios from 'axios'; TODO: API Required. Below is mock for test code.

export const GET_USER_INFO_DEEP = (data) => ({
  type: actionTypes.GET_USER_INFO,
  data,
});

export const GET_USER_INFO = () => (dispatch) => axios.get('/api/user/')
  .then((res) => dispatch(GET_USER_INFO_DEEP(res.data)))
  .catch();

export const LOGIN_AFTER = () => GET_USER_INFO();

export const LOGIN_DEEP = (data) => ({
  type: actionTypes.LOGIN,
  data,
}); // TODO: @ sprint 4

export const LOGIN = () => (dispatch) => axios.post('/api/signin/', {
  username: 'swpp',
  password: '1234',
}).then((res) => dispatch(LOGIN_DEEP(res.data)))
  .catch();

export const REGISTER_DEEP = (data) => ({
  type: actionTypes.REGISTER,
  data,
});

export const REGISTER = () => (dispatch) => axios.post('/api/signup/', {
  username: 'swpp',
  password: '1234',
  phone_number: '010-1234-5678',
  age: 22,
  gender: 'Male',
})
  .then((res) => dispatch(REGISTER_DEEP(res.data)))
  .catch();
