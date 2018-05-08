import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthUser, loginDrive } from '../../actions/user';
import Authorization from '../Registration/Authorization';

@connect((state) => ({
  path: state.routing.locationBeforeTransitions.pathname,
  authorized_user: state.user.authorized_user,
  loaded: state.user.loaded
}), {
  getAuthUser,
  loginDrive
})

class OAuth extends Component {
  componentDidMount() {
    const { authorized_user, getAuthUser, loaded, loginDrive, location } = this.props;
    if (authorized_user.id && loaded) {
      loginDrive(location.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { authorized_user, loaded, location, loginDrive } = nextProps;

    if (authorized_user.id && loaded) {
      loginDrive(location.query)
        .then(response => window.open(response.data.redirect, '_self'));
    } else if (!authorized_user.id && loaded) {
      console.log('unauth');
    }
  }

  authFormRender = () => {
    const { authorized_user, loaded } = this.props;

    if (!authorized_user.id && loaded) {
      return (
        <Authorization />
      );
    }
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return this.authFormRender();
  }
}

export default OAuth;
