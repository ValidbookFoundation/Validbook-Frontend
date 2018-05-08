import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  clearConversation, deleteConversation, leftConversation, searchConversation, readConversation,
  loadNextConversations, getConversationByID
} from '../../actions/profile';
import {clearUserResult} from '../../actions/search';
import './index.scss';

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  conversation: state.profile.conversation,
  paginationConversations: state.profile.paginationConversations,
  hasMoreConversations: state.profile.hasMoreConversations,
}), {
  clearConversation,
  deleteConversation,
  leftConversation,
  searchConversation,
  readConversation,
  loadNextConversations,
  clearUserResult,
  getConversationByID
})

class ListMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
    };
    this.getReceivers = this.getReceivers.bind(this);
    this.whoWroteMessage = this.whoWroteMessage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.groupAvatars = this.groupAvatars.bind(this);
    this.loadConversations = this.loadConversations.bind(this);
    this.clear = this.clear.bind(this);
    this.openConversation = this.openConversation.bind(this);
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

  handleSearch(event) {
    this.props.searchConversation(event.target.value);
  }

  groupAvatars(receivers) {
    switch (receivers.length) {
      case 1:
        return (
          <div className="wrapper-avatars">
            <img src={receivers[0].avatar} alt=""/>
          </div>
        );
      case 2:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half">
              <img src={receivers[1].avatar} alt=""/>
            </div>
          </div>
        );

      default:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half grid-half-1">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half grid-half-2">
              <div className="grid-fourth">
                <img src={receivers[1].avatar} alt=""/>
              </div>
              <div className="grid-fourth">
                <img src={receivers[2].avatar} alt=""/>
              </div>
            </div>
          </div>
        );
    }
  }

  loadConversations() {
    this.props.loadNextConversations(this.props.paginationConversations);
  }

  whoWroteMessage(message, receivers) {
    if (message.user.id === this.props.authorized_user.id) {
      return `You: ${message.text}`;
    }
    if (receivers.length > 1) {
      return `${message.user.first_name}: ${message.text}`;
    }
    return message.text;
  }

  clear(id) {
    // this.props.clearConversation();
    this.props.getConversationByID(id);
    this.props.clearUserResult();
  }

  openConversation(id) {
    if (this.props.conversation.conversation_id !== id) {
      this.props.readConversation(id);
      this.props.getConversationByID(id);
    }
    this.props.clearUserResult();
  }

  render() {
    const {conversations, authorized_user} = this.props;

    return (
      <div className="messages-mnu">
        <div className="additional-title">Chats
          <Link to="/chats/new" className="new-message" onClick={this.clear} title="New Message"><i/></Link>
        </div>

        <ul className="conversations-list">
          <div className="messages-search">
            <input type="text" placeholder="Search" onChange={this.handleSearch}/>
            <i/>
          </div>

          <InfiniteScroll
            loadMore={this.loadConversations}
            hasMore={this.props.hasMoreConversations}
            threshold={75}
            // loader={loader}
            useWindow={false}
          >
            {conversations.length === 0 && <li style={{padding: '10px 15px'}}>No conversations found</li>}

            {conversations && conversations.map(conversation => (
              <div
                className={conversation.is_seen ? 'conversation' : 'conversation conversation-not-seen'}
                key={conversation.conversation_id}
                onClick={() => this.openConversation(conversation.conversation_id)}
              >
                <Link
                  to={`/chats/${conversation.conversation_id}`}
                  onlyActiveOnIndex={true}
                  activeClassName="active"
                >
                  <li>
                    {this.groupAvatars(conversation.receivers)}
                    <h5>{this.getReceivers(conversation.receivers)}</h5>
                  </li>
                  <span>{conversation.messages.length > 0 && conversation.messages[0].date.substring(11, 17)}</span>
                  <div className="tooltip-date">
                    {conversation.messages.length > 0 && conversation.messages[0].date.substring(0, 11)}
                  </div>
                  {conversation.messages.length > 0 &&
                  <p>{this.whoWroteMessage(conversation.messages[0], conversation.receivers)}</p>
                  }
                </Link>
                <div className="conversation-settings">
                  <i/>
                  <div>
                    <ul>
                      {conversation.receivers.length > 1 &&
                      <li
                        onClick={() => this.props.leftConversation(conversation.conversation_id, authorized_user.first_name)}>
                        Leave Group</li>
                      }
                      <li onClick={() => this.props.deleteConversation(conversation.conversation_id)}>Delete</li>
                      <li>Report Spam or Abuse...</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

ListMessage.propTypes = {
  conversation: PropTypes.object,
  conversations: PropTypes.array,
  clearConversation: PropTypes.func,
  deleteConversation: PropTypes.func,
  leftConversation: PropTypes.func,
  searchConversation: PropTypes.func,
  readConversation: PropTypes.func,
  authorized_user: PropTypes.object,
  loadNextConversations: PropTypes.func,
  paginationConversations: PropTypes.number,
  hasMoreConversations: PropTypes.boolean,
  clearUserResult: PropTypes.func,
  getConversationByID: PropTypes.func,
};

export default ListMessage;
