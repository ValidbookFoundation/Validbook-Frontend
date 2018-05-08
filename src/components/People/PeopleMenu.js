import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './index.scss';

@connect((state) => ({
  requested_user: state.user.requested_user,
  authorized_user_id: state.user.authorized_user.id
}))

export default class PeopleMenu extends Component {
  render() {
    const {small_subheader, authorized_user_id} = this.props;
    const {slug} = this.props.requested_user;
    const requested_user_id = this.props.requested_user.id;

    return (
      <div 
        className="sidebar"
        style={{
          position: small_subheader ? 'fixed' : null,
          top: small_subheader ? 118 : null
        }}
      >
        <ul>
          <Link onlyActiveOnIndex={true} to={`/${slug}/relations`} activeClassName="active">
            <li>Identity Support</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/relations/following`} activeClassName="active">
            <li>Following</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/relations/followers`} activeClassName="active">
            <li>Followers</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/relations/mutual-following`} activeClassName="active">
            <li>Mutual Following</li>
          </Link>
        </ul>

        {authorized_user_id && authorized_user_id === requested_user_id &&
          <button
            className="btn-brand"
            style={{
              position: 'fixed',
              textTransform: 'uppercase',
              fontSize: 12,
              bottom: 20,
              width: 202
            }}
          >
            Find people and accounts
          </button>
        }
      </div>
    );
  }
}

PeopleMenu.propTypes = {
  requested_user: PropTypes.object,
  authorized_user_id: PropTypes.object
};
