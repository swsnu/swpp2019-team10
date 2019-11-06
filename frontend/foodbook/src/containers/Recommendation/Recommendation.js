import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Header, Image, Modal, Icon,
} from 'semantic-ui-react';

import RecommendationLocation from './Modal/RecommendLocation';
import RecommendationTag from './Modal/RecommendTag';
import RecommendationMenu from './Modal/RecommendMenu';
import RecommendationFriend from './Modal/RecommendFriend';

const preProcessingLocation = () => ({
  name: '치킨',
  map: 'http://127.0.0.1:8000/media/mocks/mockMap.png',
  reco_list: [
    {
      rank: 1,
      restaurant: '서울대학교 제2공학관식당',
      avgRating: 2.3,
      myRating: 4.5,
      friendsRating: undefined,
      explain: 'You rated here 4.5!',
      link: 'https://map.kakao.com/?q=서울대학교 제2공학관식당',
      reason: 'MYFAVORITE',
    },
    {
      rank: 2,
      restaurant: '텐카이핀 서울대지점',
      avgRating: 4.2,
      myRating: 3.1,
      friendsRating: 4.7,
      explain: 'Your Friend rated here 4.7!',
      link: 'https://map.kakao.com/?q=텐카이핀 서울대지점',
      reason: 'FRIENDFAVORITE',
    },
    {
      rank: 3,
      restaurant: '서울대학교 제3식당',
      avgRating: 3.8,
      myRating: undefined,
      friendsRating: 3.2,
      explain: undefined,
      link: 'https://map.kakao.com/?q=서울대학교 제3식당',
      reason: undefined,
    },
    {
      rank: 4,
      restaurant: '서울대학교 제1식당',
      avgRating: 3.6,
      myRating: 3.1,
      friendsRating: 3.2,
      explain: undefined,
      link: 'https://map.kakao.com/?q=서울대학교 제1식당',
      reason: undefined,
    },
    {
      rank: 5,
      restaurant: '서울대학교 자하연식당',
      avgRating: 2.3,
      myRating: 3.1,
      friendsRating: 1.6,
      explain: 'Your Friends rated here 1.6.',
      link: 'https://map.kakao.com/?q=서울대학교 제4식당',
      reason: 'FRIENDSHATE',
    },
    {
      rank: 6,
      restaurant: '서울대학교 제4식당',
      avgRating: 3.9,
      myRating: 2.0,
      friendsRating: 3.2,
      explain: 'You rated here 2.0.',
      link: 'https://map.kakao.com/?q=서울대학교 제4식당',
      reason: 'MYHATE',
    },
  ],
});
/*
    return object should be like:

    {
      menu(string): menu name,
      map(function): fucntion which takes input of menu information and returning searching results,
      reco_list(array): sorted array of searched restaurants
    }
  */


const preProcessingTag = () => {
  const reason = ['crispy', 'cheap'];
  const reviews = [
    {
      tag: reason[0],
      reviewsForTag: [
        {
          id: 101,
          author: 'swpp',
          menu: '감자칩',
          rating: 5,
          date: '2019-11-03',
          isMine: true,
          image: 'http://127.0.0.1:8000/media/mocks/potatoChip.jpg',
          tag: [{ name: 'crispy', sentimental: 1 }, { name: 'salty', sentimental: 1 }],
        },
        {
          id: 100,
          author: 'swpp',
          menu: '치킨',
          rating: 4,
          date: '2019-11-03',
          isMine: true,
          image: 'http://127.0.0.1:8000/media/mocks/chicken.jpeg',
          tag: [{ name: 'crispy', sentimental: 1 }, { name: 'hot', sentimental: -1 }],
        },
      ],
    },
    {
      tag: reason[1],
      reviewsForTag: [
        {
          id: 102,
          author: 'swpp',
          menu: '국밥',
          rating: 5,
          date: '2019-11-01',
          isMine: true,
          image: 'http://127.0.0.1:8000/media/mocks/gukBab.jpeg',
          tag: [{ name: 'cheap', sentimental: 1 }],
        },
        {
          id: 103,
          author: 'swpp',
          menu: '한강라면',
          rating: 4,
          date: '2019-11-03',
          isMine: true,
          image: 'http://127.0.0.1:8000/media/mocks/ramen.jpg',
          tag: [{ name: 'cheap', sentimental: 1 }, { name: 'meaty', sentimental: 0 }, { name: 'watery', sentimental: -1 }],
        },
      ],
    },
  ];

  return {
    reason,
    reviews,
  };
};

