export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const LOGIN_SNS = 'LOGIN_SNS'; // temproray. if login with sns doesn't need reducer then delete it.
export const REGISTER_SNS = 'REGISTER_SNS'; // same as above.
export const FIND_ID = 'FIND_ID';
export const UPLOAD_PROFILE_PIC = 'UPLOAD_PROFILE_PIC';

export const GET_USER_ID = 'GET_USER_ID'; // I think, first get id from nickname and
export const GET_USER_INFO = 'GET_USER_INFO';
// From this we can find particular user information
// (we need because we have to know about user's friends' information)

export const GET_FRIENDS_LIST = 'GET_FRIENDS_LIST';
// export const GET_FRIEND_INFO = 'GET_FRIEND_INFO'
// It doesn't need because we are to implement GET_USER_INFO to use id.

export const ADD_FRIEND = 'ADD_FRIEND';
export const DELETE_FRIEND = 'DELETE_FRIEND';
