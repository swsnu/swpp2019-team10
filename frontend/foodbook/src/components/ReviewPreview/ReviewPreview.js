import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import propTypes from 'prop-types';
import {
  Rating, Card, Image, Icon,
} from 'semantic-ui-react';

import ReviewDetail from 'containers/ReviewDetail';

const ReviewPreview = (props) => {
  const {
    id, author, menu, image, rating, date, tag, isMine,
  } = props;

  const parseTagName = (tags) => {
    const positive = tags.filter((tagPositive) => tagPositive.sentimental === 1);

    const netural = tags.filter((tagNetural) => tagNetural.sentimental === 0);

    const negative = tags.filter((tagNegative) => {
      const score = tagNegative.sentimental;
      return score !== 0 && score !== 1;
    });

    const positives = positive.map((tagPositives) => tagPositives.name).join(', ');
    const negatives = negative.map((tagNegatives) => tagNegatives.name).join(', ');
    const neturals = netural.map((tagNetural) => tagNetural.name).join(', ');

    return (
      <span className="tags-wrapper">
        {positives.length !== 0
          ? (
            <div className="positive-tag">
              <Icon name="thumbs up" size="small" />
              {' '}
              <span className="positive" style={{ color: 'blue' }}>
                { positives }
              </span>
            </div>
          )
          : <span />}

        {negatives.length !== 0
          ? (
            <div className="negative-tag">
              <Icon name="thumbs down" size="small" />
              {' '}
              <span className="negative" style={{ color: 'red' }}>
                { negatives }
              </span>
            </div>
          )
          : <span />}

        {neturals.length !== 0
          ? (
            <div className="positive-tag">
              <Icon name="hand point right" size="small" />
              {' '}
              <span className="netural" style={{ color: 'grey' }}>
                { neturals }
              </span>
            </div>
          )
          : <span />}
      </span>
    );
  };

  return (
    <Card className="review-preview">
      <Image src={image} centered fluid />
      <Card.Content>
        <Card.Header>{menu}</Card.Header>
        <Card.Meta>
          <span className="date">{date}</span>
          <span className="rating">
            <Rating defaultRating={rating} maxRating="5" icon="star" disabled />
          </span>
        </Card.Meta>
        <Card.Description textAlign="left">
          <span className="tag">{ parseTagName(tag) }</span>
          <br />
          {isMine && (
          <ReviewDetail fixed={false} id={id} />
          )}

          {!isMine && (
          <span className="author-wrapper">
            {`Created by ${author}`}
          </span>
          )}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

ReviewPreview.propTypes = {
  id: propTypes.number,
  author: propTypes.string,
  menu: propTypes.string,
  image: propTypes.string,
  rating: propTypes.number,
  date: propTypes.string,
  tag: propTypes.arrayOf(Object),
  isMine: propTypes.bool,
};

ReviewPreview.defaultProps = {
  id: -1,
  author: 'cat',
  menu: 'cat',
  rating: 3,
  date: '2019-11-05',
  isMine: true,
  image: 'https://i.pinimg.com/474x/91/ec/7e/91ec7ec701884e2959643bf4b31d8ee8--cat-food-food-networktrisha.jpg',
  tag: [{ name: 'good', sentimental: 1 }, { name: 'bad', sentimental: -1 }, { name: 'netural', sentimental: 0 }],
};

export default ReviewPreview;
