import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Authorization from '../components/Registration/Authorization';
import ChannelsContainer from './Channels';

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  loaded: state.user.loaded
}))

export default class IndexContainer extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    authorized_user: PropTypes.object
  }

  render() {
    const {
      loaded,
      authorized_user
    } = this.props;

    if (!loaded) {
      return null;
    }

    return authorized_user.id
      ? <ChannelsContainer />
      : <Authorization />;
  }
}
