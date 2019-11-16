import axios from 'axios';
import * as actionTypes from './actionTypes_review';

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
);

export const EDIT_REVIEW = (id, review) => (dispatch) => (
  axios.put(`/api/review/${id}/`, review)
    .then(dispatch(GET_REVIEW_PRE()))
);

export const POST_REVIEW = (review) => (dispatch) => (
  axios.get('/api/review/', review)
    .then(dispatch(GET_REVIEW_PRE()))
);
