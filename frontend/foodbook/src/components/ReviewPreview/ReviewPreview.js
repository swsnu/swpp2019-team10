import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ReviewPreview.css';
import { Rating } from 'semantic-ui-react';

const ReviewPreview = (props) => {
  const {
    id, author, menu, image, rating, date, tag, isMine,
  } = props;

  const parseTagName = (tags) => {
    const parsed = tags.map((t, i) => (
      <span key={`${t.name}Wrapper`} className={t.positive ? `pos ${i}` : `neg ${i}`}>
        {t.name}
      </span>
    ));

    return parsed ? (
      <div className="tags-wrapper" style={{ display: 'inline' }}>
        {parsed}
      </div>
    ) : false;
  };

  return (
    <div className="review-preview">
      <div className="ui special cards">
        <div className="card" style={{ width: '630px' }}>
          <div className="content">
            <span className="header">{ menu }</span>
            <span className="date-wrapper">{ date }</span>
            <div className="meta">
              <span className="rating">
                Rating:
                <Rating defaultRating={rating} maxRating="5" icon="star" />
              </span>
              <span className="tag">{parseTagName(tag)}</span>
            </div>
          </div>
          <div className="blurring dimmable image">
            <img src={image} alt="food img" />
          </div>

          <div className="extra content">
            {isMine && (
            <NavLink to={`/main/${id}`}>
                        Read Detail & Get Recommendation!
            </NavLink>
            )}

            {!isMine && (
            <span className="author-wrapper">
              {`Created by ${author}`}
            </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewPreview.propTypes = {
  id: propTypes.number.isRequired,
  author: propTypes.string.isRequired,
  menu: propTypes.string.isRequired,
  image: propTypes.string,
  rating: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  tag: propTypes.arrayOf(Object),
  isMine: propTypes.bool.isRequired,
};

ReviewPreview.defaultProps = {
  id: -1,
  key: 99,
  author: "cat",
  menu: "cat",
  rating: 3,
  date: "2019-11-05",
  isMine: true,
  image: 'https://i.pinimg.com/474x/91/ec/7e/91ec7ec701884e2959643bf4b31d8ee8--cat-food-food-networktrisha.jpg',
  tag: [{ name: 'good', positive: true }, { name: 'bad', positive: false }],
};

export default ReviewPreview;
