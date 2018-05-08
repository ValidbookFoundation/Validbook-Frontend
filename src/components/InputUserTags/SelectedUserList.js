import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chip } from 'react-md';

const SelectedUserList = ({ users, removeUserHandler }) => (
  <div className="selected_users_list">
    {users.map(user => (
      <Chip
        key={user.id}
        label={user.first_name + ' ' + user.last_name}
        avatar={<Avatar random><img src={user.avatar} /></Avatar>}
        removable
        onClick={(e) => removeUserHandler(user.id, e)}
      />
    ))}
  </div>
);

SelectedUserList.propTypes = {
  users: PropTypes.array,
  removeUserHandler: PropTypes.func
};

export default SelectedUserList;
