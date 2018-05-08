import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './twitter-user-name-modal.scss'; 

class TwitterUserNameModal extends Component {

  onSaveChangesClick = () => {
    const user_name = this.userName && this.userName.value;
    const user_account = `https://twitter.com/${user_name}`;
    const property = 'twitter';

    this.props.saveTwitterUserNameHandler(user_name, property, user_account);
  }
  render() {
    const { showModal, closeModalHandler, saveTwitterUserNameHandler } = this.props;

    return (
      <Modal
        dialogClassName="twitter-username"
        show={showModal}
        onHide={closeModalHandler || saveTwitterUserNameHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Link your Twitter digital property</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="twitter-user-name-modal-body">
            <div className="input-label">
              <span>Please enter your Twitter username.</span>
            </div>
            <div className="user-name-field">
              <span className="input-group-addon">@</span>
              <input type="text" name="username" ref={el => this.userName = el}/>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button 
            className="btn-brand btn-cancel" 
            onClick={closeModalHandler}>Cancel</button>
          <button 
            className="btn-brand" 
            style={{marginLeft: '16px'}} 
            onClick={this.onSaveChangesClick}>Continue</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TwitterUserNameModal;
