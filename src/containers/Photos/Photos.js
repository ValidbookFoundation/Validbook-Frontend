import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import PhotosMenu from '../../components/Photos/PhotosMenu';
import './photos.scss';

@connect((state) => ({
  requested_user: state.user.requested_user
}))

export default class PhotosContainer extends Component {

  render() {
    const {requested_user, small_subheader} = this.props;
    const helmet_title = requested_user.first_name && requested_user.last_name
    ? `${requested_user.first_name} ${requested_user.last_name} - Photos`
    : 'Photos';

    return (
      <div className="user_photos_container">
        <Helmet
          title={helmet_title}
        />
        <PhotosMenu 
          small_subheader={small_subheader}
        />
        
        <div className="user_photos">
          {this.props.children}
        </div>
      </div>
    );
  }
}

PhotosContainer.propTypes = {
  children: PropTypes.element,
  requested_user: PropTypes.object,
  small_subheader: PropTypes.bool
};
