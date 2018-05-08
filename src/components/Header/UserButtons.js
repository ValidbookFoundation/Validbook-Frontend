import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DropdownButton } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import {
  getConversationList,
  getUserNotifications,
  seenAllNotification,
  seenAllConversations,
  clearConversation,
  readAllNotification,
  readAllConversations,
  readConversation,
  readNotification,
  loadNextConversations,
  clearConversionsList,
  loadNextNotifications,
  getConversationByID,
} from '../../actions/profile';
import { clearStories } from '../../actions/story';
import Apps from './Apps';
import { clearBookStories } from '../../actions/book';
import Loader from '../Loader';
import {
  NOTIFICATION_ID
} from './constants';
import Notifications from './Notifications';

@connect((state) => ({
  conversation: state.profile.conversation,
  conversations: state.profile.conversations,
  bubbleMessage: state.profile.bubbleMessage,
  bubbleNotification: state.profile.bubbleNotification,
  paginationConversations: state.profile.paginationConversations,
  hasMoreConversations: state.profile.hasMoreConversations,
  firstLoadConversations: state.profile.firstLoadConversations,
  paginationNotifications: state.profile.paginationNotifications,
  hasMoreNotifications: state.profile.hasMoreNotifications,
  firstLoadNotifications: state.profile.firstLoadNotifications,
}), {
  getConversationList,
  getConversationByID,
  seenAllNotification,
  seenAllConversations,
  getUserNotifications,
  readAllNotification,
  readAllConversations,
  readConversation,
  readNotification,
  clearConversation,
  loadNextConversations,
  clearConversionsList,
  loadNextNotifications,
  clearStories,
  clearBookStories,
})

export default class UserButtons extends Component {
  static propTypes = {
    authorized_user: PropTypes.object,
    logoutUser: PropTypes.func,
    seenAllConversations: PropTypes.func,
    seenAllNotification: PropTypes.func,
    getConversationList: PropTypes.func,
    getUserNotifications: PropTypes.func,
    readAllNotification: PropTypes.func,
    bubbleMessage: PropTypes.number,
    bubbleNotification: PropTypes.number,
    conversation: PropTypes.object,
    conversations: PropTypes.array,
    notifications: PropTypes.array,
    readAllConversations: PropTypes.func,
    readNotification: PropTypes.func,
    loadNextNotifications: PropTypes.func,
    readConversation: PropTypes.func,
    clearConversation: PropTypes.func,
    loadNextConversations: PropTypes.func,
    paginationConversations: PropTypes.number,
    hasMoreConversations: PropTypes.bool,
    // clearConversionsList: PropTypes.func,
    firstLoadConversations: PropTypes.bool,
    firstLoadNotifications: PropTypes.bool,
    // clearBookStories: PropTypes.func,
    // clearStories: PropTypes.func,
    getConversationByID: PropTypes.func,
  }

  state = {
    notification_id: null,
    show_notifications: false,
    show_shortcuts: false,
    show_all_shortcuts: false
  }

  componentDidMount() {
    document.addEventListener('click', this.onOutsideShortcutsClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideShortcutsClick, false);
  }

  clickMail = () => {
    // this.props.clearConversionsList();
    this.props.getConversationList();
    this.props.seenAllConversations();
  }

  clickNotification = () => {
    if (!this.props.firstLoadNotifications) {
      this.props.getUserNotifications();
    }
    this.props.seenAllNotification();
  }

