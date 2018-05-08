import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cutaway from './Сutaway';
import Photos from './Photos';
import Peoples from './Peoples';
import './index.scss';

@connect(state => ({
  loaded_people: state.follow.loaded,
  loaded_photos: state.photo.loaded
}))

class InfoBlocks extends Component {
  static propTypes = {
    requested_user: PropTypes.object,
    requested_user_profile: PropTypes.object,
    followers: PropTypes.shape({
      users: PropTypes.array
    }),
    following: PropTypes.shape({
      users: PropTypes.array
    }),
    people: PropTypes.array
  }

  cutawayRender = () => {
    const {
      requested_user_profile,
      authorized_user,
      requested_user
    } = this.props;

    if (!requested_user_profile.user_id) {
      return null;
    }

    return (
      <Cutaway
        authorized_user={authorized_user}
        requested_user={requested_user}
        requested_user_profile={requested_user_profile}
      />
    );
  }

  photosRender = () => {
    const {
      photos,
      requested_user,
      requested_user_profile,
      loaded_people,
      loaded_photos
    } = this.props;

    if (!requested_user_profile.user_id || !loaded_photos) {
      return null;
    }

    return (
      <Photos
        requested_user={requested_user}
        photos={photos}
      />
    );
  }

  peopleRender = () => {
    const {
      following,
      followers,
      people,
      requested_user,
      requested_user_profile,
      loaded_photos,
      loaded_people
    } = this.props;

    if (!requested_user_profile.user_id || !loaded_photos || !loaded_people.loadedPeopleBlock) {
      return null;
    }

    return (
      <Peoples
        following={following}
        followers={followers}
        people={people}
        requested_user={requested_user}
      />
    );
  }

  render() {
    return (
      <div className="infobloks">
        {this.cutawayRender()}
        {this.photosRender()}
        {this.peopleRender()}
      </div>
    );
  }
}

export default InfoBlocks;
