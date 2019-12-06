import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ReviewList from 'containers/ReviewList';

const categoryOptions = [
  {
    key: 'Chicken',
    text: 'Chicken',
    value: 'Chicken',
  },
  {
    key: 'Korean',
    text: 'Korean',
    value: 'Korean',
  },
  {
    key: 'Japenese',
    text: 'Japenese',
    value: 'Japenese',
  },
  {
    key: 'Chinese',
    text: 'Chinese',
    value: 'Chinese',
  },
  {
    key: 'Western',
    text: 'Western',
    value: 'Western',
  },
  {
    key: 'Fast food',
    text: 'Fast food',
    value: 'Fast food',
  },
];
export class Category extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Korean',
    };
  }

  render() {
    const { category } = this.state;

    return (
      <div className="Category">
        <Dropdown
          placeholder="Select Category"
          fluid
          selection
          options={categoryOptions}
          onChange={(event, data) => this.setState({ category: data.value })}
        />
        <h3 style={{ marginLeft: '25%' }}>
          {`Your Food history of ${category}`}
        </h3>
        <ReviewList category={category} />
      </div>
    );
  }
}

export default Category;
