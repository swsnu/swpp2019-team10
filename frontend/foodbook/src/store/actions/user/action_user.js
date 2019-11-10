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

export const LOGIN_DEEP = () => ({
  type: actionTypes.LOGIN,
}); // TODO: @ sprint 4

export const LOGIN = () => (dispatch) => axios.post('/api/signin/', {
  username: 'swpp',
  password: '1234',
}).then(() => dispatch(LOGIN_DEEP()))
  .catch();

export const REGISTER_DEEP = () => ({
  type: actionTypes.REGISTER,
});

export const REGISTER = (userData) => (dispatch) => axios.post('/api/signup/', {
  username: userData.username,
  password: userData.password,
  phone_number: userData.phone_number,
  age: userData.age,
  gender: userData.gender,
})
  .then(() => dispatch(REGISTER_DEEP()))
  .catch();
