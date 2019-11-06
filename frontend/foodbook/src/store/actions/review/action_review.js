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

/*
export const POST_REVIEWS = (review) => (dispatch) => {
  return axios.get('/api/review/')
    .then((res) => dispatch(GET_REVIEWS_DEEP(res.data)))
    .catch(dispatch(GET_REVIEWS_PRE()));
};
*/
