import axios from 'axios';
import store from 'store/store';
import * as actionCreators from './action_review';

const stubReviews = [
  {
    id: 1,
    author: 'React',
    restaurant: '301',
    menu: 'ChickenMayo',
    category: 'Chicken',
    content: 'It sucks',
    image: 'https://cdn.auth0.com/blog/react-js/react.png',
    rating: 1,
    date: '2019-11-05', // should be provided this form
    tag: {}, // TODO: should decide first.
  },
  {
    id: 2,
    author: 'Semantic UI',
    restaurant: '302',
    menu: 'Galbitang',
    category: 'Korean',
    content: 'Yummy',
    image: 'https://semantic-ui.com/images/logo.png',
    rating: 4,
    date: '2019-11-07', // should be provided this form
    tag: {}, // TODO: should decide first.
  },
];

describe('Review Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear all reviews before getting reviews', () => {
    store.dispatch(actionCreators.GET_REVIEWS_PRE());

    const newState = store.getState();
    expect(newState.review.reviewList.length).toBe(0);
  });

  it('should get all reviews when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubReviews,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_REVIEWS())
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(2);
        done();
      })
      .catch();
  });

  it('should not get reviews when error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubReviews,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.GET_REVIEWS())
      .catch(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(0);
        done();
      });
  });

  it('should clear review detail before getting review', () => {
    store.dispatch(actionCreators.GET_REVIEW_PRE());

    const newState = store.getState();
    expect(newState.review.reviewDetail).toStrictEqual({});
  });

  it('should post review twice without error when image', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 201,
          data: stubReviews[0],
        };
        res(result);
      }));
    store.dispatch(actionCreators.POST_REVIEW(stubReviews[0], true))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(2);
        expect(newState.review.reviewList.length).toBe(1);
        done();
      })
      .catch();
  });
  it('should post review once without error when no image', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 201,
          data: stubReviews[0],
        };
        res(result);
      }));
    store.dispatch(actionCreators.POST_REVIEW(stubReviews[0], false))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(2);
        done();
      })
      .catch();
  });

  it('should edit review without error', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 201,
          data: stubReviews[0],
        };
        res(result);
      }));
    store.dispatch(actionCreators.EDIT_REVIEW(stubReviews[0], false))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(2);
        done();
      })
      .catch();
  });

  it('should get all restaurant reviews when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubReviews,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_RESTAURANT_REVIEWS(1))
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewRestaurantList.length).toBe(2);
        done();
      })
      .catch();
  });

  it('should not get restaurant reviews when error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubReviews,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.GET_RESTAURANT_REVIEWS(1))
      .catch(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewRestaurantList.length).toBe(0);
        done();
      });
  });

  it('should clear all reviews before getting friend reviews', () => {
    store.dispatch(actionCreators.GET_FRIEND_REVIEWS_PRE());

    const newState = store.getState();
    expect(newState.review.reviewList.length).toBe(0);
  });

  it('should get all friend reviews when no error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubReviews,
        };
        res(result);
      }));

    store.dispatch(actionCreators.GET_FRIEND_REVIEWS())
      .then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(2);
        done();
      })
      .catch();
  });
});
