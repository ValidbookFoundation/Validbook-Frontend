import React, { Component } from 'react';

class PostContent extends Component {
  getSize = (length, key, orientation = null) => {
    switch (length) {
      case 2:
      case 4: {
        return 253;
      }

      case 3: {
        if (+key === 0) {
          return 338;
        }

        return 168;
      }

      case 5: {
        if (+key === 0 || +key === 1) {
          return 253;
        }

        return 168;
      }
    }
  }

  imagesRender = () => {
    const { images } = this.props;

    if (!images) {
      return null;
    }
    const images_length = images.length;

    if (images.length === 1) {
      const image = images[0];
      return (
        <div
          className="content-gallery-image"
        >
          <img src={image.picture_small}/>
        </div>
      );
    }

    if (images_length !== 3) {
      return (
        images.map((image, index) => (
          <div
            key={index}
            className="content-gallery-image"
            style={{
              background: `url(${image.picture_small}) no-repeat center center`,
              width: this.getSize(images_length, index),
              height: this.getSize(images_length, index)
            }}
          />
        ))
      );
    }

    const first_photo = images[0];
    const second_photo = images[1];
    const third_photo = images[2];
    return (
      <div className="three_photos_container">
        <div className="first_photo">
          <div
            className="content-gallery-image"
            style={{
              background: `url(${first_photo.picture_small}) no-repeat center center`,
              width: this.getSize(images_length, 0),
              height: this.getSize(images_length, 0)
            }}
          />
        </div>
        <div className="right_column">
          <div
            className="content-gallery-image"
            style={{
              background: `url(${second_photo.picture_small}) no-repeat center center`,
              width: this.getSize(images_length, 1),
              height: this.getSize(images_length, 1)
            }}
          />
          <div
            className="content-gallery-image"
            style={{
              background: `url(${third_photo.picture_small}) no-repeat center center`,
              width: this.getSize(images_length, 2),
              height: this.getSize(images_length, 2)
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { text, images } = this.props;

    return (
      <div className="post-content">
        <div className="wrap-post-content">
          <div
            className="post-content-type-text"
            dangerouslySetInnerHTML={{__html: text}}
          />


          <div className="post-content-type-gallery">
            {this.imagesRender()}
          </div>
        </div>
      </div>
    );
  }
}

export default PostContent;
