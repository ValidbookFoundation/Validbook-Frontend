// import axios from 'axios';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, SelectionControl } from 'react-md';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Files from 'react-files';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import CustomVisibility from './CustomVisibility';
import { createStory } from '../../../actions/story';
import SboxBookTree from '../../../components/BooksTree/SboxBookTree';

import './draft-wysiwyg.scss';
import './story-box.scss';
import { getQuery } from '../../../actions/search';

@connect((state) => ({
  selected_books: state.book.selected_books,
  books_tree: state.book.books_tree,
}), {
  createStory
})

export default class StoryBox extends PureComponent {
  static propTypes = {
    authorized_user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      avatar32: PropTypes.string,
    }),
    books_tree: PropTypes.array,                //story
    selected_books: PropTypes.array,
    getCheckboxOfBook: PropTypes.func,
    createStory: PropTypes.func
  }

  state = {
    editorContent: '',
    show_sbox_footer: false,
    loud: {
      quiet_log: false,
      loud_log: true,
      loud_book: true,
      storyline: true
    },
    loud_type: {
      in_channels: 1,
      in_books: 1,
      in_storyline: 1
    },
    loud_icon: 'loud_log_icon',
    visibility: {
      public: true,
      private: false,
      custom: false
    },
    visibility_type: 0,
    visibilityIcon: 'public_icon',
    files: []
  }

  componentDidMount() {
    window.addEventListener('click', this.onSboxBlur, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onSboxBlur, false);
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent
    });
  };

  focusSboxElement = () => {
    const sbox = document.querySelector('.sbox');

    if (sbox) {
      this.setState({
        show_sbox_footer: true
      });
      sbox.style.boxShadow = '0px 7px 15px 2px rgba(0, 0, 0, 0.15)';
    }
  }

  onSboxBlur = (e) => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      const sbox = document.querySelector('.sbox');
      this.setState({
        show_sbox_footer: false
      });
      sbox.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px 1px 3px';
    }
  }

  onQuietLogClick = () => {
    const { loud, loud_type } = this.state;
    const loud_map = Object.assign({}, loud);
    const loud_type_map = Object.assign({}, loud_type);
    console.log('hello');

    loud_map.quiet_log = true;
    loud_map.loud_log = false;
    loud_map.loud_book = false;
    loud_map.storyline = false;
    loud_type_map.in_books = 0;
    loud_type_map.in_channels = 0;
    loud_type_map.in_storyline = 0;
    this.setState({
      loud: loud_map,
      loud_type: loud_type_map,
      loud_icon: 'quiet_log_icon'
    });
  }

  handleCheckLoud = (field_id, event) => {
    const { loud, loud_type } = this.state;
    const loud_map = Object.assign({}, loud);
    const loud_type_map = Object.assign({}, loud_type);

    switch (field_id) {
      case 'loud_log': {
        if (event && loud.quiet_log) {
          loud_map.quiet_log = false;
          loud_map.loud_log = true;
          loud_map.loud_book = true;
          loud_map.storyline = true;
          loud_type_map.in_books = 1;
          loud_type_map.in_channels = 1;
          loud_type_map.in_storyline = 1;
          this.setState({
            loud: loud_map,
            loud_icon: 'loud_log_icon',
            loud_type: loud_type_map
          });
        } else if (event && !loud.quiet_log) {
          loud_map.loud_log = true;
          loud_map.loud_book = true;
          loud_type_map.in_books = 1;
          loud_type_map.in_channels = 1;
          this.setState({
            loud: loud_map,
            loud_icon: 'loud_log_icon',
            loud_type: loud_type_map
          });
        } else {
          loud_map.loud_log = false;
          loud_type_map.in_channels = 0;
          loud_type_map.in_books = 1;
          this.setState({
            loud: loud_map,
            loud_type: loud_type_map,
            loud_icon: 'loud_book_icon'
          });
        }
        break;
      }

      case 'loud_book': {
        if (!event && !loud.quiet_log) {
          loud_map.loud_book = false;
          loud_map.quiet_log = true;
          loud_type_map.in_books = 0;
          loud_type_map.in_channels = 0;
          this.setState({
            loud: loud_map,
            loud_icon: 'quiet_log_icon',
            loud_type: loud_type_map
          });
        } else if (event && loud.quiet_log) {
          loud_map.loud_book = true;
          loud_map.quiet_log = false;
          loud_type_map.in_books = 1;
          loud_type_map.in_channels = 0;
          this.setState({
            loud: loud_map,
            loud_icon: 'loud_book_icon',
            loud_type: loud_type_map
          });
        }
        break;
      }

      case 'storyline': {
        loud_map.storyline = !loud_map.storyline;
        loud_type_map.in_storyline = loud_type_map.in_storyline ? 0 : 1;
        this.setState({
          loud: loud_map,
          loud_type: loud_type_map
        });
        break;
      }
    }
  }

  handleCheckVisibility = (event) => {
    const currentStateItem = event.target.checked;

    switch (event.target.name) {
      case 'public_visibility':
        if (currentStateItem) {
          this.setState({
            visibility: {
              public: true,
              private: false,
              custom: false
            },
            visibilityIcon: 'public_icon',
            visibility_type: 1
          });
        }
        break;

      case 'private_visibility':
        if (currentStateItem) {
          this.setState({
            visibility: {
              public: false,
              private: true,
              custom: false
            },
            visibilityIcon: 'private_icon',
            visibility_type: 0
          });
        }
        break;

      case 'custom_visibility':
        if (currentStateItem) {
          this.setState({
            visibility: {
              public: false,
              private: false,
              custom: true
            },
            visibilityIcon: 'custom_icon',
            visibility_type: 2
          });
        }
        break;
    }
  }

  selectedBooks = (selected_books) => {
    const quantity = selected_books.length;

    if (quantity === 0 || !this.props.books_tree.length) {
      return 'Select Book';
    } else if (quantity === 1) {
      let result;
      this.props.books_tree[0].children.map(book => {
        if (book.key === selected_books[0]) {
          result = book.name;
        }
      });
      return result;
    } else if (quantity > 1) {
      return `${quantity} books`;
    }
  }

  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  };

  onSubmitStory = () => {
    const data = draftToHtml(convertToRaw(this.state.editorContent.getCurrentContent()));

    this.props.createStory(
      data,
      this.props.selected_books,
      this.state.files,
      this.state.visibility_type,
      this.state.loud_type
    );

    const sbox = document.querySelector('.sbox');
    this.setState({
      editorContent: '',
      files: [],
      show_sbox_footer: false
    });
    sbox.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px 1px 3px';
  }

  onFilesChange = (files) => {
    this.setState({
      files
    });
  };

  sboxBookTreeRender = () => {
    const {
      books_tree,
      selected_books,
      getCheckboxOfBook
    } = this.props;
    
    if (!books_tree.length || !books_tree[0].children || !books_tree[0].children.length) {
      return null;
    }

    return (
      <div className="sbox-booktree">
        <SboxBookTree
          selected_books={selected_books}
          books_tree={books_tree[0].children}
          getCheckboxOfBook={getCheckboxOfBook}
        />
      </div>
    );
  }

  closeModal = () => {
    this.setState({
      visibility: Object.assign({}, this.state.visibility, {
        custom: false,
        public: true
      })
    });
  }

  customVisibilityRender = () => {
    const { visibility } = this.state;
    
    if (!visibility.custom) {
      return null;
    }

    return (
      <CustomVisibility
        showModal={visibility.custom}
        closeModalHandler={this.closeModal}
      />
    );
  }

  // filesUpload() {
  //   const formData = new FormData();
  //   Object.keys(this.state.files).forEach((key) => {
  //     const file = this.state.files[key];
  //     formData.append('file', new Blob([file], {type: file.type}), file.name || 'file');
  //   });
  //   console.log(formData);
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://api.validbook.org/v1/upload/story-image?&access_token=RCEqGhqnani8jMQF56cBeXs_-t_-5fHZ', true);
  //   xhr.send(formData);
  // }

  render() {
    const { editorContent, loud } = this.state;
    const { first_name, last_name, avatar32 } = this.props.authorized_user;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div 
        className="sbox"
        onFocus={this.focusSboxElement}
      >
        <Editor
          toolbarHidden
          wrapperClassName="wrapper-sbox"
          editorClassName="editor-sbox"
          toolbarClassName="toolbar-sbox"
          editorState={editorContent}
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Write something..."
        />
        
        <Files
          className="files-dropzone-gallery"
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['image/*', 'text/*']}
          multiple
          clickable={false}
        >
          {this.state.files.length > 0 &&
            <div className="files-gallery">
              {this.state.files.map((file) =>
                <img
                  className="files-gallery-item" src={file.preview.url} key={file.id}
                  style={{width: '110px', height: '110px'}}
                />
              )}
            </div>
          }
        </Files>

        <div
          className="sbox-user-avatar32"
          style={{position: 'absolute', left: 20, top: 20}}>
          <Link to={link}>
            <img
              src={avatar32}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%'
              }}
            />
          </Link>
        </div>

        <div 
          className="sbox-footer"
          style={{
            display: this.state.show_sbox_footer
              ? 'flex'
              : 'none'
          }}
        >
          <div
            className="btn-brand"
            type="submit"
            onClick={this.onSubmitStory}
            style={{
              fontSize: '13px'
            }}
          >Save To Book
          </div>
          <ButtonToolbar>
            <DropdownButton
              className="bootstrap-pure-btn"
              bsStyle="default"
              title={this.selectedBooks(this.props.selected_books)}
              id={5}
            >
              {this.sboxBookTreeRender()}
            </DropdownButton>
            <DropdownButton
              className="bootstrap-pure-btn sbox-dropdown-btn" bsStyle="default"
              title={<i className={`dropdown-btn-icon ${this.state.visibilityIcon}`}/>} id={7}
            >
              <div className="sbox-visibility">
                <ul>
                  <li>
                    <div>
                      <input
                        type="checkbox" name="public_visibility" id="public_visibility"
                        checked={this.state.visibility.public}
                        onChange={this.handleCheckVisibility}/>
                      <label htmlFor={'public_visibility'}><span/></label>
                      <div>
                        <i className="public_icon"/>
                        <p>Public</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <input
                        type="checkbox" name="private_visibility" id="private_visibility"
                        checked={this.state.visibility.private}
                        onChange={this.handleCheckVisibility}/>
                      <label htmlFor={'private_visibility'}><span/></label>
                      <div>
                        <i className="private_icon"/>
                        <p>Private</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <input
                        type="checkbox" name="custom_visibility" id="custom_visibility"
                        checked={this.state.visibility.custom}
                        onChange={this.handleCheckVisibility}/>
                      <label htmlFor={'custom_visibility'}><span/></label>
                      <div>
                        <i className="custom_icon"/>
                        <p>Custom</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </DropdownButton>
            <DropdownButton
              id={6}
              bsStyle="default"
              className="bootstrap-pure-btn sbox-dropdown-btn"
              title={<i className={`dropdown-btn-icon ${this.state.loud_icon}`}/>}
            >
              <div className="sbox-logging">
                <SelectionControl
                  id="quiet_log"
                  name="selection-controls"
                  type="radio"
                  checked={loud.quiet_log}
                  label="Quiet saving"
                  onChange={this.onQuietLogClick}
                />

                <hr/>

                <Checkbox
                  id="loud_log"
                  name="list-control-primary"
                  label="Loud saving for all my followers"
                  checked={loud.loud_log}
                  onChange={(e) => this.handleCheckLoud('loud_log', e)}
                />

                <Checkbox
                  id="loud_book"
                  name="list-control-primary"
                  label="Loud saving for book followers"
                  checked={loud.loud_book}
                  disabled={loud.loud_log}
                  onChange={(e) => this.handleCheckLoud('loud_book', e)}
                />

                <hr />

                <Checkbox
                  id="storyline"
                  name="list-control-primary"
                  label="Story will appear on Storyline"
                  checked={loud.storyline}
                  onChange={(e) => this.handleCheckLoud('storyline', e)}
                />
              </div>
            </DropdownButton>
          </ButtonToolbar>

          <Files
            className="files-dropzone-gallery"
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={['image/*', 'text/*']}
            multiple
            clickable
          >
            <i className="material-icons">photo_camera</i>
          </Files>
        </div>

        {this.customVisibilityRender()}
      </div>
    );
  }
}
