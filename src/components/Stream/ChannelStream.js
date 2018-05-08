import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  likeStory,
  viewMoreComments,
  createComment,
  create as createStoryStoryline,
  showReplies,
  setVisibilityStory
} from '../../actions/story';
import StoryBox from './StoryBox';
import Post from './Story';
import Loader from '../Loader';
import './index.scss';

@connect((state) => ({
  over: state.channel.over,
  loaded: state.channel.loaded.loadedChannelStories,
  channel_slug: state.channel.channel_slug,
  pagination: state.channel.pagination
}), {
  likeStory,
  viewMoreComments,
  createComment,
  createStoryStoryline,
  showReplies,
  setVisibilityStory
})

export default class ChannelStream extends Component {
  load = () => {
    if (!this.props.over) {
      this.props.loadNextChannelStories(this.props.channel_slug, this.props.pagination);
    }
  }

  reloadStreamChannel = () => {
    this.props.showChannel('');
  }

  like = (id) => {
    this.props.likeStory(id);
  }

  createComment = (entity_id, content, parent_id, user) => {
    this.props.createComment(entity_id, content, parent_id, user);
  }

  createStory = (data, selected_books, files) => {
    this.props.createStoryStoryline(data, selected_books, files);
  }

  showMoreComments = (id, paginationComment) => {
    this.props.viewMoreComments(id, paginationComment);
  }

  showReply = (id) => {
    this.props.showReplies(id);
  }

  render() {
    const {channelStories, loaded, over, setVisibilityStory, getCheckboxOfBook} = this.props;

    return (
      <div className="stream" style={{marginLeft: 0}}>
        <StoryBox
          authorized_user={this.props.authorized_user}
          createStoryFunc={this.createStory}
          reloadStream={this.reloadStreamChannel}
          getCheckboxOfBook={getCheckboxOfBook}
        />
        {loaded 
          ? <InfiniteScroll
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={<Loader marginTop="52px" />}
          >
            {channelStories && channelStories.map((story, index) => (
              <Post
                key={index}
                story={story}
                likeFunc={this.like}
                showMoreCommentsFunc={this.showMoreComments}
                authorized_user={this.props.authorized_user}
                requested_user={this.props.requested_user}
                createCommentFunc={this.createComment}
                showReplyFunc={this.showReply}
                setVisibilityStory={setVisibilityStory}
              />
            ))}
          </InfiniteScroll>
          : <Loader marginTop="52px" />
        }
      </div>
    );
  }
}

ChannelStream.propTypes = {
  authorized_user: PropTypes.object,
  requested_user: PropTypes.object,
  createStory: PropTypes.func,
  channelStories: PropTypes.array,
  over: PropTypes.bool,
  loadNextChannelStories: PropTypes.func,
  channel_slug: PropTypes.string,
  pagination: PropTypes.number,
  likeStory: PropTypes.func,
  viewMoreComments: PropTypes.func,
  showChannel: PropTypes.func,
};
