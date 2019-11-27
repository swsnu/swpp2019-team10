import axios from 'axios';
import store from 'store/store';
import * as actionCreators from './action_recom';

const stubRecoms = [
  {
    #TODO
  },
  {
    #TODO
  },
];

describe('Recom Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear all recoms before getting recoms', () => {
    store.dispatch(actionCreators.GET_RECOMS_PRE());

    const newState = store.getState();
    expect(newState.recom.recomList.length).toBe(0);
  });

  it('should get all recoms when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubRecoms,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS())
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomList.length).toBe(2);
        done();
      })
      .catch();
  });

  it('should not get recoms when error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubRecoms,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS())
      .catch(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomList.length).toBe(0);
        done();
      });
  });
});
