import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import {Modal} from 'react-bootstrap';
import {upload as uploadBookCover} from '../../actions/book';
import './index.scss';

@connect((state) => ({
  bookCover: state.book.bookCover,
  uploading: state.book.uploading,
}), {
  uploadBookCover
})

export default class ChangeBookCoverImage extends Component {
  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({scale});
  };

  Close() {
    this.props.showPopUp(false, '');
  }

  Open() {
    this.props.showPopUp(true);
  }

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      file: '',
      scale: 1.2,
      preview: null,
      picture: '',
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  };

  handleSave() {
    const newImage = this.editor.getImage().toDataURL('image/jpeg', 0.92);
    this.setState({picture: newImage});
    this.props.uploadBookCoverBase64(newImage);
    this.props.uploadBookCover(newImage, '', this.props.book.id, this.props.currentImage.name)
    // .then(() => this.props.getUser(this.props.bookCover.id))
      .then(() => this.Close());
  }

  render() {
    const {uploading, visible, currentImage} = this.props;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <Modal show={visible} onHide={this.Close} className="modal-channel">
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
                height={200}
                border={20}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={parseFloat(this.state.scale)}
                rotate={0}
                onSave={this.handleSave}
                style={uploading ? {opacity: 0.3} : {opacity: 1}}
              />
              {uploading &&
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
            <br/>
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
              <button className="btn-brand" style={{marginLeft: '10px'}} type="submit" onClick={this.handleSave}>Crop
                and Save
              </button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

ChangeBookCoverImage.propTypes = {
  showPopUp: PropTypes.func,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  uploading: PropTypes.bool,
  uploadBookCover: PropTypes.func,
  uploadBookCoverBase64: PropTypes.func,
  book: PropTypes.object,
};
