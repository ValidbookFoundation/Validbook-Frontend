import React from 'react';
import PropTypes from 'prop-types';

const AvailableUser = ({ user, addUserHandler }) => (
  <div
    className="available_user"
    onClick={() => addUserHandler(user)}
  >
    <img src={user.avatar}/>
    <span className="user_name">{user.first_name}{' '}{user.last_name}</span>
  </div>
);

AvailableUser.propTypes = {
  user: PropTypes.object,
  addUserHandler: PropTypes.func
};

export default AvailableUser;
