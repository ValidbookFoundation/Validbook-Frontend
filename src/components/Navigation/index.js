import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import NavigationUserInfo from './NavigationUserInfo';
import {
  followrequested_user, 
  unfollowrequested_user
} from '../../actions/user';
import './index.scss';

@connect(null, {
  followrequested_user,
  unfollowrequested_user,
})

export default class Navigation extends Component {
  static propTypes = {
    small_subheader: PropTypes.bool,
    requested_user: PropTypes.object,
    authorized_user: PropTypes.object,
    followrequested_user: PropTypes.func,
    unfollowrequested_user: PropTypes.func
  }

  onLinkClick = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 236) {
      window.scrollTo(0, 237);
    }
  }

  follow = (id) => {
    this.props.followrequested_user(id);
  };

  unfollow = (id) => {
    this.props.unfollowrequested_user(id);
  };

  navigationButtonsRender = () => {
    const { requested_user, authorized_user } = this.props;

    if (!requested_user.id || !authorized_user.id) {
      return null;
    }

    if (authorized_user.id && authorized_user.id !== requested_user.id) {
      return (
        <div className="buttons_container">
          <div
            className="btn-following btn-message"
            onClick={() => this.openConversation(requested_user.id, requested_user)}
          >
            <Link // to="/messages/new"
            >
              <div>Chat<i/></div>
            </Link>
          </div>
          <div
            className="btn-following"
            onClick={requested_user.is_follow
              ? () => this.unfollow(requested_user.id)
              : () => this.follow(requested_user.id)
            }>
            <div style={{color: requested_user.is_follow ? '#999' : '#333'}}>
              {requested_user.is_follow ? 'Following' : 'Follow'}
            </div>
            <span/>
          </div>
        </div>
      );
    }

    if (authorized_user.id && authorized_user.id === requested_user.id) {
      return (
        <div
          className="btn-following edit_profile">
          <Link to="/settings">
            Settings
          </Link>
        </div>
      );
    }
  }

  render() {
    const {first_name, last_name, slug, avatar32, cover} = this.props.requested_user;
    const {authorized_user, small_subheader, requested_user} = this.props;
    
    return (
      <div
        className={'navigation' + (small_subheader ? ' navigation-fixed' : '')}
        style={{boxShadow: requested_user.id ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : 'none'}}
      >
        {requested_user.id
          ? <div className="wrapper-navigation">
            <NavigationUserInfo
              user_name={`${first_name} ${last_name}`}
              avatar={avatar32}
              display_user={small_subheader ? 'navigation-infouser' : 'navigation-infouser-none'}
            />
  
            <div
              onClick={() => this.onLinkClick()}
              className="navigation-wrap"
              style={{borderColor: cover && cover.color ? `#${cover.color}` : '#1976d2'}}
            >
              <Link
                to={`/${slug}`}
                activeClassName="active"
                onlyActiveOnIndex={true}
              >
                Storyline
              </Link>
              <Link
                to={`/${slug}/books`}
                activeClassName="active"
              >
                Books
              </Link>
              <Link
                to={`/${slug}/relations`}
                activeClassName="active"
              >
                Relations
              </Link>
              <Link
                to={`/${slug}/photos`}
                activeClassName="active"
              >
                Photos
              </Link>
              <Link
                to={`/${slug}/documents`}
                activeClassName="active"
              >
                Desk
              </Link>
            </div>
  
            {this.navigationButtonsRender()}
          </div>
          : null
        }
      </div>
    );
  }
}
