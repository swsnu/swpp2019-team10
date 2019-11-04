import axios from 'axios';
import { getMockReviewStore } from 'test-utils/mock';
import * as actionCreators from './action_review';

const stubReviews = [
  {
    id: 1,
    author: 'React',
    restaurant: '301',
    menu: 'ChickenMayo',
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
    content: 'Yummy',
    image: 'https://semantic-ui.com/images/logo.png',
    rating: 4,
    date: '2019-11-07', // should be provided this form
    tag: {}, // TODO: should decide first.
  },
];

const initialState = {
  reviewList: stubReviews,
  reviewDetail: {
    id: -1,
    author: '',
    restaurant: '',
    menu: '',
    content: '',
    image: '',
    rating: -1,
    date: '0000-00-00',
    tag: {},
  },
};

let store = getMockReviewStore(initialState);

describe('Review Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
    store = getMockReviewStore(initialState);
  });

  it('should clear all reviews before getting reviews', () => {
    store.dispatch(actionCreators.GET_REVIEWS_PRE)
      .then((done) => {
        const newState = store.getState();
        expect(newState.review.reviewList.length).toBe(0);
        done();
      })
      .catch();
  });

  it('should get all reviews when no error', () => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: stubReviews,
        };
        res(result);
      }));

    store.dispatch(actionCreators.getArticles())
      .then((done) => {
        const newState = store.getState();
        expect(spy).hasBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(2);
        done();
      });
  });

  it('should not get reviews when error', () => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((res, rej) => {
        const result = {
          status: 404,
          data: stubReviews,
        };
        rej(result);
      }));

    store.dispatch(actionCreators.getArticles())
      .then((done) => {
        const newState = store.getState();
        expect(spy).hasBeenCalledTimes(1);
        expect(newState.review.reviewList.length).toBe(0);
        done();
      });
  });
});