/*
  return object should be like:

  {
    reason(array of tag name): why user liked this food,
    reviews:
      [
        {
          tag(string): tag name for recommendation,
          reviewsForTag(array of review object): review for current tag
        },
        ...
      ],
  }
*/

const preProcessingMenu = (reviewDetail) => {
  const recentVisit = [
    {
      id: 105,
      author: 'swpp',
      menu: '치킨',
      rating: 4,
      date: '2019-11-07',
      isMine: true,
      image: 'http://127.0.0.1:8000/media/mocks/bbqChicken.jpg',
      tag: [{ name: 'satisfying', sentimental: 1 }, { name: 'oily', sentimental: 0 }],
    },
    {
      id: 106,
      author: 'swpp',
      menu: '치킨',
      rating: 3,
      date: '2019-11-08',
      isMine: true,
      image: 'http://127.0.0.1:8000/media/mocks/yangChicken.jpeg',
      tag: [{ name: 'cheap', sentimental: 1 }, { name: 'soggy', sentimental: -1 }],
    },
  ];

  const frequentVisit = [
    {
      id: 107,
      author: 'swpp',
      menu: '치킨',
      rating: 4,
      date: '2019-11-03',
      isMine: true,
      image: 'http://127.0.0.1:8000/media/mocks/gcovaChicken.jpg',
      tag: [{ name: 'soul food', sentimental: 1 }, { name: 'too spicy', sentimental: -1 }],
    },
    {
      id: 108,
      author: 'swpp',
      menu: '치킨',
      rating: 5,
      date: '2019-10-27',
      isMine: true,
      image: 'http://127.0.0.1:8000/media/mocks/geniousChicken.jpeg',
      tag: [{ name: 'crispy', sentimental: 1 }, { name: 'cheap', sentimental: 1 }],
    },
  ];

  return { recentVisit, frequentVisit };
};
/*
  return object should be like:

  {
    recentVisit(array of review object): reviews for recent visit,
    frequentVisit(array of review object): frequently visited restaurnat's review
  }
*/

const preProcessingFriend = () => [
  {
    id: 109,
    author: 'Dieter',
    menu: '치킨',
    rating: 4,
    date: '2019-10-28',
    isMine: false,
    image: 'http://127.0.0.1:8000/media/mocks/goobneChicken.jpg',
    tag: [{ name: 'healthy', sentimental: 1 }, { name: 'pricy', sentimental: -1 }],
  },
  {
    id: 110,
    author: 'Sweet Holic',
    menu: '치킨',
    rating: 5,
    date: '2019-11-03',
    isMine: true,
    image: 'http://127.0.0.1:8000/media/mocks/kyochonChicken.jpeg',
    tag: [{ name: 'sweet', sentimental: 1 }, { name: 'small', sentimental: -1 }],
  },
];
/*
  return object should be like:
    friendsReviews(array of review object): reviews for friend's favorite choice for given menu
*/

export class Recommendation extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  show = () => () => this.setState({ open: true })

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { trigger } = this.props;

    return (
      <div className="Recommendation-wrapper">
        <Button onClick={this.show()}> Trigger! </Button>
        <Modal open={open} dimmer="blurring" trigger={trigger} onClose={this.close}>
          <Modal.Header>Get Recommendation!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header> Choose One:  </Header>
              <RecommendationLocation data={preProcessingLocation()} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.close} inverted>
              <Icon name="checkmark" />
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

Recommendation.propTypes = {
  trigger: propTypes.string.isRequired,
};

export default Recommendation;
