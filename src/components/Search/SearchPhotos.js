import React, { Component } from 'react';
import {PHOTOS} from '../../constants/photos';
import './index.scss';

class SearchPhotos extends Component {
  render() {
    return (
      <div className="photos page-bg">

        <div className="photos-lists">
          <div className="wrapper">

            {PHOTOS.map((photo, index) => (
              <div key={index} className="photos-img">
                <img src={photo.url} />
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

export default SearchPhotos;
