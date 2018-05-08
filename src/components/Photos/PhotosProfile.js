import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProfilePhotos
} from '../../actions/photo';
import ShowAvatar from '../Popup/ShowAvatar';
import './index.scss';

@connect(state => ({
  requested_user: state.user.requested_user,
  path: state.routing.locationBeforeTransitions.pathname,
  profile_photos: state.photo.profile_photos,
  pagination: state.photo.pagination.profile_photos
}), {
  getProfilePhotos
})

class PhotosProfile extends Component {
  static propTypes = {
    requested_user: PropTypes.object,
    profile_photos: PropTypes.array,
    getProfilePhotos: PropTypes.func,
    pagination: PropTypes.number
  }

  state = {
    show_picture: null
  }

  componentDidMount() {
    const { pagination, requested_user, getProfilePhotos } = this.props;
    
    if (pagination === 1 && requested_user.id) {
      getProfilePhotos(requested_user.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pagination, requested_user, getProfilePhotos } = this.props;
    
    if (pagination === 1 && (requested_user.id || nextProps.requested_user.id)) {
      getProfilePhotos(nextProps.requested_user.id);
    }
  }
  
  openPicture = (url) => {
    this.setState({
      show_picture: url
    });
  }

  closeModal = () => {
    this.setState({
      show_picture: null
    });
  }

  showPictureRender = () => {
    const { show_picture } = this.state;

    if (!show_picture) {
      return null;
    }

    return (
      <ShowAvatar
        showModal={!!show_picture}
        avatar={show_picture}
        closeModalHandler={this.closeModal}
      />
    );
  }

  render() {
    const { profile_photos } = this.props;
    
    return (
      <div className="common-lists photos-lists">
        {profile_photos.filter(photo => photo.picture_small).map((photo, index) => (
          <div
            key={index}
            className="photo"
            onClick={() => this.openPicture(photo.picture_original)}
          >
            <div
              style={{
                background: `url(${photo.picture_small}) no-repeat center center`,
                width: 221,
                height: 221
              }}
            />
            {/* <img src={photo.url} /> */}
          </div>
        ))}
        {this.showPictureRender()}
      </div>
    );
  }
}

export default PhotosProfile;
