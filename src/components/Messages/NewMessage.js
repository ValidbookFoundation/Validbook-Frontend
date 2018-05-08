import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import Textarea from 'react-textarea-autosize';
import {
  getConversationByUser,
  createMessage,
  firstLoadMessages,
  hasMoreMessages,
  paginationMessages,
  loadNextMessagesByUser,
} from '../../actions/profile';
import { newSearchUser } from '../../actions/search';
import './index.scss';

@connect((state) => ({
  foundUsers: state.search.foundUsers,
  conversation: state.profile.conversation,
  authorized_user: state.user.authorized_user,
  activeMessageInput: state.profile.activeMessageInput,
  infoAboutTemporaryUser: state.profile.infoAboutTemporaryUser,
  needLoadTemporaryConversation: state.profile.needLoadTemporaryConversation,
  paginationMessages: state.profile.paginationMessages,
  hasMoreMessages: state.profile.hasMoreMessages,
  firstLoadMessages: state.profile.firstLoadMessages,
}), {
  getConversationByUser,
  newSearchUser,
  createMessage,
  loadNextMessagesByUser,
})

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: {
        fullName: [],
        id: []
      },
      hideTypeahead: false,
    };
    this.linkify = this.linkify.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addCheckedUser = this.addCheckedUser.bind(this);
    this.deleteSearchUser = this.deleteSearchUser.bind(this);
  }

  componentDidMount() {
    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
    if (this.props.infoAboutTemporaryUser.first_name) {
      this.setState({
        checkedUsersID: {
          fullName: [`${this.props.infoAboutTemporaryUser.first_name} ${this.props.infoAboutTemporaryUser.last_name}`],
          id: [this.props.infoAboutTemporaryUser.id]
        },
        hideTypeahead: false
      });
    }
    // if (!this.props.activeMessageInput) {
      //     this.inputMessage.focus();
      //   } else {
      //     this.inputMessagePost.focus();
      //   }
  }

  componentDidUpdate() {
    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
  }

  deleteSearchUser(event) {
    if (event.keyCode === 8 && this.state.checkedUsersID.fullName.length > 0 && !event.target.value) {
      const deleteLastCheckedUsersID = this.state.checkedUsersID;
      deleteLastCheckedUsersID.fullName.splice(-1, 1);
      deleteLastCheckedUsersID.id.splice(-1, 1);

      this.setState({ checkedUsersID: deleteLastCheckedUsersID });
      this.props.getConversationByUser(this.state.checkedUsersID.id.toString(), this.state.checkedUsersID.fullName.toString());
      console.log('backspace', this.state.checkedUsersID);
    }
    // console.log(event.target.value);
  }

  handleSearchUser(event) {
    // console.log('this.state.hideTypeahead', this.state.hideTypeahead);
    if (this.state.hideTypeahead) {
      this.setState({ hideTypeahead: false });
    }
    this.props.newSearchUser(event.target.value);
  }

  addCheckedUser(user) {
    const currentCheckedUsersID = this.state.checkedUsersID;
    currentCheckedUsersID.fullName.push(` ${user.first_name} ${user.last_name}`);
    currentCheckedUsersID.id.push(user.id);

    this.setState({ checkedUsersID: currentCheckedUsersID, hideTypeahead: true });
    this.props.getConversationByUser(this.state.checkedUsersID.id.toString(), this.state.checkedUsersID.fullName.toString());
    this.inputMessage.value = '';
    this.inputMessage.focus();
  }

  handleKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      const conversationID = this.props.conversation.conversation_id || null;

      Promise.resolve(this.props.createMessage(
        event.target.value,
        conversationID,
        Array.from(this.state.checkedUsersID.id, item => parseInt(item, 10))  // str -> number
      ))
        .then(event.target.value = '')
        .then(value => {
          if (conversationID !== value.data.conversation_id) {
            browserHistory.push(`/chats/${value.data.conversation_id}`);
          } else {
            browserHistory.push(`/chats/${conversationID}`);
          }
        });
    }
  }

  linkify(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return `${text.replace(urlRegex, url => `<a href="${url}">${url}</a>`)}`;
  }

  onBlur(e) {
    const currentTarget = e.currentTarget;
    const x = this.findUsers;
    setTimeout(() => {
      if (x.contains(document.activeElement)) {
        console.log('qwerty3');
        this.setState({
          hideTypeahead: false,
        });
      } else if (!currentTarget.contains(document.activeElement)) {
        console.log('qwerty2', document.activeElement);
        this.setState({
          hideTypeahead: true,
        });
      }
    }, 0);
  }

  loadMessages() {
    if (this.props.firstLoadMessages) {
      this.props.loadNextMessagesByUser(
        this.state.checkedUsersID.id.toString(), this.state.checkedUsersID.fullName.toString(), this.props.paginationMessages);
      console.log('it"s true scroll, page:', this.props.paginationMessages);
    }
    console.log('it"s scroll');
  }

  render() {
    const { foundUsers, conversation, authorized_user, activeMessageInput } = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          <div className="additional-title">

            <div style={{display: this.state.checkedUsersID.fullName.length > 0 ? 'flex' : 'inline-flex'}}>
              <span style={{fontWeight: 400, fontSize: '13px'}}>To:</span>
              <div className="list-of-found-users">
                { this.state.checkedUsersID && this.state.checkedUsersID.fullName.map((user, index) => (
                  <span key={index}>{user}</span>
               ))}
              </div>
            </div>

            <input
              type="text"
              className="messages-input"
              placeholder={this.state.checkedUsersID.fullName.length > 0 ? '' : 'Type the name of a person'}
              autoFocus={activeMessageInput === false}
              tabIndex={0}
              onBlur={this.onBlur}
              // onFocus={this.setState({hideTypeahead: true})}
              onChange={this.handleSearchUser}
              onKeyDown={this.deleteSearchUser}
              ref={el => this.inputMessage = el}
              style={{position: this.state.checkedUsersID.fullName.length > 0 ? 'relative' : 'static'}}
            />
            { !this.state.hideTypeahead && foundUsers.length > 0 &&
              <div className="wrapper-find-users" ref={el => this.findUsers = el}>
                { foundUsers && foundUsers.map((user, index) => (
                  <div key={user.id} tabIndex={index} className="found-user" onClick={() => this.addCheckedUser(user)}>
                    <img src={user.avatar}/>
                    <p>{user.first_name} {user.last_name}</p>
                  </div>
              ))}
              </div>
            }
          </div>

          <div className="messages-box" ref={(el) => this.messageBlock = el}>
            <InfiniteScroll
              loadMore={this.loadMessages}
              hasMore={this.props.hasMoreMessages}
              threshold={20}
              isReverse={true}
              // loader={loader}
              useWindow={false}
            >
            { conversation.messages && conversation.messages.map((message, i, arr) => (
              (message.is_tech === 0 &&
              <div key={message.id}>
                {/*message.date.substring(0, 2) ===  it's a day*/}
                { (i === 0 || (i > 0 && message.date.substring(0, 2) !== arr[i - 1].date.substring(0, 2))) &&
                  <div className="time-divider">
                    <span>{message.date.substring(0, 11)}</span>
                  </div>
                  }

                {((i === 0 || (message.is_tech !== arr[i - 1].is_tech) || (i > 0 && message.user.id !== arr[i - 1].user.id)) &&
                  <div className={message.user.id === authorized_user.id ? 'messages-post messages-post-reverse' : 'messages-post'}>
                    {message.user.id !== authorized_user.id &&
                    <div style={{width: '33px'}}>
                      <Link to={`/${message.user.slug}`}>
                        <img src={message.user.avatar} alt=""/>
                      </Link>

                      <Link to={`/${message.user.slug}`} style={{position: 'relative', top: '-17px'}}>
                        <h5>{message.user.first_name}</h5>
                      </Link>
                    </div>
                    }

                    <div style={{display: 'flex', marginLeft: '14px'}}>
                      <p title={message.date.substring(0, 17)} dangerouslySetInnerHTML={{__html: this.linkify(message.text)}}/>
                      <div className="wrapper-settings">
                        <div className="message-settings" onClick={this.openMessageSettings}>
                          <i>...</i>
                          <div style={{display: this.state.messageSetting ? 'block' : 'none'}}>
                            <ul>
                              <li onClick={() => this.props.deleteMessage(message.id)}>Delete</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                ||
                <div className={message.user.id === authorized_user.id ?
                  'messages-post messages-post-reverse messages-post-repeat' : 'messages-post messages-post-repeat'}>
                  <div style={{display: 'flex', marginLeft: '14px'}}>
                    <p title={message.date.substring(0, 17)} dangerouslySetInnerHTML={{__html: this.linkify(message.text)}}/>
                    <div className="wrapper-settings">
                      <div className="message-settings" onClick={this.openMessageSettings}>
                        <i>...</i>
                        <div style={{display: this.state.messageSetting ? 'block' : 'none'}}>
                          <ul>
                            <li onClick={() => this.props.deleteMessage(message.id)}>Delete</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                }
              </div>
              )
              ||
              <div key={message.id}>
                {(i === 0 || (i > 0 && message.date.substring(0, 2) !== arr[i - 1].date.substring(0, 2))) &&
                <div className="time-divider">
                  <span>{message.date.substring(0, 11)}</span>
                </div>
                }
                <div className="messages-post-tech">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            </InfiniteScroll>
          </div>

          <div className="messages-send">
            <div className="wrapper">
              <Textarea
                placeholder="Type a message"
                ref={el => this.inputMessagePost = el}
                autoFocus={activeMessageInput}
                onKeyDown={this.handleKeyPress}
                />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

NewMessage.propTypes = {
  foundUsers: PropTypes.array,
  newSearchUser: PropTypes.func,
  getConversationByUser: PropTypes.func,
  createMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
  conversation: PropTypes.object,
  authorized_user: PropTypes.object,
  infoAboutTemporaryUser: PropTypes.object,
  activeMessageInput: PropTypes.boolean,
  firstLoadMessages: PropTypes.boolean,
  hasMoreMessages: PropTypes.boolean,
  paginationMessages: PropTypes.number,
  loadNextMessagesByUser: PropTypes.func,
};

export default NewMessage;
