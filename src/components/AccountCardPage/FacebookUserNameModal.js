import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './facebook-user-name-modal.scss'; 

class FacebookUserNameModal extends Component {

  openFacebookUserName = () => {
    window.open('https://www.facebook.com/settings?tab=account&section=username');
  }

  onSaveChangesClick = () => {
    this.props.saveFacebookUserNameHandler(this.userName && this.userName.value);
  }
  render() {
    const { showModal, closeModalHandler, saveTwitterUserNameHandler } = this.props;

    return (
      <Modal
        dialogClassName="facebook-username"
        show={showModal}
        onHide={closeModalHandler || saveTwitterUserNameHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Link your Facebook digital property</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="facebook-user-name-modal-body">
            <div className="open-in-new-tab">
              <span>Please enter your Facebook username. You can find it in your</span>
              <span className="open-in-new-tab-icon"/>
              <a href="#" onClick={this.openFacebookUserName}>Facebook settings.</a>
            </div>
            <div className="user-name-field">
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

export default FacebookUserNameModal;
