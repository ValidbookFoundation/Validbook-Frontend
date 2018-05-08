import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_APP_IDS } from './constants';
import './facebook-post-modal.scss'; 

class FacebookPostModal extends Component {

  onSaveChangesClick = () => {
    this.props.checkFacebookPostHandler();
  }

  onCreateFacebookPostClick = () => {
    this.props.createFacebookPostHandler();
  }

  responseFacebook = (response) => {
    this.props.createFacebookPostHandler(response);
  }

  render() {
    const { showModal, closeModalHandler, checkTweetHandler } = this.props;

    return (
      <Modal
        dialogClassName="facebook-post"
        show={showModal}
        onHide={closeModalHandler || checkTweetHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Link your Facebook identity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="facebook-post-body">
            <p>We will generate random number for you to post on your Facebook timeline as a verifiable proof of ownership. We'll ask for permission to read your posts, so that we can find this one afterwards. Please, make sure your post is <b>public</b>, like this:</p>
            
            <p className="public-post">
              <div className="public-post-gif"/>
            </p>
            
            <p>Ok, here it goes:</p>

            <FacebookLogin
              appId={FACEBOOK_APP_IDS.DEV}
              language="en_US"
              scope="public_profile,user_posts,email"
              fields="id,email,first_name,last_name,picture"
              callback={this.responseFacebook}
              tag="div"
              cssClass="facebook-login"
              version="v2.5"
              textButton=""
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button 
            className="btn-brand btn-cancel" 
            onClick={closeModalHandler}>Cancel</button>
          <button 
            className="btn-brand" 
            style={{marginLeft: '16px'}} 
            onClick={this.onSaveChangesClick}>Ok, I posted! Check for it</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FacebookLogin.PropTypes = {
  card: PropTypes.object,
  user_slug: PropTypes.string,
  showModal: PropTypes.boolean,
  closeModalHandler: PropTypes.func,
  createFacebookPostHandler: PropTypes.func
}

export default FacebookPostModal;
