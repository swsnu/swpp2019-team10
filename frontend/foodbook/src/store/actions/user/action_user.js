import axios from 'axios';
import { push } from 'connected-react-router';

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

export const LOGIN_FAILED = () => ({
  type: actionTypes.LOGIN_FAILED,
});

export const LOGIN = (userData) => (dispatch) => axios.post('/api/signin/', {
  username: userData.username,
  password: userData.password,
}).then(() => {
  dispatch(LOGIN_DEEP());
  dispatch(push('/main/'));
})
  .catch(() => {
    dispatch(LOGIN_FAILED());
  });

export const REGISTER_DEEP = () => ({
  type: actionTypes.REGISTER,
});

export const FIND_ID_DEEP = (data) => ({
  type: actionTypes.FIND_ID,
  data,
});

export const FIND_ID = (username) => (dispatch) => {
  return axios.post('/api/signup_dupcheck/', { username })
    .then((res) => dispatch(FIND_ID_DEEP(res.data)))
    .catch();
};

export const REGISTER = (userData) => (dispatch) => dispatch(FIND_ID(userData.username))
  .then((res) => {
    if (res.data.id === -1) {
      return axios.post('/api/signup/', {
        username: userData.username,
        password: userData.password,
        phone_number: userData.phone_number,
        age: userData.age === '' ? -1 : userData.age,
        gender: userData.gender,
        nickname: userData.nickname,
      })
        .then(() => dispatch(REGISTER_DEEP()))
        .catch();
    }
    return undefined;
  });
