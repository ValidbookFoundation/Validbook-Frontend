import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Textarea from 'react-textarea-autosize';
import {ShareButtons} from 'react-share';
import {Modal, Tooltip, OverlayTrigger, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {like as likePost, viewMoreComments} from '../../../actions/story';
import LogStory from '../../Popup/Log';

const {FacebookShareButton, TwitterShareButton} = ShareButtons;

@connect((state) => ({
  creatingNewComment: state.story.creatingNewComment,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  likePost,
  viewMoreComments,
})

class PostFooter extends Component {
  state = {
    showModal: false,
    parent_id: 0,
    showReply: false,
    showComment: false,
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.creatingNewComment === this.props.creatingNewComment) {
      this.setState({showReply: false});
      return true;
    }
    return true;
  }

  Close = () => {
    this.setState({showModal: false});
  }

  Open = () => {
    this.setState({showModal: true});
  }

  openCommentBlock = () => {
    this.setState({showComment: true});
  }

  loadLikeInfo = (people_list) => {
    const {authorized_user} = this.props;
    const friends = [];
    let result;
    const is_Friend = people_list.some(people => people.user.is_friend);
    const is_Owner = people_list.some(people => people.user.id === authorized_user.id);
    const is_Not_Owner = people_list.every(people => people.user.id !== authorized_user.id);

    if (is_Owner && !is_Friend) {
      if (people_list.length - 1 === 0) {
        people_list.map(people => {
          if (people.user.id === authorized_user.id) {
            result = people.user.fullName;
          }
        });
      } else {
        const arrPeople = people_list.length - 1;
        result = `You and ${arrPeople} ${arrPeople === 1 ? 'other' : 'others'}`;
      }
    } else if (is_Friend) {
      people_list.map(people => {
        if (people.user.is_friend) {
          friends.push(` ${people.user.fullName}`);
        }
        return friends;
      });

      const qtyFriend = friends[1] ? 2 : 1;

      if (is_Owner) {
        if (people_list.length - qtyFriend - 1 === 0) {
          result = `You and ${friends.slice(0, qtyFriend)}`;
        } else {
          const arrPeople = people_list.length - qtyFriend - 1;
          result = `You, ${friends.slice(0, qtyFriend)} and ${arrPeople} ${arrPeople === 1 ? 'other' : 'others'}`;
        }
      } else if (people_list.length - 1 === 0) {
        result = friends[0];
      } else {
        const arrPeople = people_list.length - qtyFriend;
        result = `${friends.slice(0, qtyFriend)} and ${arrPeople} ${arrPeople === 1 ? 'other' : 'others'}`;
      }
    } else if (is_Not_Owner && !is_Friend) {
      result = people_list.length;
    }
    return result;
  }

  handleKeyPress = (event) => {
    const {createCommentFunc, authorized_user, id} = this.props;
    const {parent_id} = this.state;
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      // console.log('comment.js', this.props.id, event.target.value, this.state.parent_id, this.props.authorized_user.id);
      createCommentFunc(id, event.target.value, parent_id, authorized_user);
      event.target.value = '';
    }
  }

  reply = (id) => {
    // if (this.state.showReply) {
    //   this.setState({ parent_id: 0, showReply: !this.state.showReply });
    // } else {
    //   this.setState({ parent_id: id, showReply: !this.state.showReply });
    // }
    this.setState({parent_id: id, showReply: !this.state.showReply});
  }

  _toUserStoryLine = (user_slug, e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
      browserHistory.push(`/${user_slug}`);
    }
  }

  replyComments = (comments) => {
    const arrResult = [];
    let right = 0;

    function treeOfComments(comments) {
      comments && comments.map(comment => {
        // console.log(comment.js)
        // comment.js.rightParent = 0;
        if (comment.rightParent) {
          comment.right = comment.rightParent;
          right = comment.rightParent;
        } else if (comment.parent_id === 0) {
          right = 0;
          comment.right = 0;
        } else {
          comment.right = right;
        }

        arrResult.push(comment);

        if (comment.children) {
          right += 27;
          if (comment.children.length > 1) {
            comment.children.map(item => item.rightParent = right);
          }
          treeOfComments(comment.children);
        }
      });
    }

    treeOfComments(comments);
    return arrResult.map((comment, index) => (
      comment.hidden
        ? <div 
          key={comment.id}
          className={'comment' + (comment.right > 0 ? ' comment-reply' : '')} 
          style={{marginLeft: comment.right}}
          onClick={(e) => this._toUserStoryLine(comment.user.slug, e)}>
          <i className="replied-arrow"/>
          <img
            src={comment.user.avatar32}
            style={{
              cursor: 'pointer',
              width: comment.right > 0 ? '20px' : '32px',
              minWidth: comment.right > 0 ? '20px' : '32px',
              height: comment.right > 0 ? '20px' : '32px',
            }}
          />
          <div 
            onClick={() => this.props.showReplyFunc(comment.id)}
            className="text-block collapsed-reply"
            style={{width: `calc(100% - ${comment.right}px)`, marginTop: '2px'}}>
            <p>{`${comment.user.first_name} ${comment.user.last_name} replied`} <span className="dot_divider">·</span> {`${comment.counts.reply} ${comment.counts.reply === 1 ? 'Reply' : 'Replies'} `}</p>
          </div>
        </div>
        : <div
          key={comment.id}
          className={'comment' + (comment.right > 0 ? ' comment-reply' : '')}
          style={{marginLeft: comment.right}}
          onClick={(e) => this._toUserStoryLine(comment.user.slug, e)}
        >
          <img
            src={comment.user.avatar32}
            style={{
              cursor: 'pointer',
              width: comment.right > 0 ? '20px' : '32px',
              minWidth: comment.right > 0 ? '20px' : '32px',
              height: comment.right > 0 ? '20px' : '32px',
            }}
          />
          <div
            className="text-block"
            style={{width: `calc(100% - ${comment.right}px)`}}>
            <p>
              <a href="#">
                {`${comment.user.first_name} ${comment.user.last_name}`}
              </a>
              {comment.content}
            </p>
            <span
              className="reply"
              onClick={() => this.reply(comment.id)}>Reply</span>
            <span> · </span>
            <span className="date">{comment.date}</span>

            {/* REPLY COMMENT */}
            {this.state.parent_id === comment.id &&
              <div
                className="reply-comment"
                style={{display: this.state.showReply ? 'flex' : 'none', width: `calc(100% - ${comment.right}px)`}}
              >
                <img src={this.props.authorized_user.avatar32} alt=""/>
                <Textarea
                  placeholder="Write a reply..."
                  onKeyDown={this.handleKeyPress}
                />
              </div>
            }
          </div>

          <ButtonToolbar>
            <DropdownButton className="profileMenu-btn" title={''} id={comment.id} noCaret pullRight>
              <li>
                <p>Edit Comment</p>
              </li>
              <li>
                <p>Delete Comment</p>
              </li>
              <li>
                <p>Report Comment</p>
              </li>
            </DropdownButton>
          </ButtonToolbar>
        </div>
    ));
    // return arrResult.map((comment, index) => (
    //   <div className={'comment' + (comment.right > 0 ? ' comment-reply' : '')} key={comment.id} style={{marginLeft: comment.right}}>
    //     <img
    //       src={comment.user.avatar32}
    //       style={{
    //         width: comment.right > 0 ? '20px' : '32px',
    //         minWidth: comment.right > 0 ? '20px' : '32px',
    //         height: comment.right > 0 ? '20px' : '32px',
    //       }}
    //     />
    //     <div className="text-block" style={{width: `calc(100% - ${comment.right}px)`}}>
    //       <p><Link>{`${comment.user.first_name} ${comment.user.last_name}`}</Link>9999</p>
    //     </div>
    //   </div>
    // ));
  }

  shareStory = () => {
    const { path, id, user } = this.props;
    let url = null;

    if (~path.indexOf('/books/')) {
      url = `http://futurama11001111.validbook.org${path}/${id}`;
    } else if (~path.indexOf('/story/')) {
      url = `http://futurama11001111.validbook.org/${user.slug}/story/${id}`;
    } else {
      url = `http://futurama11001111.validbook.org/${user.slug}/storyline/${id}`;
    }
    
    return url;
  }

  render() {
    const {likes, id, comments, post, authorized_user, paginationComment, counts, path, showReplies} = this.props;
    const {showComment} = this.state;

    const tooltipLike = (
      <Tooltip id="tooltipLike" arrowOffsetLeft={10}>
        {likes.people_list && likes.people_list.map((people) => (
          <div key={people.user.id}>{people.user.fullName}</div>
        ))}
      </Tooltip>
    );

    return (
      <div>
        <div className="post-footer">
          {/*<div className="post-like post-like-active" onClick={() => this.like(id)}>*/}
          <div
            className={!likes.is_liked ? 'post-like' : 'post-like post-like-active'}
            onClick={() => this.props.likeFunc(id)}>
            <i className="post-action-icon"/>
            <span>Like</span>
          </div>
          <div className="post-comment" onClick={() => this.openCommentBlock()}>
            <i className="post-action-icon"/>
            <span>Comment</span>
          </div>
          <div className="post-log">
            <i className="post-action-icon"/>
            <span>Save</span>
            <LogStory
              storyID={id}
            />
          </div>
          <div className="post-share">
            <div className="wrapper" style={{position: 'relative'}}>
              <i className="post-action-icon"/>
              <span>Share</span>
              <div className="list-of-social-share">
                <FacebookShareButton
                  url={this.shareStory()}
                  className="Demo__some-network__share-button"
                >
                  <div className="share-facebook"><i className="fa fa-facebook" aria-hidden="true"/></div>
                </FacebookShareButton>

                <TwitterShareButton
                  url={this.shareStory()}
                  className="Demo__some-network__share-button"
                >
                  <div className="share-twitter"><i className="fa fa-twitter" aria-hidden="true"/></div>
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </div>

        <div className="post-lc">
          <div className="post-like-field" onClick={this.Open} style={{display: likes.qty !== 0 ? 'block' : 'none'}}>
            <i className="post-action-icon"/>
            <OverlayTrigger placement="top" overlay={tooltipLike} id="tooltipLike" arrowOffsetLeft={200}>
              <span>
                {this.loadLikeInfo(likes.people_list)}
              </span>
            </OverlayTrigger>
          </div>

          <div
            className="post-comment-field"
            style={{display: (!showComment && (path === '/' && comments.length === 0)) ? 'none' : 'block'}}
          >
            <div className="comments">
              {(comments.length !== counts.comments && counts.comments > 3) &&
                <div
                  className="show-more-comments"
                  onClick={() => this.props.showMoreCommentsFunc(id, paginationComment)}
                >
                  <p>{`View ${counts.comments - comments.length} more ${counts.comments - comments.length === 1 ? 'comment' : 'comments'}`}</p>
                  <p style={{color: '#90949d'}}>{`${comments.length} of ${counts.comments}`}</p>
                </div>
              }
              {this.replyComments(comments)}
            </div>

            <div className="new-comment">
              <img src={this.props.authorized_user.avatar32} alt=""/>
              <Textarea
                placeholder="Write a comment..."
                onKeyDown={this.handleKeyPress}
              />
            </div>
          </div>
        </div>

        <Modal className="modal-likes" show={this.state.showModal} onHide={this.Close}>
          <Modal.Header closeButton>
            <span>All {likes.qty}</span>
          </Modal.Header>

          <Modal.Body>
            {likes.people_list.map((people) => (
              <div key={people.user.id} className="people-like-card">
                <Link to={people.user.slug}>
                  <img src={people.user.avatar}/>
                  <div>{people.user.fullName}</div>
                </Link>
              </div>
            ))}
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

PostFooter.propTypes = {
  likes: PropTypes.object,
  id: PropTypes.number,
  createComment: PropTypes.func,
  post: PropTypes.string,
  likeFunc: PropTypes.func,
  comments: PropTypes.array,
  authorized_user: PropTypes.object,
  creatingNewComment: PropTypes.bool,
  showMoreCommentsFunc: PropTypes.func,
  paginationComment: PropTypes.number,
  counts: PropTypes.object,
};

export default PostFooter;
