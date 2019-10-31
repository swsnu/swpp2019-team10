import * as actionTypes from './actionTypes_user';
// import axios from 'axios'; TODO: API Required. Below is mock for test code.

export const stubDeep = (id) => id * 2; // mock
export const stub = (input) => ({ name: actionTypes.DELETE_FRIEND, value: stubDeep(input) });
