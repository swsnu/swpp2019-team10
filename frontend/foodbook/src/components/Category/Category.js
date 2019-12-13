import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import propTypes from 'prop-types';
import ReviewList from 'components/Layouts/Feed/Feed';


export class Category extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Korean',
    };
  }

  render() {
    const { category } = this.state;
    const { friendId } = this.props;

    return (
      <div className="Category">
        <Dropdown
          placeholder="Select Category"
          fluid
          selection
          options={
            ['Chicken', 'Pizza', 'Korean', 'Chinese', 'Japanese',
              'Western', 'Fastfood', 'Dessert', 'Snack', 'Asian'].map((str) => ({
              key: str,
              text: str,
              value: str.toLowerCase(),
            }))
          }
          onChange={(event, data) => this.setState({ category: data.value })}
        />
        <h3>
          {`Your Food history of ${category}`}
        </h3>
        <ReviewList friendId={friendId} category={category} />
      </div>
    );
  }
}

Category.propTypes = {
  friendId: propTypes.number,
};

Category.defaultProps = {
  friendId: -1,
};

export default Category;
