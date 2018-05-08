import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from 'react-bootstrap';
import { getUser, getAuthUser } from '../../actions/user';
import { loadStories } from '../../actions/story';
import './index.scss';

@connect((state) => ({
  requested_user: state.user.requested_user,
  uploadingImage: state.user.uploadingImage,
}), {
  getUser,
  getAuthUser,
  loadStories
})

export default class ChangeAvatar extends Component {
  state = {
    showPopup: false,
    file: '',
    scale: 1.2,
    picture: '',
    loading: false
  }

  Close = () => {
    this.props.showPopUp(false, '');
  }
  Open = () => {
    this.props.showPopUp(true);
  }

  handleSave = () => {
    const { currentImage } = this.props;
    const newImage = this.editor.getImage().toDataURL('image/jpeg', 1.0);
    const img = new Image();
    img.onload = () => {
      const size = {
        original: `${img.width}x${img.height}`
      };

      this.setState({
        picture: newImage
      });
      this.props.uploadAvatarBase64(newImage);
      this.props.uploadAvatar(newImage, this.props.currentImage.name, size)
        .then(() => this.props.getUser(this.props.requested_user.slug))
        .then(() => this.props.getAuthUser())
        .then(() => this.props.loadStories(this.props.requested_user.slug))
        .then(() => this.Close());
    };
    img.src = currentImage.url;
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  render() {
    const { uploadingImage, visible, currentImage } = this.props;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <Modal show={visible} onHide={this.Close} className="modal-channel avatar-popup">
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile Image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="wrapper-popup">
              <h4>Crop it</h4>
              <div style={{width: '280px', margin: '0 auto'}}>
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={currentImage.url}
                  width={230}
                  height={230}
                  border={25}
                  color={[255, 255, 255, 0.6]}
                  scale={this.state.scale}
                  rotate={0}
                  style={uploadingImage ? {opacity: 0.3} : {opacity: 1}}
                />
                { uploadingImage &&
                  <div className="wrapper-loader">
                    <div className="loader">
                      <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                      </svg>
                    </div>
                  </div>
                }
              </div>
            </div>

            Zoom:
            <br />
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1.2"
            />
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button className="btn-brand" style={{marginLeft: '10px'}} type="submit" onClick={this.handleSave}>Crop and Save</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

ChangeAvatar.propTypes = {
  showPopUp: PropTypes.func,
  uploadAvatar: PropTypes.func,
  uploadAvatarBase64: PropTypes.func,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  uploadingImage: PropTypes.bool,
  getUser: PropTypes.func,
  getAuthUser: PropTypes.func,
  loadStories: PropTypes.func,
  requested_user: PropTypes.object,
};
