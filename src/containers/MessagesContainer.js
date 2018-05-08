import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import ListMessage from '../components/Messages/ListMessage';
import {
  getConversationList,
  addTemporaryConversation,
  clearConversation
} from '../actions/profile';

@connect((state) => ({
  conversations: state.profile.conversations,
  needLoadTemporaryConversation: state.profile.needLoadTemporaryConversation
}), {
  getConversationList,
  addTemporaryConversation,
  clearConversation
})

class MessagesContainer extends Component {
  componentDidMount() {
    const {
      getConversationList,
      needLoadTemporaryConversation,
      clearConversation,
      addTemporaryConversation
    } = this.props;

    getConversationList()
      .then(() => {
        if (needLoadTemporaryConversation) {
          clearConversation();
          addTemporaryConversation();
        }
      });
  }

  render() {
    return (
      <div className="additional-wrap">
        <Helmet
          title="Chats - Validbook"
        />
        <ListMessage
          conversations={this.props.conversations}
        />
        {this.props.children}
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  children: PropTypes.element,
  conversations: PropTypes.array,
  getConversationList: PropTypes.func,
  needLoadTemporaryConversation: PropTypes.bool,
  clearConversation: PropTypes.func
};

export default MessagesContainer;
