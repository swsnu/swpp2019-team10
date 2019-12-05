export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const LOGIN_SNS = 'LOGIN_SNS'; // temproray. if login with sns doesn't need reducer then delete it.
export const REGISTER_SNS = 'REGISTER_SNS'; // same as above.
export const FIND_ID = 'FIND_ID';

export const GET_USER_ID = 'GET_USER_ID'; // I think, first get id from nickname and
export const GET_USER_INFO = 'GET_USER_INFO';
export const USER_IS_NOT_LOGGED_IN = 'USER_IS_NOT_LOGGED_IN';
// From this we can find particular user information
// (we need because we have to know about user's friends' information)

export const GET_FRIENDS = 'GET_FRIENDS';
// export const GET_FRIEND_INFO = 'GET_FRIEND_INFO'
// It doesn't need because we are to implement GET_USER_INFO to use id.

export const SEARCH_USERS = 'SEARCH_USERS';

export const ADD_FRIEND = 'ADD_FRIEND';
export const DELETE_FRIEND = 'DELETE_FRIEND';
