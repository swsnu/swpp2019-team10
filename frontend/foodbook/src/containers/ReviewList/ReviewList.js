import React, { Component } from 'react';
import ReviewPreview from 'components/ReviewPreview/';

export default class ReviewList extends Component {
  render() {
    return (
      <div>
        <div className="ui special cards fluid">
          <div className="card fluid" style={{width: "630px"}}>
            <div className="content">
              <br />
              <ReviewPreview
                key="1"
                imgUrl="https://www.yellowblissroad.com/wp-content/uploads/2015/07/lemon-chicken-fb.jpg"
                name="chicken"
                rating={3}
                tag={[{ name: 'crispy', positive: true }, { name: 'pricy', positive: false }]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
