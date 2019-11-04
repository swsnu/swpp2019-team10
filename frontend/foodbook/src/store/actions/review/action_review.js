import * as actionTypes from './actionTypes_review';
import axios from 'axios';

export const GET_REVIEWS_DEEP = (data) => {
    return {
        type: actionTypes.GET_REVIEWS,
        data: data
    };
}

export const GET_REVIEWS = () => {
    return dispatch => {
        return axios.get('/api/review/')
        .then(res => dispatch(GET_REVIEWS_DEEP(res.data)))
        .catch(res => console.log('Error: ', res));
    }
}