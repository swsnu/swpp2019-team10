import axios from 'axios';
import * as actionTypes from './actionTypes_review';
import { GET_USER_INFO } from '../user/action_user';

/*
    ACTION-NAMES_PRE: executes before the action is dispatched
    ACTION-NAMMES_DEEP: return object for dispatch
*/

export const GET_REVIEWS_PRE = () => ({
  type: actionTypes.CLEAR_REVIEWS,
});

export const GET_REVIEWS_DEEP = (data) => ({
  type: actionTypes.GET_REVIEWS,
  data,
});

export const GET_REVIEWS = () => (dispatch) => {
  dispatch(GET_REVIEWS_PRE());

  return axios.get('/api/review/')
    .then((res) => dispatch(GET_REVIEWS_DEEP(res.data)))
    .catch(dispatch(GET_REVIEWS_PRE()));
};

export const GET_REVIEW_DEEP = (data) => ({
  type: actionTypes.GET_REVIEW,
  data,
});

export const GET_REVIEW_PRE = () => ({
  type: actionTypes.CLEAR_REVIEW,
});

export const GET_REVIEW = (id) => (dispatch) => {
  dispatch(GET_REVIEW_PRE());

  return axios.get(`/api/review/${id}/`)
    .then((res) => dispatch(GET_REVIEW_DEEP(res.data)))
    .catch(dispatch(GET_REVIEW_PRE()));
};

export const DELETE_REVIEW = (id) => (dispatch) => (
  axios.delete(`/api/review/${id}/`)
    .then(dispatch(GET_REVIEW_PRE()))
    .then(dispatch(GET_USER_INFO()))
);

export const EDIT_REVIEW = (id, review) => (dispatch) => (
  axios.put(`/api/review/${id}/`, review)
    .then(dispatch(GET_REVIEW_PRE()))
);
export const POST_REVIEW_ADD = (review) => ({
  type: actionTypes.POST_REVIEW,
  ...review,
});
export const POST_REVIEW = (review, image) => (dispatch) => (
  axios.post('/api/review/', review)
    .then((res) => (
      (image !== false) ? axios.post(`/api/review/${res.data.id}/image/`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((resp) => dispatch(POST_REVIEW_ADD(resp.data)))
        .then(() => dispatch(GET_USER_INFO())) : dispatch(POST_REVIEW_ADD(res.data))
    ))
);
