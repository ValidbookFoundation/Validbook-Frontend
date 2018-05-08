import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../Loader';
import './notifications.scss';

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    firstLoadNotifications: PropTypes.bool,
    loadNextNotifications: PropTypes.func,
    paginationNotifications: PropTypes.number,
    readAllNotification: PropTypes.func,
    hasMoreNotifications: PropTypes.func,
    readNotification: PropTypes.func,
    header_text: PropTypes.text
  }

  loadNotifications = () => {
    const {
      firstLoadNotifications,
      loadNextNotifications,
      paginationNotifications
    } = this.props;

    if (firstLoadNotifications) {
      loadNextNotifications(paginationNotifications);
    }
  }
  
  notificationsRender = () => {
    const {
      notifications,
      hasMoreNotifications,
      readNotification
    } = this.props;

    if (!notifications.length) {
      return <Loader marginTop="10px"/>;
    }

    return (
      <InfiniteScroll
        loadMore={this.loadNotifications}
        hasMore={hasMoreNotifications}
        threshold={50}
        useWindow={false}
      >
        {notifications.map((notification) => (
          <Link
            to={notification.link}
            key={notification.id}
            onClick={() => readNotification(notification.id)}
          >
            <li
              key={notification.id}
              style={{background: notification.is_seen 
                ? '#fff'
                : '#E4F0F6'
              }}
            >
              <div className="notification-content">
                <img src={notification.user.avatar} alt=""/>
                <div className="notification-info">
                  <h6 dangerouslySetInnerHTML={{__html: notification.text}}/>
                  <p>{notification.created}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </InfiniteScroll>
    );
  }

  render() {
    const { readAllNotification, header_text } = this.props;

    return (
      <div className="dropdown-common dropdown-notifications">
        <div className="notification-box">
          <div className="triangle"/>
          <div>
            <h4>{header_text}</h4>
            <a onClick={readAllNotification}>Mark All as Read</a>
          </div>
          <hr/>
          <ul>
            {this.notificationsRender()}
          </ul>
          <div style={{padding: '4px 5px'}}>
            <Link to="/notifications">See all</Link>
            <Link to="/settings/notifications">Settings</Link>
          </div>
        </div>
      </div>
    );
  }
}
