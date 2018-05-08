import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import AutosizeInput from 'react-input-autosize';
import { 
  createDocument,
  getDocument,
  updateDocument,
  clearDocument
} from '../../actions/document';
import './index.scss';

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  document: state.document.document,
  path: state.routing.locationBeforeTransitions.pathname
}), {
  createDocument,
  getDocument,
  updateDocument,
  clearDocument
})

export default class NewDocument extends Component {
  static propTypes = {
    document: PropTypes.object,
    authorized_user: PropTypes.object,
    path: PropTypes.string,
    createDocument: PropTypes.func,
    getDocument: PropTypes.func,
    updateDocument: PropTypes.func
  }

  state = {
    editorContent: EditorState.createEmpty(),
    title: 'Untitled',
    data: ''
  }

  componentDidMount() {
    const { document, path, getDocument } = this.props;
    let document_id = null;

    if (path.indexOf('/document/') !== -1) {
      document_id = path.slice(path.indexOf('/document/') + 10);
    }

    if (document_id) {
      getDocument(document_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.document.markdown && nextProps.document.markdown) {
      const contentBlock = htmlToDraft(nextProps.document.markdown);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

      this.setState({
        editorContent: EditorState.createWithContent(contentState)
      });
    }
  }

  componentWillUnmount() {
    this.props.clearDocument();
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  };

  handleDocTitle = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  _saveDocument = () => {
    const { path, authorized_user, updateDocument, createDocument } = this.props;
    const path_arr = path.split('/');
    
    const data = {
      title: this.state.title,
      content: this.state.data
    };

    if (document.is_encrypted) {
      data.hash = document.hash;
    }

    if (path_arr[2] === 'documents' && path_arr[4] === 'document' && !path_arr[5]) {
      data.user_id = authorized_user.id;
      data.box_slug = path_arr[3];
      data.is_encrypted = 0;
      data.hash = '';
      
      createDocument(data)
        .then(response => {
          if (response.status === 'success') {
            browserHistory.push(`/${authorized_user.slug}/documents/desk/document/${response.data.id}`);
          }
        });
    } else if (path_arr[5]) {
      updateDocument(path_arr[5], data);
    }
  }

  onUserAvatarClick = (user_slug) => {
    browserHistory.push(`/${user_slug}/`);
  }

  documentSignatures = () => {
    const { document } = this.props;

    if (!document) {
      return null;
    }

    return (
      <div className="document-signatures-container">
        <h1>Signed by</h1>
        {document.signatures && document.signatures.map(signature => (
          <div className="document-signature-container">
            <div className="user-info">
              <img src={signature.user.avatar32} onClick={() => this.onUserAvatarClick(signature.user.slug)} alt=""/>
              <div>{signature.user.first_name} {signature.user.last_name}</div>
            </div>
            <div className="signature-check-valid">
              <div className="check-valid-icon"/>
              <div>(valid signature)</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { path, document } = this.props;
    const document_keys = Object.keys(this.props.document);

    return path.indexOf('/document/') === -1 || (path.indexOf('/document/') !== -1 && document_keys.indexOf('markdown') !== -1)
      ? <div className="docs">
        <Helmet
          title={`Validbook - ${this.state.title}`}
        />
        <div className="docs-input">
          <AutosizeInput
            name="form-field-name"
            value={this.state.title}
            onChange={this.handleDocTitle}
          />
        </div>

        <div className="docs-btn">
          <button className="btn-brand" onClick={this._saveDocument}>Save</button>
          <button className="btn-brand btn-sign">Sign</button>
        </div>

        <Editor
          wrapperClassName="wrapper-document"
          toolbarClassName="toolbar-document"
          editorClassName="editor-document"
          editorState={this.state.editorContent}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            },
            list: {
              inDropdown: true
            },
            textAlign: {
              inDropdown: true
            },
            link: {
              inDropdown: true
            },
          }}
        />
        {this.documentSignatures()}
      </div>
    : null
  }
}
