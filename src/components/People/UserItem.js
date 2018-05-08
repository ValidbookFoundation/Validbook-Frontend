import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const UserItem = ({ user, unfollowUserHandler, followUserHandler }) => (
  <div key={user.id} className="user-card">
    <Link onClick={() => window.scrollTo(0, 0)} to={`/${user.slug}`}>
      <img src={user.avatar}/>
      <div>{`${user.first_name} ${user.last_name}`}</div>
    </Link>
    <div
      className="btn-following"
      onClick={user.is_follow
        ? () => unfollowUserHandler(user.id)
        : () => followUserHandler(user.id)
      }>
      <div style={{color: user.is_follow ? '#999' : '#333'}}>
        {user.is_follow ? 'Following' : 'Follow'}
      </div>
      <span/>
    </div>
  </div>
);

UserItem.PropTypes = {
  user: PropTypes.object.isRequired,
  unfollowUserHandler: PropTypes.func.isRequired,
  followUserHandler: PropTypes.func.isRequired
};

export default UserItem;
