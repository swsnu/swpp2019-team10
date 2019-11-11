import axios from 'axios';
import store from 'store/store';
import * as actionCreators from './action_user';

const newUser = {
  username: 'swpp',
  phone_number: '010-1234-5678',
  age: -1,
  gender: 'Male',
  profile_pic: 'undefined',
  number_of_reviews: 123,
  number_of_friends: 456,
};

const initialState = {
  username: '',
  phone_number: '',
  age: -1,
  gender: '',
  profile_pic: '',
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
});
