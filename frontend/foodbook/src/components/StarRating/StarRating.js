// from https://codepen.io/depy/details/EQoGeG/

import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Grid,
} from 'semantic-ui-react';

function Star(props) {
  const {
    onMouseEnter, onMouseLeave, onClick, value,
  } = props;
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
      {/* eslint-disable global-require */
      value === -1 ? <img src={require('images/empty_star.png')} width={50} alt="star" />
        : <img src={require('images/star.png')} width={50} alt="star" />
        /* eslint-enable global-require */
      }
    </div>
  );
}

Star.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.number,
};

Star.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onClick: () => {},
  value: 0,
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
      _.fill(hoverRatedStars, 0, currentRating, i + 1);
      this.setState({ stars: hoverRatedStars });
    } else {
      const hoverStars = Array(5).fill(-1);
      _.fill(hoverStars, 0, 0, i + 1);
      this.setState({ stars: hoverStars });
    }
  }

  handleMouseOut() {
    const { rated: currentRating, stars } = this.state;
    const resetStars = stars.slice();

    if (currentRating > 0) {
      _.fill(resetStars, -1, currentRating, resetStars.length);
      this.setState({ stars: resetStars });
    } else {
      _.fill(resetStars, -1, 0, resetStars.length);
      this.setState({ stars: resetStars });
    }
  }

  handleClick(i) {
    const { stars } = this.state;
    const clickedStar = stars.slice();

    _.fill(clickedStar, 1, 0, i);
    _.fill(clickedStar, 1, i, clickedStar.length);

    this.setState({
      stars: clickedStar,
      rated: i + 1,
    });

    const { onChange } = this.props;
    onChange(i + 1);
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
    return (
      <div className="star-rating">
        <div className="star-rating-stars">
          <Grid columns={5} divided>
            <Grid.Column>{this.renderStar(0)}</Grid.Column>
            <Grid.Column>{this.renderStar(1)}</Grid.Column>
            <Grid.Column>{this.renderStar(2)}</Grid.Column>
            <Grid.Column>{this.renderStar(3)}</Grid.Column>
            <Grid.Column>{this.renderStar(4)}</Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

StarRating.propTypes = {
  onChange: PropTypes.func,
};

StarRating.defaultProps = {
  onChange: () => {},
};

export default StarRating;
