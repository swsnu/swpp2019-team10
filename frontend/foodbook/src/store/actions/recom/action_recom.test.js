import axios from 'axios';
import store from 'store/store';
import * as actionCreators from './action_recom';

const stubRecoms = [
  {
    name: 'TEST_RES_1',
    longitude: 37.5,
    latitude: 126.49,
    rating: 3,
  },
  {
    name: 'TEST_RES_2',
    longitude: 37.8,
    latitude: 126.5,
    rating: 5,
  },
];

describe('Recom Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear all recoms before getting recoms', () => {
    store.dispatch(actionCreators.GET_RECOMS_PRE());

    const newState = store.getState();
    expect(newState.recom.recomlocList.length).toBe(0);
    expect(newState.recom.recomtstList.length).toBe(0);
  });

  it('should get all recom_locs when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubRecoms,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS_LOC({ id: 1, lat: 37.5, log: 126.95 }))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomlocList.length).toBe(2);
        done();
      })
      .catch();
  });

  it('should not get recom_locs when error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubRecoms,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS_LOC({ id: 1, lat: 37.5, log: 126.95 }))
      .catch(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomlocList.length).toBe(0);
        done();
      });
  });

  it('should get all recom_tsts when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubRecoms,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS_TST({ id: 1, lat: 37.5, log: 126.95 }))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomtstList.length).toBe(2);
        done();
      });
  });

  it('should not get recom_tsts when error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubRecoms,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS_TST({ id: 1, lat: 37.5, log: 126.95 }))
      .catch(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomtstList.length).toBe(0);
        done();
      });
  });
  it('should get all recom_tsts when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubRecoms,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS_IFH({ lat: 37.5, log: 126.95 }))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomtstList.length).toBe(2);
        done();
      })
      .catch();
  });
  it('should not get recom_tsts when error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubRecoms,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.GET_RECOMS_IFH({ lat: 37.5, log: 126.95 }))
      .catch(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.recom.recomtstList.length).toBe(0);
        done();
      });
  });
});
