import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectionControlGroup } from 'react-md';

import {
  SETTING_ITEM_ID,
  RADIOBOX_VALUE,
  LABEL_VALUE
} from './constants.js';

import InputUserTags from '../InputUserTags';
import './book-access-settings.scss';

export default class BookAccessSettings extends Component {
  static propTypes = {
    users: PropTypes.array,
    book_settings: PropTypes.object,
    searchUserHandler: PropTypes.func,
    removeUserHandler: PropTypes.func,
    addUserHandler: PropTypes.func,
    changeSettingOptionHandler: PropTypes.func
  }

  state = {
    user_name: ''
  }

  filterAvailableUsers = (setting_users) => {
    const { users } = this.props;
    const setting_user_ids = setting_users.map(user => user.id);
    
    return users
      .filter(user => !setting_user_ids.includes(user.id))
      .slice(0, 8);
  }

  addUser = (user, setting_id) => {
    this.props.addUserHandler(user, setting_id);
  }

  removeUser = (user_id, setting_id, e) => {
    this.props.removeUserHandler(user_id, setting_id, e);
  }

  render() {
    const {
      searchUserHandler,
      addUserHandler,
      removeUserHandler,
      changeSettingOptionHandler
    } = this.props;
    const {
      can_see_exists,
      can_see_content,
      can_add_stories,
      can_delete_stories,
      can_manage_settings,
      users_array
    } = this.props.book_settings;

    return (
      <div className="book_access_settings">
        <h2>Access settings</h2>
        <div className="setting_item_container">
          <div className="setting_item">
            <span className="setting_title">
              Who can see that book exists?
            </span>
            <SelectionControlGroup
              id={SETTING_ITEM_ID.CAN_SEE_EXISTS}
              name="selection-controls"
              type="radio"
              value={can_see_exists}
              onChange={(e) => changeSettingOptionHandler(SETTING_ITEM_ID.CAN_SEE_EXISTS, +e)}
              controls={[
                { 
                  label: LABEL_VALUE.ONLY_YOU,
                  value: RADIOBOX_VALUE.ONLY_YOU
                }, { 
                  label: LABEL_VALUE.ANYONE,
                  value: RADIOBOX_VALUE.ANYONE
                }, { 
                  label: LABEL_VALUE.SPECIFIC_PEOPLE,
                  value: RADIOBOX_VALUE.SPECIFIC_PEOPLE
                }
              ]}
            />
          </div>
          <div className="specific_people">
            {can_see_exists === RADIOBOX_VALUE.SPECIFIC_PEOPLE &&
              <InputUserTags
                available_users={this.filterAvailableUsers(users_array.users_can_see_exists)}
                selected_users={users_array.users_can_see_exists}
                searchUserHandler={searchUserHandler}
                addUserHandler={(user) => this.addUser(user, SETTING_ITEM_ID.CAN_SEE_EXISTS)}
                removeUserHandler={(user_id, e) => this.removeUser(user_id, SETTING_ITEM_ID.CAN_SEE_EXISTS, e)}
              />
            }
          </div>
        </div>
        <div className="setting_item_container">
          <div className="setting_item">
            <span className="setting_title">
              Who can see the content of the book?
            </span>
            <SelectionControlGroup
              id={SETTING_ITEM_ID.CAN_SEE_CONTENT}
              name="selection-controls"
              type="radio"
              value={can_see_content}
              onChange={(e) => changeSettingOptionHandler(SETTING_ITEM_ID.CAN_SEE_CONTENT, +e)}
              controls={[
                { 
                  label: LABEL_VALUE.ONLY_YOU,
                  value: RADIOBOX_VALUE.ONLY_YOU
                }, { 
                  label: LABEL_VALUE.ANYONE,
                  value: RADIOBOX_VALUE.ANYONE
                }, { 
                  label: LABEL_VALUE.SPECIFIC_PEOPLE,
                  value: RADIOBOX_VALUE.SPECIFIC_PEOPLE
                }
              ]}
            />
          </div>
          <div className="specific_people">
            {can_see_content === RADIOBOX_VALUE.SPECIFIC_PEOPLE &&
              <InputUserTags
                available_users={this.filterAvailableUsers(users_array.users_can_see_content)}
                selected_users={users_array.users_can_see_content}
                searchUserHandler={searchUserHandler}
                addUserHandler={(user) => this.addUser(user, SETTING_ITEM_ID.CAN_SEE_CONTENT)}
                removeUserHandler={(user_id, e) => this.removeUser(user_id, SETTING_ITEM_ID.CAN_SEE_CONTENT, e)}
              />
            }
          </div>
        </div>
        <div className="setting_item_container">
          <div className="setting_item">
            <span className="setting_title">
              Who can add stories to the book?
            </span>
            <SelectionControlGroup
              id={SETTING_ITEM_ID.CAN_ADD_STORIES}
              name="selection-controls"
              type="radio"
              value={can_add_stories}
              onChange={(e) => changeSettingOptionHandler(SETTING_ITEM_ID.CAN_ADD_STORIES, +e)}
              controls={[
                { 
                  label: LABEL_VALUE.ONLY_YOU,
                  value: RADIOBOX_VALUE.ONLY_YOU
                }, { 
                  label: LABEL_VALUE.ANYONE,
                  value: RADIOBOX_VALUE.ANYONE
                }, { 
                  label: LABEL_VALUE.SPECIFIC_PEOPLE,
                  value: RADIOBOX_VALUE.SPECIFIC_PEOPLE
                }
              ]}
            />
          </div>
          <div className="specific_people">
            {can_add_stories === RADIOBOX_VALUE.SPECIFIC_PEOPLE &&
              <InputUserTags
                available_users={this.filterAvailableUsers(users_array.users_can_add_stories)}
                selected_users={users_array.users_can_add_stories}
                searchUserHandler={searchUserHandler}
                addUserHandler={(user) => this.addUser(user, SETTING_ITEM_ID.CAN_ADD_STORIES)}
                removeUserHandler={(user_id, e) => this.removeUser(user_id, SETTING_ITEM_ID.CAN_ADD_STORIES, e)}
              />
            }
          </div>
        </div>
        <div className="setting_item_container">
          <div className="setting_item">
            <span className="setting_title">
              Who can delete stories from the book?
            </span>
            <SelectionControlGroup
              id={SETTING_ITEM_ID.CAN_DELETE_STORIES}
              name="selection-controls"
              type="radio"
              value={can_delete_stories}
              onChange={(e) => changeSettingOptionHandler(SETTING_ITEM_ID.CAN_DELETE_STORIES, +e)}
              controls={[
                {
                  label: LABEL_VALUE.ONLY_YOU,
                  value: RADIOBOX_VALUE.ONLY_YOU
                }, {
                  label: LABEL_VALUE.ANYONE,
                  value: RADIOBOX_VALUE.ANYONE
                }, {
                  label: LABEL_VALUE.SPECIFIC_PEOPLE,
                  value: RADIOBOX_VALUE.SPECIFIC_PEOPLE
                }
              ]}
            />
          </div>
          <div className="specific_people">
            {can_delete_stories === RADIOBOX_VALUE.SPECIFIC_PEOPLE &&
              <InputUserTags
                available_users={this.filterAvailableUsers(users_array.users_can_delete_stories)}
                selected_users={users_array.users_can_delete_stories}
                searchUserHandler={searchUserHandler}
                addUserHandler={(user) => this.addUser(user, SETTING_ITEM_ID.CAN_DELETE_STORIES)}
                removeUserHandler={(user_id, e) => this.removeUser(user_id, SETTING_ITEM_ID.CAN_DELETE_STORIES, e)}
              />
            }
          </div>
        </div>
        <div className="setting_item_container">
          <div className="setting_item">
            <span className="setting_title">
              Who can manage access settings to the book?
            </span>
            <SelectionControlGroup
              id={SETTING_ITEM_ID.CAN_MANAGE_SETTINGS}
              name="selection-controls"
              type="radio"
              value={can_manage_settings}
              onChange={(e) => changeSettingOptionHandler(SETTING_ITEM_ID.CAN_MANAGE_SETTINGS, +e)}
              controls={[
                { 
                  label: LABEL_VALUE.ONLY_YOU,
                  value: RADIOBOX_VALUE.ONLY_YOU
                }, { 
                  label: LABEL_VALUE.SPECIFIC_PEOPLE,
                  value: RADIOBOX_VALUE.SPECIFIC_PEOPLE
                }
              ]}
            />
          </div>
          <div className="specific_people">
            {can_manage_settings === RADIOBOX_VALUE.SPECIFIC_PEOPLE &&
              <InputUserTags
                available_users={this.filterAvailableUsers(users_array.users_can_manage_settings)}
                selected_users={users_array.users_can_manage_settings}
                searchUserHandler={searchUserHandler}
                addUserHandler={(user) => this.addUser(user, SETTING_ITEM_ID.CAN_MANAGE_SETTINGS)}
                removeUserHandler={(user_id, e) => this.removeUser(user_id, SETTING_ITEM_ID.CAN_MANAGE_SETTINGS, e)}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
