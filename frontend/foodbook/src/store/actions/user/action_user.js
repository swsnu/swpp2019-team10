import axios from 'axios';
import * as actionTypes from './actionTypes_user';

export const GET_USER_INFO_DEEP = (data) => ({
  type: actionTypes.GET_USER_INFO,
  data,
});

export const GET_USER_INFO = () => (dispatch) => axios.get('/api/user/')
  .then((res) => dispatch(GET_USER_INFO_DEEP(res.data)))
  .catch();

export const LOGIN_DEEP = () => ({
  type: actionTypes.LOGIN,
});

export const LOGIN = (userData) => (dispatch) => axios.post('/api/signin/', {
  username: userData.username,
  password: userData.password,
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
  nickname: userData.nickname,
})
  .then(() => dispatch(REGISTER_DEEP()))
  .catch();

export const PROFILE_PIC_DEEP = () => ({
  type: actionTypes.PROFILE_PIC,
});

export const PROFILE_PIC = (data) => (dispatch) => axios.post(`/api/signup/${data.id}/image/`, data.file)
  .then(() => dispatch(PROFILE_PIC_DEEP()))
  .catch();
