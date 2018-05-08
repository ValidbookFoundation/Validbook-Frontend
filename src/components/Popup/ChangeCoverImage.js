import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from 'react-bootstrap';
import { getUser } from '../../actions/user';
import './index.scss';

@connect((state) => ({
  requested_user: state.user.requested_user,
  uploadingImage: state.user.uploadingImage,
}), {
  getUser,
})

export default class ChangeCoverImage extends Component {
  state = {
    showPopup: false,
    file: '',
    scale: 1.2,
    preview: null,
    picture: '',
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
      this.props.uploadUserCoverBase64(newImage);
      this.props.uploadUserCover(newImage, '', this.props.currentImage.name, size)
      .then(() => this.props.getUser(this.props.requested_user.slug))
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
        <Modal show={visible} onHide={this.Close} className="modal-channel user-cover-popup">
          <Modal.Header closeButton>
            <Modal.Title>Edit cover image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="wrapper-popup">
              <h4>Crop it</h4>
              <AvatarEditor
                ref={this.setEditorRef}
                image={currentImage.url}
                width={540}
                height={68}
                border={20}
                color={[255, 255, 255, 0.6]}
                scale={parseFloat(this.state.scale)}
                rotate={0}
                onSave={this.handleSave}
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

ChangeCoverImage.propTypes = {
  showPopUp: PropTypes.func,
  uploadUserCover: PropTypes.func,
  uploadUserCoverBase64: PropTypes.func,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  uploadingImage: PropTypes.bool,
  getUser: PropTypes.func,
  requested_user: PropTypes.object,
};
