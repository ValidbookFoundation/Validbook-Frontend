import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import { getUserNotifications, loadNextNotifications } from '../../../actions/profile';
import Loader from '../../Loader';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState }}) => {
    const promises = [];
    promises.push(dispatch(getUserNotifications()));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  notifications: state.profile.notifications,
  pagination: state.profile.paginationNotifications,
  hasMoreNotifications: state.profile.hasMoreNotifications
}), {
  loadNextNotifications
})

class NotificationList extends Component {
  load = (e) => {
    console.log('scrollTop', document.documentElement.scrollTop);

    const {hasMoreNotifications, loadNextNotifications, pagination} = this.props;

    if (hasMoreNotifications) {
      loadNextNotifications(pagination);
    }
  }

  render() {
    const { notifications, loaded, hasMoreNotifications } = this.props;
    const loader = <Loader marginTop="10px"/>;
    
    return (
      <div className="notifications">
        <Helmet title="Notifications"/>

        <div className="notification-box notification-box-list">
          <div className="additional-title">Notifications</div>
          <hr/>
          <InfiniteScroll
            element={'ul'}
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={hasMoreNotifications ? loader : null}
          >
            {notifications && notifications.map((notification) => (
              <li key={notification.id}>
                <div>
                  <img src={notification.user.avatar} alt=""/>
                  <h6 dangerouslySetInnerHTML={{__html: notification.text}}/>
                </div>
                <p>{notification.created}</p>
              </li>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

NotificationList.propTypes = {
  notifications: PropTypes.array,
};

export default NotificationList;
