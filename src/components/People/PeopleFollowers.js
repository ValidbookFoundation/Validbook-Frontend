import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {
  getNextFollowers,
  loadPeopleFollowers,
  isLoadedFollowers,
  follow as followUser,
  unfollow as unfollowUser
} from '../../actions/follow';
import {
  parseUserSlug
} from '../../utils/url_parsing';
import PeopleMenu from './PeopleMenu';
import Loader from '../Loader';
import UserItem from './UserItem';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.followers,
  followers: state.follow.followers,
  path: state.routing.locationBeforeTransitions.pathname,
  slug: state.user.requested_user.slug,
  over: state.follow.over.followers,
  loaded: state.follow.loaded.loadedFollowers
}), {
  getNextFollowers,
  loadPeopleFollowers,
  isLoadedFollowers,
  followUser,
  unfollowUser
})

class PeopleFollowers extends Component {
  componentDidMount() {
    const { path } = this.props;
    const findSlug = parseUserSlug(path);
    this.props.loadPeopleFollowers(findSlug);
  }

  follow = (id) => {
    this.props.followUser(id, 'followers');
  }

  unfollow = (id) => {
    this.props.unfollowUser(id, 'followers');
  }

  load = () => {
    const {over, slug, pagination, getNextFollowers} = this.props;

    if (!over) {
      getNextFollowers(slug, pagination);
    }
  }

  render() {
    const {followers, loaded, over, small_subheader} = this.props;
    const loader = <Loader marginTop="10px"/>;

    return (
      <div className="people contents">
        <PeopleMenu
          small_subheader={small_subheader}
        />
        <div 
          className="common-lists people-lists"
          style={{marginLeft: small_subheader ? 240 : null}}
        >
          {loaded &&
            <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={50}
              loader={over ? null : loader}
            >
              <div className="wrapper">
                {followers.users && followers.users.map(user => (
                  <UserItem
                    key={user.id}
                    user={user}
                    unfollowUserHandler={this.unfollow}
                    followUserHandler={this.follow}
                  />
                ))}
              </div>
            </InfiniteScroll>
          }
        </div>
      </div>
    );
  }
}

PeopleFollowers.propTypes = {
  followers: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleFollowers: PropTypes.func,
  path: PropTypes.string
};

export default PeopleFollowers;
