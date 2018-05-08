import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Textarea from 'react-textarea-autosize';
import {Modal} from 'react-bootstrap';
import {
  getConversationByID,
  createMessage,
  deleteMessage,
  getConversationID,
  addMember,
  loadNextMessagesByID,
} from '../../actions/profile';
import {newSearchUser} from '../../actions/search';
import './index.scss';

@connect((state) => ({
  foundUsers: state.search.foundUsers,
  conversation: state.profile.conversation,
  conversations: state.profile.conversations,
  authorized_user: state.user.authorized_user,
  gettingConversation: state.profile.gettingConversation,
  paginationMessages: state.profile.paginationMessages,
  hasMoreMessages: state.profile.hasMoreMessages,
  firstLoadMessages: state.profile.firstLoadMessages,
  sendingMessage: state.profile.sendingMessage,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  getConversationByID,
  getConversationID,
  createMessage,
  deleteMessage,
  newSearchUser,
  addMember,
  loadNextMessagesByID
})

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: {
        fullName: [],
        id: []
      },
      showModal: false,
      messageSetting: false,
      showAddSearch: false,
      hideTypeahead: false,
      // conversationID: this.props.conversation.conversation_id,
    };

    this.Open = this.Open.bind(this);
    this.Close = this.Close.bind(this);
    this.linkify = this.linkify.bind(this);
    this.clearMembers = this.clearMembers.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.getReceivers = this.getReceivers.bind(this);
    this.filterMembers = this.filterMembers.bind(this);
    this.confirmMembers = this.confirmMembers.bind(this);
    this.addCheckedUser = this.addCheckedUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.deleteMembers = this.deleteMembers.bind(this);
    this.toggleAddSearch = this.toggleAddSearch.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.openMessageSettings = this.openMessageSettings.bind(this);
  }

  componentDidMount() {
    const {path, conversations, getConversationByID} = this.props;

    function getConversationID(path) {
      const id = path.substring(path.indexOf('/chats') + 7);
      if (id) {
        return id;
      }
      if (conversations.length > 0) {
        return conversations[0].conversation_id;
      }
    }

    if (getConversationID(path)) {
      getConversationByID(getConversationID(path));
    }
    // console.log('<!----', getConversationID(path));

    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
    // console.log('123', this.messageBlock.scrollHeight, this.messageBlock.scrollTop);
  }

  // componentWillMount() {
  //   this.messageBlock.scrollTop = 200;
  // }

  componentWillReceiveProps() {
    if (this.props.gettingConversation) {
      this.clearMembers();
    }
  }

  componentWillUpdate(nextProps) {
    // console.log('paginationMessages2', this.props.paginationMessages, nextProps, 'scroll:', this.messageBlock.scrollTop);
    if (nextProps.firstLoadMessages && !nextProps.sendingMessage) {
      this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
      // this.messageBlock.scrollTop = 800;
      // console.log('123', this.messageBlock.scrollHeight, this.messageBlock.scrollTop, this.props.sendingMessage);
    } else if (!nextProps.firstLoadMessages) {
      this.messageBlock.scrollTop = 200;
      // console.log('3215', this.messageBlock.scrollHeight, this.messageBlock.scrollTop);
    }
  }

  componentDidUpdate() {
    if (this.props.sendingMessage || this.props.firstLoadMessages) {
      this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
    }
    //     console.log('paginationMessages', this.props.paginationMessages);
    //     if (this.props.firstLoadMessages) {
    //       this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
    //       // this.messageBlock.scrollTop = 800;
    //       console.log('12345', this.messageBlock.scrollHeight, this.messageBlock.scrollTop);
    //     }
    // else {
    //       this.messageBlock.scrollTop = 250;
    //       console.log('3215', this.messageBlock.scrollHeight, this.messageBlock.scrollTop);
    //     }
  }

  Close() {
    this.setState({showModal: false});
  }

  Open() {
    this.setState({showModal: true});
  }

  handleSearchUser(event) {
    // console.log('this.state.hideTypeahead', this.state.hideTypeahead);
    if (this.state.hideTypeahead) {
      this.setState({hideTypeahead: false});
    }
    this.props.newSearchUser(event.target.value);
  }

  handleKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      this.props.createMessage(
        event.target.value,
        this.props.conversation.conversation_id,
        this.props.conversation.receiversID
      )
        .then(event.target.value = '');
      // .then(this.messageBlock.scrollTop = 200);
    }
  }

  openMessageSettings() {
    console.log('click2', this.state.messageSetting);
    const currentState = this.state.messageSetting;
    this.setState({messageSetting: !currentState});

    return this.state.messageSetting;
  }

  clearMembers() {
    const emptyCheckedUsersID = this.state.checkedUsersID;
    emptyCheckedUsersID.fullName = [];
    emptyCheckedUsersID.id = [];
    this.setState({
      checkedUsersID: emptyCheckedUsersID,
      showAddSearch: false
    });
  }

  getReceivers(receivers) {
    let result;
    const receiversArr = [];

    if (receivers.length === 1) {
      result = `${receivers[0].first_name} ${receivers[0].last_name}`;
    } else if (receivers.length > 1) {
      receivers.map(receiver => {
        receiversArr.push(` ${receiver.first_name}`);
      });
      result = receiversArr.toString();
    }

    return result;
  }

  addCheckedUser(user) {
    const currentCheckedUsersID = this.state.checkedUsersID;
    currentCheckedUsersID.fullName.push(` ${user.first_name} ${user.last_name}`);
    currentCheckedUsersID.id.push(user.id);

    this.setState({checkedUsersID: currentCheckedUsersID, hideTypeahead: true});
    this.inputAddMember.value = '';
    this.inputAddMember.focus();
  }

  confirmMembers() {
    this.props.addMember(this.props.conversation.conversation_id, this.state.checkedUsersID.id)
      .then(this.clearMembers());
  }

  deleteMembers(event) {
    // if (event.keyCode === 13 && !event.shiftKey) {
    //   event.preventDefault();
    //   this.props.addMember(this.props.conversation.conversation_id, this.state.checkedUsersID.id);
    // }
    if (event.keyCode === 8 && this.state.checkedUsersID.fullName.length > 0 && !event.target.value) {
      const deleteLastCheckedUsersID = this.state.checkedUsersID;
      deleteLastCheckedUsersID.fullName.splice(-1, 1);
      deleteLastCheckedUsersID.id.splice(-1, 1);
      this.setState({checkedUsersID: deleteLastCheckedUsersID});
    }
  }

  toggleAddSearch() {
    this.setState({
      showAddSearch: !this.state.showAddSearch
    });
  }

  filterMembers(globalUsers, receiversUsers) {
    function filter(arr, func) {
      const result = [];

      for (let i = 0; i < arr.length; i++) {
        if (!func(arr[i].id)) {
          result.push(arr[i]);
        }
      }

      return result;
    }

    function inArray(arr) {
      return x => arr.includes(x);
    }

    return filter(globalUsers, inArray(receiversUsers));
  }

  linkify(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return `${text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`)}`;
  }

  loadMessages() {
    if (this.props.firstLoadMessages && !this.props.gettingConversation && this.props.conversation.conversation_id) {
      this.props.loadNextMessagesByID(this.props.conversation.conversation_id, this.props.paginationMessages + 1);
      console.log('it"s true scroll, page:', this.props.paginationMessages);
    }
    console.log('it"s scroll', this.props.firstLoadMessages);
  }

  render() {
    const {conversation, authorized_user, foundUsers} = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          {conversation.receivers &&
          <div className="additional-title" style={{display: 'flex'}}>
            <div style={{width: '90%', display: this.state.showAddSearch ? 'none' : 'block', margin: '0 auto'}}>
              <span className="participants" style={{marginTop: conversation.receivers.length !== 1 ? '-5px' : '4px'}}>
                {this.getReceivers(conversation.receivers)}
              </span>
              <Participants
                Open={this.Open}
                Close={this.Close}
                showModal={this.state.showModal}
                participants={conversation.receivers}
              />
            </div>
            {conversation.receivers.length !== 1 &&
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: this.state.showAddSearch ? '100%' : 'auto'
              }}>
              {this.state.showAddSearch &&
              <div>
                <div style={{display: this.state.checkedUsersID.fullName.length > 0 ? 'flex' : 'inline-flex'}}>
                  <span style={{fontWeight: 400, fontSize: '13px'}}>To:</span>
                  <div className="list-of-found-users">
                    {this.state.checkedUsersID && this.state.checkedUsersID.fullName.map((user, index) => (
                      <span key={index}>{user}</span>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  className="messages-input"
                  placeholder={this.state.checkedUsersID.fullName.length > 0 ? '' : 'Add more people...'}
                  onChange={this.handleSearchUser}
                  onKeyDown={this.deleteMembers}
                  autoFocus={true}
                  ref={el => this.inputAddMember = el}
                  style={{position: this.state.checkedUsersID.fullName.length > 0 ? 'relative' : 'static'}}
                />
                <div
                  className="btn-brand add-members"
                  style={{display: this.state.checkedUsersID.fullName.length > 0 ? 'block' : 'none'}}
                  onClick={this.confirmMembers}
                >
                  Add
                </div>
                {!this.state.hideTypeahead && foundUsers.length > 0 &&
                <div className="wrapper-find-users">
                  {foundUsers && this.filterMembers(foundUsers, conversation.receiversID).map(user => (
                    <div key={user.id} className="found-user" onClick={() => this.addCheckedUser(user)}>
                      <img src={user.avatar}/>
                      <p>{user.first_name} {user.last_name}</p>
                    </div>
                  ))}
                </div>
                }
              </div>
              }
              <i
                className={!this.state.showAddSearch ? 'add-member' : 'add-member add-member-cross'}
                onClick={this.toggleAddSearch} style={{fontStyle: 'normal'}}
                title="Add People"
              />
            </div>
            }
          </div>
          }

          {!conversation.conversation_id &&
          <div className="wrapper-loader">
            <div className="loader" style={{position: 'static'}}>
              <svg className="circular" viewBox="25 25 50 50" style={{width: '75px'}}>
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
              </svg>
            </div>
          </div>
          }

          <div className="messages-box" ref={el => this.messageBlock = el}>
            <InfiniteScroll
              loadMore={this.loadMessages}
              hasMore={this.props.hasMoreMessages}
              threshold={50}
              isReverse={true}
              initialLoad={false}
              // loader={loader}
              useWindow={false}
            >
              {/*<div>*/}
              {conversation.messages && conversation.messages.map((message, i, arr) => (
                (message.is_tech === 0 &&
                  <div key={message.id}>
                    {/*message.date.substring(0, 2) ===  it's a day*/}
                    {(i === 0 || (i > 0 && message.date.substring(0, 2) !== arr[i - 1].date.substring(0, 2))) &&
                    <div className="time-divider">
                      <span>{message.date.substring(0, 11)}</span>
                    </div>
                    }
                    {((i === 0 || (message.is_tech !== arr[i - 1].is_tech) || (i > 0 && message.user.id !== arr[i - 1].user.id)) &&
                      <div
                        className={message.user.id === authorized_user.id ? 'messages-post messages-post-reverse' : 'messages-post'}>
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
                          <p title={message.date.substring(0, 17)}
                             dangerouslySetInnerHTML={{__html: this.linkify(message.text)}}
                          />
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
                    <div
                      className={message.user.id === authorized_user.id ?
                        'messages-post messages-post-reverse messages-post-repeat' : 'messages-post messages-post-repeat'}>
                      <div style={{display: 'flex', marginLeft: '14px'}}>
                        <p title={message.date.substring(0, 17)}
                           dangerouslySetInnerHTML={{__html: this.linkify(message.text)}}/>
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
              {/*</div>*/}
            </InfiniteScroll>
          </div>
          {conversation.conversation_id && (
            <div className="messages-send">
              <div className="wrapper">
                <Textarea
                  placeholder="Type a message..."
                  autoFocus={true}
                  onKeyDown={this.handleKeyPress}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  conversation: PropTypes.object,
  createMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
  addMember: PropTypes.func,
  newSearchUser: PropTypes.func,
  authorized_user: PropTypes.object,
  foundUsers: PropTypes.array,
  gettingConversation: PropTypes.boolean,
  firstLoadMessages: PropTypes.boolean,
  hasMoreMessages: PropTypes.boolean,
  paginationMessages: PropTypes.number,
  loadNextMessagesByID: PropTypes.func,
  sendingMessage: PropTypes.boolean,
  getConversationByID: PropTypes.func,
  conversations: PropTypes.array,
  path: PropTypes.string,
};

const Participants = ({Open, Close, showModal, participants}) => {
  return (
    <div onClick={Open}>
      {participants.length !== 1 &&
      <span className="quantity-participants">{`${participants.length} Participants`}</span>}

      <Modal show={showModal} onHide={Close} className="modal-log avatar-popup">
        <Modal.Header closeButton>
          <Modal.Title>Participants</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {participants && participants.map(participant => (
            <div key={participant.id}>
              <div style={{display: 'flex', padding: '5px 15px'}}>
                <img src={participant.avatar} style={{width: '45px', height: '45px'}} alt=""/>
                <p
                  style={{
                    position: 'relative',
                    top: '12px',
                    left: '10px'
                  }}>{`${participant.first_name} ${participant.last_name}`}</p>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

Participants.propTypes = {
  Open: PropTypes.func,
  Close: PropTypes.func,
  showModal: PropTypes.boolean,
  participants: PropTypes.array,
};
