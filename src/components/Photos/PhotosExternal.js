import React, { Component } from 'react';
import { PHOTOS } from '../../constants/photos';
import PhotosMenu from './PhotosMenu';
import './index.scss';

class PhotosExternal extends Component {
  render() {
    return (
      <div className="photos contents">

        <PhotosMenu />

        <div className="common-lists photos-lists">
          <div className="wrapper">

            {PHOTOS.map((photo, index) => (
              <div key={index} className="photos-img">
                <img src={photo.url} />
              </div>
            ))}

          </div>
          <h1>external</h1>
        </div>
      </div>
    );
  }
}

export default PhotosExternal;