  groupAvatars = (receivers) => {
    switch (receivers.length) {
      case 1:
        return (
          <div className="wrapper-avatars">
            <img src={receivers[0].avatar} alt=""/>
          </div>
        );
      case 2:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half">
              <img src={receivers[1].avatar} alt=""/>
            </div>
          </div>
        );

      default:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half grid-half-1">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half grid-half-2">
              <div className="grid-fourth">
                <img src={receivers[1].avatar} alt=""/>
              </div>
              <div className="grid-fourth">
                <img src={receivers[2].avatar} alt=""/>
              </div>
            </div>
          </div>
        );
    }
  }

  loadConversations = () => {
    const {
      firstLoadConversations,
      loadNextConversations,
      paginationConversations
    } = this.porps;

    if (firstLoadConversations) {
      loadNextConversations(paginationConversations);
    }
  }

  showDropdowns = (notification_id) => {
    switch (notification_id) {
      case NOTIFICATION_ID.CHAT:
        this.clickMail();
        break;
      case NOTIFICATION_ID.SOCIAL:
        this.clickNotification();
        break;
    }
    
    this.setState({
      notification_id: this.state.notification_id
        ? null
        : notification_id
    });
  }

  whoWroteMessage = (message, receivers) => {
    if (message.user.id === this.props.authorized_user.id) {
      return `You: ${message.text}`;
    }
    if (receivers.length > 1) {
      return `${message.user.first_name}: ${message.text}`;
    }
    return message.text;
  }

  onBlur = (e) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({
          notification_id: null
        });
      }
    }, 0);
  }

  clearStream = () => {
    // this.props.clearBookStories();
    // this.props.clearStories();
  }

  openConversation = (id) => {
    if (this.props.conversation.conversation_id !== id) {
      this.props.readConversation(id);
      this.props.getConversationByID(id);
    }
  }

  chatsRender = () => {
    const {conversations, hasMoreConversations} = this.props;
    if (!conversations.length) {
      return <Loader marginTop="10px"/>;
    }

    return (
      <InfiniteScroll
        loadMore={this.loadConversations}
        hasMore={hasMoreConversations}
        threshold={50}
        // loader={loader}
      >
        {conversations.map(conversation => (
          <Link
            to={`/chats/${conversation.conversation_id}`}
            key={conversation.conversation_id}
            style={{background: conversation.is_seen ? '#fff' : '#E4F0F6'}}
            onClick={() => this.openConversation(conversation.conversation_id)}
          >
            <li>
              {this.groupAvatars(conversation.receivers)}
              <h6>{conversation.receiversName && conversation.receiversName.toString()}</h6>
              {conversation.messages.length > 0 &&
              <span className="message">{this.whoWroteMessage(conversation.messages[0], conversation.receivers)}</span>
              }
              <span className="date">
                {conversation.messages && conversation.messages[0].date.substring(11, 17)}
              </span>
              <div className="tooltip-date">
                {conversation.messages && conversation.messages[0].date.substring(0, 11)}
              </div>
            </li>
          </Link>
        ))}
      </InfiniteScroll>
    );
  }
  
  onOutsideShortcutsClick = (e) => {
    const { show_shortcuts } = this.state;

    if ((e.target.closest('.nav-a') || !this.shortcuts.contains(e.target)) &&
      e.target.className !== 'show_more' && 
      show_shortcuts
    ) {
      this.setState({
        show_shortcuts: false
      });
    }
  }

  _showApps = () => {
    const { show_shortcuts } = this.state;

    this.setState({
      show_shortcuts: !show_shortcuts
    });
  }

  showAllShortcuts = (e) => {
    this.setState({
      show_all_shortcuts: true
    });
  }

  appsRender = () => {
    const { show_shortcuts, show_all_shortcuts } = this.state;

    if (!show_shortcuts) {
      return null;
    }

    const { authorized_user } = this.props;

    return (
      <Apps
        show_all_shortcuts={show_all_shortcuts}
        authorized_user={authorized_user}
        showAllShortcutsHandler={this.showAllShortcuts}
      />
    );
  }

  notificationsRender = () => {
    const { notification_id } = this.state;
    const {
      notifications,
      firstLoadNotifications,
      loadNextNotifications,
      paginationNotifications,
      readAllNotification,
      hasMoreNotifications,
      readNotification
    } = this.props;
    let content = null;

    switch (notification_id) {
      // case NOTIFICATION_ID.CHAT:

      case NOTIFICATION_ID.DRIVE:
        content = <Notifications
          header_text="Drive Notifications"
          notifications={[]}
          firstLoadNotifications={firstLoadNotifications}
          loadNextNotifications={loadNextNotifications}
          paginationNotifications={paginationNotifications}
          readAllNotification={readAllNotification}
          hasMoreNotifications={hasMoreNotifications}
          readNotification={readNotification}
        />;
        break;
      case NOTIFICATION_ID.EMAIL:
        content = <Notifications
          header_text="Mail Notifications"
          notifications={[]}
          firstLoadNotifications={firstLoadNotifications}
          loadNextNotifications={loadNextNotifications}
          paginationNotifications={paginationNotifications}
          readAllNotification={readAllNotification}
          hasMoreNotifications={hasMoreNotifications}
          readNotification={readNotification}
        />;
        break;
      case NOTIFICATION_ID.SOCIAL:
        content = <Notifications 
          header_text="Social Notifications"
          notifications={notifications}
          firstLoadNotifications={firstLoadNotifications}
          loadNextNotifications={loadNextNotifications}
          paginationNotifications={paginationNotifications}
          readAllNotification={readAllNotification}
          hasMoreNotifications={hasMoreNotifications}
          readNotification={readNotification}
        />;
        break;
      case NOTIFICATION_ID.WALLET:
        content = <Notifications
          header_text="Wallet Notifications"
          notifications={[]}
          firstLoadNotifications={firstLoadNotifications}
          loadNextNotifications={loadNextNotifications}
          paginationNotifications={paginationNotifications}
          readAllNotification={readAllNotification}
          hasMoreNotifications={hasMoreNotifications}
          readNotification={readNotification}
        />;
        break;
    }

    return content;
  }

  onShowNotifications = () => {
    this.setState({
      show_notifications: !this.state.show_notifications
    });
  }

  notificationsRender = () => {
    const { notification_id, show_notifications } = this.state;
    const { bubbleMessage, bubbleNotification } = this.props;
    const chats = require('../../img/Icons/chat-sm.svg');
    const chatsHover = require('../../img/Icons/chat-sm-hover.svg');

    if (!show_notifications) {
      return null;
    }

    return (
      <div className="icons">
        <div
          onBlur={this.onBlur}
          tabIndex={0} 
          className="signature_notifications_container">
          <div
            className="signature_notification_icon"
            // onClick={() => this.showDropdowns(NOTIFICATION_ID.WALLET)}
          />
          {/* {notification_id === NOTIFICATION_ID.WALLET && 
            this.notificationsRender()
          } */}
        </div>

        <div
          onBlur={this.onBlur}
          tabIndex={0} 
          className="wallet_notifications_container">
          <div
            className="wallet_notification_icon"
            onClick={() => this.showDropdowns(NOTIFICATION_ID.WALLET)}
          />
          {notification_id === NOTIFICATION_ID.WALLET && 
            this.notificationsRender()
          }
        </div>

        <div 
          onBlur={this.onBlur}
          tabIndex={0}
          className="email_notifications_container">
          <div 
            className="email_notification_icon"
            onClick={() => this.showDropdowns(NOTIFICATION_ID.EMAIL)}
          />
          {notification_id === NOTIFICATION_ID.EMAIL && 
            this.notificationsRender()
          }
        </div>

        <div 
          onBlur={this.onBlur}
          tabIndex={0}
          className="drive_notifications_container">
          <div 
            className="drive_notification_icon"
            onClick={() => this.showDropdowns(NOTIFICATION_ID.DRIVE)}
          />
          {notification_id === NOTIFICATION_ID.DRIVE && 
            this.notificationsRender()
          }
        </div>

        <div className="chats_container" tabIndex={0} onBlur={this.onBlur}>
          <i
            style={{
              background: notification_id === NOTIFICATION_ID.CHAT
                ? `url(${chatsHover})`
                : `url(${chats})`
            }}
            onClick={() => this.showDropdowns(NOTIFICATION_ID.CHAT)}
          />

          {bubbleMessage > 0 && 
            <div className="bubble">
              <span>{bubbleMessage}</span>
            </div>
          }

          <div
            style={{
              display: notification_id === NOTIFICATION_ID.CHAT
                ? 'block' 
                : 'none'
            }}
            className="dropdown-common dropdown-messages"
          >
            <div className="notification-box">
              <div className="triangle"/>
              <div>
                <h4>Chat Notifications</h4>
                <div style={{
                  display: 'flex'
                  }}
                >
                  <a onClick={this.props.readAllConversations}>Mark All Read</a>
                  <i>.</i>
                  <Link to="/chats/new" onClick={this.props.clearConversation}>New Chat</Link>
                </div>
              </div>
              <hr/>
              <ul>
                {this.chatsRender()}
              </ul>
              <div style={{padding: '3px 0 5px', justifyContent: 'center'}}>
                <Link to="/chats">See all</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="social_notifications_container" onBlur={this.onBlur} tabIndex={0}>
          <i onClick={() => this.showDropdowns(NOTIFICATION_ID.SOCIAL)}/>

          {bubbleNotification > 0 &&
            <div className="bubble">
              <span>{bubbleNotification}</span>
            </div>
          }
          {notification_id === NOTIFICATION_ID.SOCIAL && 
            this.notificationsRender()
          }
        </div>
      </div>
    );
  }

  chevronRender = () => {
    if (!this.state.show_notifications) {
      return null;
    }

    return <div className="chevron_right"/>;
  }

  render() {
    const {slug, first_name, avatar32} = this.props.authorized_user;
    const { logoutUser } = this.props;

    return (
      <nav className="header-navigation">

        {this.notificationsRender()}

        <div
          className="bell_icon_container"
          onClick={this.onShowNotifications}
        >
          {this.chevronRender()}
          <div className="bell_icon"/>
        </div>

        <div className="infouser">
          <Link
            to={`/${slug}`}
            onClick={this.clearStream}
            activeClassName="active"
          >
            <img src={avatar32} alt=""/>
            <span>{first_name}</span>
          </Link>
        </div>

        <div className="divider_left"/>

        <div className="profile-menu">
          <DropdownButton
            id={3}
            className="bootstrap-pure-btn"
            bsStyle="default"
            noCaret
            pullRight
          >
            <div className="triangle"/>
            <Link to="/settings">Settings</Link>
            <Link to="/settings/privacy">Privacy Control Center</Link>
            <Link to="/" onClick={logoutUser}>Sign out</Link>
          </DropdownButton>
        </div>

        <div className="divider_right"/>

        <div
          ref={el => this.shortcuts = el}
          className="apps_container">
          <div
            onClick={this._showApps}
            className="apps_icon_container">
            <span className="apps_icon"/>
          </div>
          {this.appsRender()}
        </div>

      </nav>
    );
  }
}
