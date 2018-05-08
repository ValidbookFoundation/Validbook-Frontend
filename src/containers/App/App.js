import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import config from '../../config';
import { logoutUser, getAuthUser } from '../../actions/user';
import { getCountSeenNotification } from '../../actions/profile';
import Header from '../../components/Header';

@asyncConnect([{
  promise: ({store: { dispatch }}) => {
    dispatch(showLoading());
  }
}])

@connect(
  state => ({
    authorized_user: state.user.authorized_user,
    loaded: state.user.loaded,
    bubbleCommon: state.profile.bubbleCommon,
    path: state.routing.locationBeforeTransitions.pathname
  }),
  {
    logoutUser,
    hideLoading,
    getCountSeenNotification,
    getAuthUser
  }
)
export default class App extends Component {
  static propTypes = {
    path: PropTypes.string,
    children: PropTypes.element,
    authorized_user: PropTypes.object,
    locationBeforeTransitions: PropTypes.object,
    logoutUser: PropTypes.func,
    hideLoading: PropTypes.func,
    loaded: PropTypes.bool,
    bubbleCommon: PropTypes.number,
    getCountSeenNotification: PropTypes.func,
    getAuthUser: PropTypes.func
  }

  componentDidMount() {
    const {
      authorized_user,
      getAuthUser,
      hideLoading,
      getCountSeenNotification
    } = this.props;

    if (!authorized_user.id) {
      getAuthUser();
    }
    
    if (authorized_user.id) {
      getCountSeenNotification(authorized_user.id);
    }

    hideLoading();

    this.favicon = document.getElementById('favicon');
  }

  componentWillReceiveProps(nextProps) {
    const { loaded, hideLoading, bubbleCommon, path } = nextProps;

    if (loaded) {
      hideLoading();
    }

    if (bubbleCommon > 0) {
      this.favicon.href = '/favicon-active.ico';
    } else if (~path.indexOf('arbitration')) {
      this.favicon.href = '/arbitration.ico';
    } else if (~path.indexOf('statements')) {
      this.favicon.href = '/signature.ico';
    } else if (~path.indexOf('wallet')) {
      this.favicon.href = '/wallet.ico';
    } else if (~path.indexOf('identity-page')) {
      this.favicon.href = '/identity.ico';
    } else if (~path.indexOf('chats')) {
      this.favicon.href = '/chat.ico';
    } else {
      this.favicon.href = '/Validson_Favicon_light_1.ico';
    }
  }

  headerRender = () => {
    const { path, authorized_user, logoutUser } = this.props;

    if ((path === '/' && !authorized_user.id) || path === '/authorize') {
      return null;
    }

    return (
      <Header
        authorized_user={authorized_user}
        logoutUser={logoutUser}
      />
    );
  }

  render() {
    const { children, bubbleCommon } = this.props;

    return (
      <div className="App">
        <Helmet
          titleTemplate={bubbleCommon > 0 ? `(${bubbleCommon}) %s` : '%s'}
          {...config.app.head}
        />

        {this.headerRender()}

        {children}
      </div>
    );
  }
}
