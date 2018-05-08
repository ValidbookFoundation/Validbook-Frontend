import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from 'react-md';
import { Modal } from 'react-bootstrap';

import {
  SETTING_ITEM_ID,
  RADIOBOX_VALUE
} from './constants.js';

import { searchUser } from '../../actions/search';
import { deleteBook } from '../../actions/book';

import BookAccessSettings from './BookAccessSettings';
import BookOtherSettings from './BookOtherSettings';
import DeleteBookModal from './DeleteBookModal';
import './index.scss';

@connect((state) => ({
  users: state.search.foundUsers
}), {
  searchUser,
  deleteBook
})

export default class EditBook extends Component {
  static propTypes = {
    book_slug: PropTypes.string,
    show_modal: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    bookSettings: PropTypes.object,
    book_name: PropTypes.string,
    description: PropTypes.string,
    searchUser: PropTypes.func.isRequired,
    closeModalHandler: PropTypes.func.isRequired,
    deleteBook: PropTypes.func
  }

  constructor(props) {
    super(props);
    const { book_name, description, bookSettings } = props;

    this.state = {
      book_name: book_name || '',
      description: description || '',
      book_settings: bookSettings || {
        can_add_stories: 0,
        can_delete_stories: 0,
        can_manage_settings: 0,
        can_see_content: 1,
        can_see_exists: 1,
        users_array: {
          users_can_see_exists: [],
          users_can_see_content: [],
          users_can_add_stories: [],
          users_can_delete_stories: [],
          users_can_manage_settings: []
        }
      },
      show_delete_book_modal: false
    };
  }

  findUser = (value) => {
    this.props.searchUser(value);
  }

  addUser = (user, setting_id) => {
    const { book_settings } = this.state;
    const users_array_map = Object.assign({}, book_settings.users_array);

    switch (setting_id) {
      case SETTING_ITEM_ID.CAN_SEE_EXISTS: {
        users_array_map.users_can_see_exists.push(user);
        break;
      }
      case SETTING_ITEM_ID.CAN_SEE_CONTENT: {
        users_array_map.users_can_see_content.push(user);
        break;
      }
      case SETTING_ITEM_ID.CAN_ADD_STORIES: {
        users_array_map.users_can_add_stories.push(user);
        break;
      }
      case SETTING_ITEM_ID.CAN_DELETE_STORIES: {
        users_array_map.users_can_delete_stories.push(user);
        break;
      }
      case SETTING_ITEM_ID.CAN_MANAGE_SETTINGS: {
        users_array_map.users_can_manage_settings.push(user);
        break;
      }
    }

    this.setState({
      book_settings: Object.assign({}, book_settings, {
        users_array: users_array_map
      })
    });
  }

  removeUser = (user_id, setting_id, e) => {
    if (e.target.tagName === 'I') {
      const { book_settings } = this.state;
      const users_array_map = Object.assign({}, book_settings.users_array);

      switch (setting_id) {
        case SETTING_ITEM_ID.CAN_SEE_EXISTS: {
          users_array_map.users_can_see_exists = users_array_map.users_can_see_exists.filter(user => user.id !== user_id);
          break;
        }
        case SETTING_ITEM_ID.CAN_SEE_CONTENT: {
          users_array_map.users_can_see_content = users_array_map.users_can_see_content.filter(user => user.id !== user_id);
          break;
        }
        case SETTING_ITEM_ID.CAN_ADD_STORIES: {
          users_array_map.users_can_add_stories = users_array_map.users_can_add_stories.filter(user => user.id !== user_id);
          break;
        }
        case SETTING_ITEM_ID.CAN_DELETE_STORIES: {
          users_array_map.users_can_delete_stories = users_array_map.users_can_delete_stories.filter(user => user.id !== user_id);
          break;
        }
        case SETTING_ITEM_ID.CAN_MANAGE_SETTINGS: {
          users_array_map.users_can_manage_settings = users_array_map.users_can_manage_settings.filter(user => user.id !== user_id);
          break;
        }
      }

      this.setState({
        book_settings: Object.assign({}, book_settings, {
          users_array: users_array_map
        })
      });
    }
  }

