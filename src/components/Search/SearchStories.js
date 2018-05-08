import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { searchStory } from '../../actions/search';
import Post from '../Stream/Story/index';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(searchStory(getState())));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  query: state.search.query,
  foundStories: state.search.foundStories,
  authorized_user: state.user.authorized_user,
  requested_user: state.user.requested_user,
}), {
  searchStory
})

class SearchStories extends Component {
  render() {
    const { foundStories, authorized_user, requested_user} = this.props;
    return (
      <div className="search-story page-bg">
        <div className="stream">
          {/*<Post />*/}
          {foundStories && foundStories.map((story) => (
            <Post
              key={story.id}
              story={story}
              likeFunc={this.like}
              authorized_user={this.props.authorized_user}
              requested_user={this.props.requested_user}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchStories;
