import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes_user';

export const USER_IS_NOT_LOGGED_IN = () => ({
  type: actionTypes.USER_IS_NOT_LOGGED_IN,
});

export const GET_USER_INFO_DEEP = (data) => ({
  type: actionTypes.GET_USER_INFO,
  data,
});

export const GET_USER_INFO = () => (dispatch) => axios.get('/api/')
  .then((res) => dispatch(GET_USER_INFO_DEEP(res.data)))
  .catch(() => dispatch(USER_IS_NOT_LOGGED_IN()));

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

export const FIND_ID = (data) => (dispatch) => axios.post('/api/signup_dupcheck/', { username: data.username, nickname: data.nickname })
  .then((res) => dispatch(FIND_ID_DEEP(res.data)))
  .catch();

export const REGISTER = (userData) => (dispatch) => dispatch(FIND_ID({
  username: userData.username,
  nickname: userData.nickname,
})).then((res) => {
  if (res.data.id === -1 && res.data.id2 === -1) {
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

export const LOGOUT_DEEP = () => ({
  type: actionTypes.LOGOUT,
});

export const LOGOUT = () => (dispatch) => axios.get('/api/signout/')
  .then(() => {
    dispatch(LOGOUT_DEEP());
    dispatch(push('/'));
  })
  .catch();

export const GET_FRIENDS_DEEP = (data) => ({
  type: actionTypes.GET_FRIENDS,
  data,
});

export const GET_FRIENDS = () => (dispatch) => axios.get('/api/friend/')
  .then((res) => { dispatch(GET_FRIENDS_DEEP(res.data)); });

export const SEARCH_USERS_PRE = () => ({
  type: actionTypes.CLEAR_SEARCH_USERS,
});

export const SEARCH_USERS_DEEP = (data) => ({
  type: actionTypes.SEARCH_USERS,
  data,
});

export const SEARCH_USERS = (prefix) => (dispatch) => axios.get(`/api/search_user/${prefix}/`)
  .then((res) => { dispatch(SEARCH_USERS_DEEP(res.data)); });

export const ADD_FRIEND = (id) => (dispatch) => axios.post('/api/friend/', { id })
  .then(() => {
    dispatch(SEARCH_USERS_PRE());
    dispatch(GET_FRIENDS());
    dispatch(GET_USER_INFO());
  });

export const DELETE_FRIEND = (id) => (dispatch) => axios.delete(`/api/friend/${id}`)
  .then(() => {
    dispatch(SEARCH_USERS_PRE());
    dispatch(GET_FRIENDS());
    dispatch(GET_USER_INFO());
  });

export const GET_FRIEND_INFO_DEEP = (data) => ({
  type: actionTypes.GET_FRIEND_INFO,
  data,
});

export const GET_FRIEND_INFO = (id) => (dispatch) => axios.get(`/api/friend/${id}/`)
  .then((res) => dispatch(GET_FRIEND_INFO_DEEP(res.data)));
