import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ReviewPreview.css';
import { Rating } from 'semantic-ui-react';
import ClickToEdit from 'react-click-to-edit';

const ReivewPreview = (props) => {
  const cardSize = {
    width: '700px',
  };

  const parseTagName = (tags) => tags.map((tag, i) => (
      <ClickToEdit key={`tag${i*i*i+1}`} wrapperClass={tag.positive ? 'pos ' + i : 'neg ' + i} inputClass={tag.positive ? 'pos ' + i : 'neg ' + i} textClass={tag.positive ? 'pos ' + i : 'neg ' + i} value={tag.name} style={{display: "inline"}} endEditing={(e) => {console.log(e)}}>
        <span key={`tag${i * i}`} className={tag.positive ? 'pos ' + i : 'neg ' + i}>
            {tag.name}
        </span>
    </ClickToEdit>
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
                Rating: <Rating maxRating="5" icon="star"></Rating>
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
