import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ReviewPreview.css';

const ReivewPreview = (props) => {
  const cardSize = {
    width: '700px',
  };

  const drawStars = (num) => {
    let str = '';
    for (let i = 0; i < num; i += 1) str += '★';
    for (let i = 0; i < 5 - num; i += 1) str += '☆';

    return str;
  };

  const parseTagName = (tags) => tags.map((tag, i) => (
    <span key={`tag${i * i}`} className={tag.positive ? 'pos' : 'neg'}>
      {tag.name}
    </span>
  ));

  const {
    name, rating, tag, imgUrl,
  } = props; // TODO: this is mock

  return (
    <div className="review-preivew">
      <div className="ui special cards">
        <div className="card" style={cardSize}>
          <div className="content">
            <span className="header">{ name }</span>
            <div className="meta">
              <span className="rating">
                Rating:
                {drawStars(rating)}
              </span>
              <span className="tag">{parseTagName(tag)}</span>
            </div>
          </div>
          <div className="blurring dimmable image">
            <img src={imgUrl} alt="food img" />
          </div>
          <div className="extra content">
            <NavLink to="/recommendation">
                        Read Detail & Get Recommendation!
              {/* FIXME: Not Yet Implemented */}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

ReivewPreview.propTypes = {
  name: propTypes.string.isRequired,
  rating: propTypes.number.isRequired,
  tag: propTypes.objectOf(Array).isRequired,
  imgUrl: propTypes.string.isRequired,
};

export default ReivewPreview;
