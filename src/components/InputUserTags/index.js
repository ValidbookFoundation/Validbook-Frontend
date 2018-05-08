import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectedUserList from './SelectedUserList';
import AvailableUserList from './AvailableUserList';
import './index.scss';

class InputUserTags extends Component {
  static propTypes = {
    selected_users: PropTypes.array,
    available_users: PropTypes.array,
    searchUserHandler: PropTypes.func,
    removeUserHandler: PropTypes.func,
    addUserHandler: PropTypes.func
  }

  state = {
    user_name: ''
  }

  componentDidMount() {
    document.addEventListener('click', this.onAvailableOutClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onAvailableOutClick, false);
  }

  onAvailableOutClick = (e) => {
    if (this.userList && !this.userList.contains(e.target)) {
      // TODO: close available list
    }
  }
  
  onUserNameChange = (e) => {
    const user_name = e.target.value;

    if (user_name) {
      this.props.searchUserHandler(user_name);
    }

    this.setState({
      user_name
    });
  }

  addUser = (user) => {
    this.props.addUserHandler(user);
    this.setState({
      user_name: ''
    });
  }
  
  availableUserListRender = () => {
    const { user_name } = this.state;
    if (!user_name) {
      return null;
    }
    const { available_users } = this.props;

    return (
      <AvailableUserList
        user_list_ref={el => this.userList = el}
        users={available_users}
        addUserHandler={this.addUser}
      />
    );
  }

  selectedUserListRender = () => {
    const { selected_users, removeUserHandler } = this.props;
    if (!selected_users.length) {
      return null;
    }

    return (
      <SelectedUserList
        users={selected_users}
        removeUserHandler={removeUserHandler}
      />
    );
  }

  render() {
    const { user_name } = this.state;

    return (
      <div className="user_tags_container">
        <div className="users_container">
          {this.selectedUserListRender()}
          <input
            type="text"
            name="users_list"
            className="search_user"
            placeholder="Type email address or name"
            value={user_name}
            onChange={this.onUserNameChange}
          />
        </div>
        {this.availableUserListRender()}
      </div>
    );
  }
}

export default InputUserTags;
