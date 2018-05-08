import React from 'react';
import PropTypes from 'prop-types';
import AvailableUdser from './AvailableUser';

const AvailableUserList = ({ users, addUserHandler, user_list_ref }) => (
  <div
    ref={user_list_ref}
    className="available_users_list">
    {users.map(user => (
      <AvailableUdser 
        key={user.id}
        user={user}
        addUserHandler={addUserHandler}
      />
    ))}
  </div>
);

AvailableUserList.propTypes = {
  users: PropTypes.array,
  user_list_ref: PropTypes.object,
  addUserHandler: PropTypes.func
};

export default AvailableUserList;
