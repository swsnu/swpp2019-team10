import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ReviewList from 'containers/ReviewList';


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
        <h3 style={{ marginLeft: '25%' }}>
          {`Your Food history of ${category}`}
        </h3>
        <ReviewList category={category} />
      </div>
    );
  }
}

export default Category;
