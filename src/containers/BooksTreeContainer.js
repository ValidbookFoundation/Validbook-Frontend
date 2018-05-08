import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  create as createBook,
  load as loadBookTree
} from '../actions/book';
import BooksTree from '../components/BooksTree/index';
import EditBook from '../components/EditBookModal';
import '../components/BooksTree/index.scss';

@connect((state) => ({
  requested_user: state.user.requested_user,
  loaded: state.book.loaded,
}), {
  loadBookTree,
  createBook,
})

export default class BooksTreeContainer extends Component {
  static propTypes = {
    loaded: PropTypes.object,
    booksTreeTop: PropTypes.string,
    requested_user: PropTypes.object,
    books_tree: PropTypes.array
  }

  state = {
    show_create_book_modal: false
  }

  onBookClick(e) {
    if (e.target.tagName === 'A') {
      window.scrollTo(0, 0);
    }
  }

  addBookRender = () => {
    const { show_create_book_modal } = this.state;

    if (!show_create_book_modal) {
      return null;
    }

    const settings = {
      can_add_stories: 0,
      can_delete_stories: 0,
      can_manage_settings: 0,
      can_see_content: 1,
      can_see_exists: 1,
      users_array: {
        users_can_see_exists: [],
        users_can_see_content: [],
        users_can_add_stories: [],
        users_can_delete_stories: [],
        users_can_manage_settings: []
      }
    };
    
    return (
      <EditBook
        show_modal={show_create_book_modal}
        closeModalHandler={this.closeCreateBookModal}
      />
    );
  }

  openCreateBookModal = () => {
    this.setState({
      show_create_book_modal: true
    });
  }

  closeCreateBookModal = () => {
    this.setState({
      show_create_book_modal: false
    });
  }

  render() {
    const {slug} = this.props.requested_user;
    const {loaded, title, isLink} = this.props;

    return (
      <div className="bookstree" onClick={this.onBookClick}>
        {loaded.book_tree &&
          <div className={this.props.booksTreeTop}>
            <div className="bookstree-title">
              <span className="booktree-icon"/><Link to={`/${slug}/books`}>{title}</Link>
            </div>
            <BooksTree
              books_tree={this.props.books_tree}
              isLink={isLink}
            />
            <div 
              className="create_new_book"
              onClick={this.openCreateBookModal}
            >
              + Create new book
            </div>
          </div>
        }
        {this.addBookRender()}
      </div>
    );
  }
}

BooksTreeContainer.defaultProps = {
  title: 'BOOKS'
};
