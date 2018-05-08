import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import { TextField, FontIcon } from 'react-md';
import Logo from './Logo';
import SearchField from './SearchField';
import UserButtons from './UserButtons';
import Apps from './Apps';
import './index.scss';

@connect((state) => ({
  loaded: state.user.loaded,
  notifications: state.profile.notifications,
  loadingBar: state.loadingBar,
  path: state.routing.locationBeforeTransitions.pathname,
}))

export default class Header extends Component {  
  static propTypes = {
    authorized_user: PropTypes.object,
    loadingBar: PropTypes.number,
    loaded: PropTypes.bool,
    path: PropTypes.string,
    notifications: PropTypes.array,
    logoutUser: PropTypes.func
  }

  buttonsRender = () => {
    const { authorized_user, loaded } = this.props;

    if (!loaded) {
      return null;
    }

    if (authorized_user.id) {
      return (
        <UserButtons
          logoutUser={this.props.logoutUser}
          authorized_user={this.props.authorized_user}
          notifications={this.props.notifications}
        />
      );
    }

    return (
      <div className="header_auth_buttons">
        <Link to="/registration/easy" >
          <button className="sign_up_button">Sign Up</button>
        </Link>
        <Link to="/account/auth" >
          <button className="sign_in_button">Sign In</button>
        </Link>
      </div>
    );
  }

  searchFieldRender = () => {
    const { path } = this.props;

    if (~path.indexOf('wallet')) {
      return (
        <h1 className="validbook_app">Wallet</h1>
      );
    } else if (~path.indexOf('statements')) {
      return (
        <h1 className="validbook_app">Statements</h1>
      );
    } else if (~path.indexOf('identity-page')) {
      return (
        <h1 className="validbook_app">Identity</h1>
      );
    } else if (~path.indexOf('arbitration')) {
      return (
        <h1 className="validbook_app">Arbitration</h1>
      );
    }
    
    return <SearchField />;
  }

  render() {
    const { path, loadingBar } = this.props;

    return (
      <div className="header_container">
        <div 
          className="header_content"
          style={{
            width: (path === '/' || ~path.indexOf('channel')) ? '1070px' : '1130px'
          }}
        >
          <div className="loading_bar_container" style={{opacity: loadingBar}}>
            <LoadingBar 
              style={{
                backgroundColor: '#2887D2',
                height: '2px',
                top: 0,
                left: 0,
                transition: 'transform 300ms ease 0s'
              }}
            />
          </div>

          <Logo/>

          {this.searchFieldRender()}

          {this.buttonsRender()}
        </div>
      </div>
    );
  }
}
