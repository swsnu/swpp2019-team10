import axios from 'axios';
import * as actionTypes from './actionTypes_recom';

/*
    ACTION-NAMES_PRE: executes before the action is dispatched
    ACTION-NAMMES_DEEP: return object for dispatch
*/

export const GET_RECOMS_PRE = () => ({
  type: actionTypes.CLEAR_RECOMS,
});

export const GET_RECOMS_DEEP = (data) => ({
  type: actionTypes.GET_RECOMS,
  data,
});

export const GET_RECOMS = (id) => (dispatch) => {
  dispatch(GET_RECOMS_PRE());

  return axios.get(`/api/review/${id}/recommendation`)
    .then((res) => dispatch(GET_RECOMS_DEEP(res.data)))
    .catch(dispatch(GET_RECOMS_PRE()));
};
