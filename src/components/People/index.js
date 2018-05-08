import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  isLoadedFollowing,
  follow as followUser,
  unfollow as unfollowUser,
  loadPeopleAll,
  getNextPeople
} from '../../actions/follow';
import {
  parseUserSlug
} from '../../utils/url_parsing';
import PeopleMenu from './PeopleMenu';
import Loader from '../Loader';
import UserItem from './UserItem';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.allPeople,
  following: state.follow.following,
  path: state.routing.locationBeforeTransitions.pathname,
  peopleAll: state.follow.peopleAll,
  slug: state.user.requested_user.slug,
  over: state.follow.over.allPeople,
  loaded: state.follow.loaded.loadedAllPeople,
  requested_user: state.user.requested_user
}), {
  isLoadedFollowing,
  followUser,
  unfollowUser,
  loadPeopleAll,
  getNextPeople
})

class People extends Component {
  state = {
    page: 'graph'
  }
  componentDidMount() {
    const {path} = this.props;
    const findSlug = parseUserSlug(path);
    this.props.loadPeopleAll(findSlug);
  }
  
  load = () => {
    if (!this.props.over) {
      this.props.getNextPeople(this.props.slug, this.props.pagination);
    }
  }

  follow = (id) => {
    this.props.followUser(id, 'peopleAll');
  }

  unfollow = (id) => {
    this.props.unfollowUser(id, 'peopleAll');
  }

  render() {
    const { peopleAll, loaded, over, small_subheader, requested_user } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu
          small_subheader={small_subheader}
        />

        <div 
          className="common-lists people-lists" 
          style={{marginLeft: small_subheader ? 240 : null}}
        >
          <div className="graph_container">
            <img
              src={requested_user.avatar32}
              style={{
                margin: 'auto',
                borderRadius: '50%',
                width: 32,
                height: 32
              }}
            />
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
          </div>
          {loaded &&
            <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={50}
            >
              <div className="wrapper">
                {peopleAll && peopleAll.map(user => (
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

People.propTypes = {
  peopleAll: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleAll: PropTypes.func,
  path: PropTypes.string
};

export default People;
