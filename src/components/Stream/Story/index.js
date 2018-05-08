import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { deleteStory, pinStory} from '../../../actions/story';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostContent from './PostContent';

@connect(null, {
  deleteStory,
  pinStory
})

export default class Post extends Component {
  render() {
    const { 
      authorized_user,
      setVisibilityStory
    } = this.props;
    const {
      text,
      images,
      id,
      user,
      date,
      likes,
      books,
      loudness,
      visibility,
      comments,
      paginationComment,
      counts
    } = this.props.story;
    const content_images = [].concat(images);

    return (
      <div className="post post-appear ">
        <PostHeader
          authorized_user={authorized_user}
          user={user}
          date={date}
          visibility={visibility}
          loudness={loudness}
          id={id}
          books={books}
          setVisibilityStory={setVisibilityStory}
        />

        <PostContent 
          text={text}
          images={content_images.slice(0, 5)}
        />

        <PostFooter
          authorized_user={authorized_user}
          likes={likes}
          id={id}
          user={user}
          comments={comments}
          paginationComment={paginationComment}
          counts={counts}
          post={text}
          likeFunc={this.props.likeFunc}
          showMoreCommentsFunc={this.props.showMoreCommentsFunc}
          createCommentFunc={this.props.createCommentFunc}
          showReplyFunc={this.props.showReplyFunc}
        />
      </div>
    );
  }
}

Post.propTypes = {
  authorized_user: PropTypes.object,
  story: PropTypes.object,
  likeFunc: PropTypes.func,
  showMoreCommentsFunc: PropTypes.func,
};
