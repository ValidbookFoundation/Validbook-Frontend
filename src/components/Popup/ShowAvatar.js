import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.scss';

const ShowAvatar = ({ avatar, showModal, closeModalHandler }) => (
  <Modal 
    show={showModal} 
    onHide={closeModalHandler} 
    className="show_avatar_modal"
  >
    <img src={avatar} />
  </Modal>
);

ShowAvatar.propTypes = {
  avatar: PropTypes.string,
  showModal: PropTypes.bool,
  closeModalHandler: PropTypes.func
};

export default ShowAvatar;