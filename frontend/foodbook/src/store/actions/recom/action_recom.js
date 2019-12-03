import axios from 'axios';
import * as actionTypes from './actionTypes_recom';

/*
    ACTION-NAMES_PRE: executes before the action is dispatched
    ACTION-NAMMES_DEEP: return object for dispatch
*/

export const GET_RECOMS_PRE = () => ({
  type: actionTypes.CLEAR_RECOMS,
});

export const GET_RECOMS_LOC_DEEP = (data) => ({
  type: actionTypes.GET_RECOMS_LOC,
  data,
});

export const GET_RECOMS_TST_DEEP = (data) => ({
  type: actionTypes.GET_RECOMS_TST,
  data,
});

export const GET_RECOMS_LOC = (data) => (dispatch) => {
  dispatch(GET_RECOMS_PRE());

  return axios.get(`/api/review/${data.id}/recomloc/c=${data.lat},${data.log}/`, data)
    .then((res) => dispatch(GET_RECOMS_LOC_DEEP(res.data)))
    .catch(dispatch(GET_RECOMS_PRE()));
};

export const GET_RECOMS_TST = (id) => (dispatch) => {
  dispatch(GET_RECOMS_PRE());

  return axios.get(`/api/review/${id}/recomtst/`)
    .then((res) => dispatch(GET_RECOMS_TST_DEEP(res.data)))
    .catch(dispatch(GET_RECOMS_PRE()));
};
