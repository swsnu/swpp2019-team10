import axios from 'axios';
import store from 'store/store';
import * as actionCreators from './action_user';

const newUser = {
  username: 'swpp',
  phone_number: '010-1234-5678',
  failed: false,
  age: -1,
  gender: 'Male',
  number_of_reviews: 123,
  number_of_friends: 456,
};

const initialState = {
  username: '',
  phone_number: '',
  failed: false,
  age: -1,
  gender: '',
  number_of_reviews: -1,
  number_of_friends: -1,
};

const mockSignUpUser = {
  username: 'username',
  password: 'password',
  phone_number: 'phone_number',
  age: 0,
  gender: 'gender',
};

const mockUserWithoutAge = {
  username: 'username',
  password: 'password',
  phone_number: 'phone_number',
  age: '',
  gender: 'gender',
};

const mockLoginUser = {
  username: 'username',
  password: 'password',
};

describe('User', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register properly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
          data: {
            id: -1,
          },
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.REGISTER(mockSignUpUser));
    expect(spy).toHaveBeenCalledTimes(1);
    const newState = store.getState();
    expect(newState.user.user).toEqual(initialState);
    done();
  });

  it('should register properly when age is undefined', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
          data: {
            id: -1,
          },
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.REGISTER(mockUserWithoutAge));
    expect(spy).toHaveBeenCalledTimes(1);
    const newState = store.getState();
    expect(newState.user.user).toEqual(initialState);
    done();
  });

  it('should not register when the id is duplicated', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
          data: {
            id: 3,
          },
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.REGISTER(mockSignUpUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    const newState = store.getState();
    expect(newState.user.user).toEqual(initialState);
    done();
  });

  it('should login correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
          data: newUser,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.LOGIN(mockLoginUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(store.getState().user.user).toEqual(initialState);
      expect(store.getState().user.logged_in).toBeTruthy();
      done();
    });
  });

  it('should set failed flag to true when login failed', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve, reject) => {
        const result = {
          status: 401,
        };
        reject(result);
      }));

    store.dispatch(actionCreators.LOGIN(mockLoginUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(store.getState().user.user.failed).toBeTruthy();
      expect(store.getState().user.logged_in).toBeFalsy();
      done();
    });
  });

  it('should fetch login information', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: newUser,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.GET_USER_INFO()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(store.getState().user.user).toEqual(newUser);
    });
    done();
  });

  it('should set the login flag false when failed to fetch login information', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 401,
        };

        rej(result);
      }));

    store.dispatch(actionCreators.GET_USER_INFO()).catch(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(store.getState().user.logged_in).toBeFalsy();
    });
    done();
  });

  it('should handle searching user', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
          data: {
            id: 3,
          },
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.FIND_ID('abc')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(store.getState().user.search).toBe(3);
    });
    done();
  });

  it('should logout correctly', (done) => {
    const spyLogout = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
          data: {
            id: 3,
          },
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.LOGOUT()).then(() => {
      expect(spyLogout).toHaveBeenCalledTimes(1);
      expect(store.getState().user.logged_in).toBeFalsy();
    });
    done();
  });

  it('should get friends', (done) => {
    const friendList = [{ id: 1, nickname: 'name' }];
    const spyGetFriends = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: friendList,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.GET_FRIENDS()).then(() => {
      expect(spyGetFriends).toHaveBeenCalledTimes(1);
      expect(store.getState().user.friend).toBe(friendList);
    });
    done();
  });

  it('should search users', (done) => {
    const userList = [{ id: 1, nickname: 'name' }];
    const spySearchUsers = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: userList,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.SEARCH_USERS('u')).then(() => {
      expect(spySearchUsers).toHaveBeenCalledTimes(1);
      expect(store.getState().user.searchUsers).toBe(userList);
    });
    done();
  });
});
