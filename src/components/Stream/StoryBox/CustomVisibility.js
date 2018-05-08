import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { searchUser } from '../../../actions/search';

import InputUserTags from '../../InputUserTags';
import './custom-visibility.scss';

@connect((state) => ({
  users: state.search.foundUsers
}), {
  searchUser
})

class CustomVisibility extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    users: PropTypes.array,
    searchUser: PropTypes.func,
    closeModalHandler: PropTypes.func
  }

  state = {
    users_custom_visibility: []
  }

  findUser = (value) => {
    this.props.searchUser(value);
  }

  addUser = (user) => {
    this.setState({
      users_custom_visibility: this.state.users_custom_visibility.concat(user)
    });
  }

  removeUser = (id, e) => {
    if (e.target.tagName === 'I') {
      this.setState({
        users_custom_visibility: this.state.users_custom_visibility.filter(user => user.id !== id)
      });
    }
  }

  inputUserTagsRender = () => {
    const { users_custom_visibility } = this.state;
    const { users } = this.props;
    const users_custom_visibility_ids = users_custom_visibility.map(user => user.id);
    const available_users = users
      .filter(user => !users_custom_visibility_ids.includes(user.id))
      .slice(0, 8);

    return (
      <InputUserTags
        selected_users={users_custom_visibility}
        available_users={available_users}
        searchUserHandler={this.findUser}
        addUserHandler={this.addUser}
        removeUserHandler={this.removeUser}
      />
    );
  }

  render() {
    const { showModal, closeModalHandler } = this.props;

    return (
      <Modal
        show={showModal}
        onHide={closeModalHandler}
        className="custom_visibility"
      >
        <Modal.Header closeButton>
          <Modal.Title>Story Visibility</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="add_user_container">
            <div className="input_label">Visible to</div>
            {this.inputUserTagsRender()}
          </div>
          <div className="info_text">Anyone tagged will be abble to see this story.</div>
        </Modal.Body>

        <Modal.Footer>
          <div style={{float: 'right'}}>
            <button
              className="btn-brand btn-cancel"
              onClick={closeModalHandler}
            >Cancel</button>
            <button
              className="btn-brand"
              style={{marginLeft: '10px'}}
              type="submit"
            >Save</button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CustomVisibility;
