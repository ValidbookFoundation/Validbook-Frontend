import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllUserPhotos
} from '../../actions/photo';
import ShowAvatar from '../Popup/ShowAvatar';
import './index.scss';

@connect(state => ({
  requested_user: state.user.requested_user,
  path: state.routing.locationBeforeTransitions.pathname,
  all_photos: state.photo.all_photos,
  pagination: state.photo.pagination.all_photos
}), {
  getAllUserPhotos
})

class Photos extends Component {
  static propTypes = {
    requested_user: PropTypes.object,
    all_photos: PropTypes.array,
    getAllUserPhotos: PropTypes.func,
    pagination: PropTypes.number
  }

  state = {
    show_picture: null
  }

  componentDidMount() {
    const { pagination, requested_user, getAllUserPhotos } = this.props;

    if (pagination === 1 && requested_user.id) {
      getAllUserPhotos(requested_user.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pagination, requested_user, getAllUserPhotos } = this.props;

    if (pagination === 1 && (requested_user.id || nextProps.requested_user.id)) {
      getAllUserPhotos(nextProps.requested_user.id);
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
    const { all_photos } = this.props;

    return (
      <div className="common-lists photos-lists">
        {all_photos.filter(photo => photo.picture_small).map((photo, index) => (
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
            {/* <img src={photo.picture_small}/> */}
          </div>
        ))}
        {this.showPictureRender()}
      </div>
    );
  }
}

export default Photos;
