// from https://codepen.io/depy/details/EQoGeG/

import PropTypes from 'prop-types';
import React, { Component } from 'react';

function Star(props) {
  const { onMouseEnter, onMouseLeave, onClick } = props;
  return (
    <div
      className="Star"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={() => { }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <i className="fas fa-star" />
    </div>
  );
}

Star.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
};

Star.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onClick: () => {},
};

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: Array(5).fill(-1),
      rated: 0,
    };
  }

  handleMouseOver(i) {
    const { rated: currentRating, stars } = this.state;

    if (currentRating > 0) {
      const hoverRatedStars = stars.slice();
      Array.fill(hoverRatedStars, 0, currentRating, i);
      this.setState({ stars: hoverRatedStars });
    } else {
      const hoverStars = Array(5).fill(-1);
      Array.fill(hoverStars, 0, 0, (i + 1));
      this.setState({ stars: hoverStars });
    }
  }

  handleMouseOut() {
    const { rated: currentRating, stars } = this.state;
    const resetStars = stars.slice();

    if (currentRating > 0) {
      Array.fill(resetStars, -1, currentRating, resetStars.length);
      this.setState({ stars: resetStars });
    } else {
      Array.fill(resetStars, -1, 0, resetStars.length);
      this.setState({ stars: resetStars });
    }
  }

  handleClick(i) {
    const { stars } = this.state;
    const clickedStar = stars.slice();

    Array.fill(clickedStar, 1, 0, i);
    Array.fill(clickedStar, 1, i, clickedStar.length);

    this.setState({
      stars: clickedStar,
      rated: i,
    });
  }

  renderStar(i) {
    const { stars, rated } = this.state;
    return (
      <Star
        position={i}
        value={stars[i]}
        rated={rated}
        onMouseEnter={() => this.handleMouseOver(i)}
        onMouseLeave={() => this.handleMouseOut()}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const { rated } = this.state;
    return (
      <div className="star-rating">
        <div className="star-rating-stars">
          {this.renderStar(1)}
          {this.renderStar(2)}
          {this.renderStar(3)}
          {this.renderStar(4)}
          {this.renderStar(5)}
        </div>

        {this.handleRating(rated)}
      </div>
    );
  }
}

export default StarRating;