  changeSettingOption = (setting_id, e) => {
    const book_settings_map = Object.assign({}, this.state.book_settings);

    switch (setting_id) {
      case SETTING_ITEM_ID.CAN_SEE_EXISTS: {
        if (e === RADIOBOX_VALUE.ONLY_YOU) {
          book_settings_map.can_see_exists = RADIOBOX_VALUE.ONLY_YOU;
          book_settings_map.can_see_content = RADIOBOX_VALUE.ONLY_YOU;
          book_settings_map.can_add_stories = RADIOBOX_VALUE.ONLY_YOU;
          book_settings_map.can_delete_stories = RADIOBOX_VALUE.ONLY_YOU;
          this.setState({
            book_settings: book_settings_map
          });
        } else {
          this.defaultChangeField(setting_id, e);
        }
        break;
      }

      case SETTING_ITEM_ID.CAN_SEE_CONTENT: {
        if (e === RADIOBOX_VALUE.ONLY_YOU) {
          book_settings_map.can_see_content = RADIOBOX_VALUE.ONLY_YOU;
          book_settings_map.can_add_stories = RADIOBOX_VALUE.ONLY_YOU;
          book_settings_map.can_delete_stories = RADIOBOX_VALUE.ONLY_YOU;
          this.setState({
            book_settings: book_settings_map
          });
        } else if (e === RADIOBOX_VALUE.ANYONE) {
          book_settings_map.can_see_exists = RADIOBOX_VALUE.ANYONE;
          book_settings_map.can_see_content = RADIOBOX_VALUE.ANYONE;
          this.setState({
            book_settings: book_settings_map
          });
        } else {
          this.defaultChangeField(setting_id, e);
        }
        break;
      }

      case SETTING_ITEM_ID.CAN_ADD_STORIES: {
        if (e === RADIOBOX_VALUE.ONLY_YOU) {
          book_settings_map.can_add_stories = RADIOBOX_VALUE.ONLY_YOU;
          book_settings_map.can_delete_stories = RADIOBOX_VALUE.ONLY_YOU;
          this.setState({
            book_settings: book_settings_map
          });
        } else if (e === RADIOBOX_VALUE.ANYONE) {
          book_settings_map.can_see_exists = RADIOBOX_VALUE.ANYONE;
          book_settings_map.can_see_content = RADIOBOX_VALUE.ANYONE;
          book_settings_map.can_add_stories = RADIOBOX_VALUE.ANYONE;
          this.setState({
            book_settings: book_settings_map
          });
        } else {
          this.defaultChangeField(setting_id, e);
        }
        break;
      }

      case SETTING_ITEM_ID.CAN_DELETE_STORIES: {
        if (e === RADIOBOX_VALUE.ANYONE) {
          book_settings_map.can_see_exists = RADIOBOX_VALUE.ANYONE;
          book_settings_map.can_see_content = RADIOBOX_VALUE.ANYONE;
          book_settings_map.can_add_stories = RADIOBOX_VALUE.ANYONE;
          book_settings_map.can_delete_stories = RADIOBOX_VALUE.ANYONE;
          this.setState({
            book_settings: book_settings_map
          });
        } else {
          this.defaultChangeField(setting_id, e);
        }
        break;
      }

      default:
        this.defaultChangeField(setting_id, e);
    }
  }

  defaultChangeField = (setting_id, e) => {
    this.setState({
      book_settings: Object.assign({}, this.state.book_settings, {
        [setting_id]: e
      })
    });
  }

  openDeleteBookModal = () => {
    this.setState({
      show_delete_book_modal: true
    });
  }

  closeDeleteBookModal = () => {
    this.setState({
      show_delete_book_modal: false
    });
  }

  deleteBook = () => {
    const { book_slug, deleteBook } = this.props;

    deleteBook(book_slug);
  }

  deleteBookModalRender = () => {
    const { show_delete_book_modal } = this.state;

    if (!show_delete_book_modal) {
      return null;
    }

    return (
      <DeleteBookModal 
        show_modal={show_delete_book_modal}
        closeModalHandler={this.closeDeleteBookModal}
        deleteBookHandler={this.deleteBook}
      />
    );
  }

  deleteLinkRender = () => {
    if (!this.props.bookSettings) {
      return null;
    }

    return (
      <a
        href="#"
        className="delete_link"
        onClick={this.openDeleteBookModal}
      >
        Delete
      </a>
    );
  }

  render() {
    const { book_name, book_description, book_settings } = this.state;
    const { users, show_modal, closeModalHandler } = this.props;

    return (
      <div className="edit_book_modal_container">
        <Modal
          className="edit_book_modal"
          show={show_modal}
          onHide={closeModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.bookSettings
                ? 'Edit Book'
                : 'Create Book'
              }
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <TextField
              id="book_name"
              label="Title"
              placeholder="Book name"
              className="md-cell md-cell--bottom"
              defaultValue={book_name}
            />
            <TextField
              id="description"
              label="Description"
              placeholder="(Optional)"
              className="md-cell md-cell--bottom"
              defaultValue={book_description}
            />

            <BookAccessSettings
              users={users}
              book_settings={book_settings}
              searchUserHandler={this.findUser}
              removeUserHandler={this.removeUser}
              addUserHandler={this.addUser}
              changeSettingOptionHandler={this.changeSettingOption}
            />
            <BookOtherSettings />
            
          </Modal.Body>

          <Modal.Footer>
            {this.deleteLinkRender()}
            <div className="btn_group_modal">
              <button
                className="btn-brand btn-cancel"
                onClick={closeModalHandler}
              >
                Cancel
              </button>
              <button
                className="btn-brand"
                style={{marginLeft: '10px'}}
              >
                {this.props.bookSettings
                  ? 'Save Book Settings'
                  : 'Create Book'
                }
                
              </button>
            </div>
          </Modal.Footer>
        </Modal>
        {this.deleteBookModalRender()}
      </div>
    );
  }
}
