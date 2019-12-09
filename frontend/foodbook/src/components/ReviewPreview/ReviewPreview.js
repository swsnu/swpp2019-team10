import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import propTypes from 'prop-types';
import './ReviewPreview.css';
import {
  Rating, Card, Image,
} from 'semantic-ui-react';
import ReviewDetail from 'containers/ReviewDetail';

const ReviewPreview = (props) => {
  const {
    id, author, menu, image, rating, date, tag, isMine,
  } = props;

  const parseTagName = (tags) => {
    const parsed = tags.map((t, i) => {
      let className;
      if (t.sentimental === 0) className = `neu ${i}`;
      else if (t.sentimental === 1) className = `pos ${i}`;
      else className = `neg ${i}`;

      return (
        <span key={`${t.name}Wrapper`} className={className}>
          {`${t.name} `}
        </span>
      );
    });

    return (
      <span className="tags-wrapper">
        {parsed}
      </span>
    );
  };

  return (
    <Card className="review-preview">
      <Image src={image} width="240px" height="160px" centered />
      <Card.Content>
        <Card.Header>{menu}</Card.Header>
        <Card.Meta>
          <span className="date">{date}</span>
          <span className="rating">
            <Rating defaultRating={rating} maxRating="5" icon="star" />
          </span>
        </Card.Meta>
        <Card.Description>
          <span className="tag">{parseTagName(tag) }</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {isMine && (
        <ReviewDetail fixed={false} id={id} />
        )}

        {!isMine && (
        <span className="author-wrapper">
          {`Created by ${author}`}
        </span>
        )}
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
