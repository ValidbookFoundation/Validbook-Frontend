import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import EditBook from '../EditBookModal';
import './index.scss';

export default class BookCard extends Component {
  static propTypes = {
    book: PropTypes.object,
    requested_user: PropTypes.object,
    getBooks: PropTypes.func
  }

  state = {
    show_edit_book_modal: false
  }

  showSubBooks = (e, slug, book_slug) => {
    e.preventDefault();

    this.props.getBooks(slug, book_slug);
  };

  openEditBookModal = (e) => {
    e.preventDefault();

    this.setState({
      show_edit_book_modal: true
    });
  }

  closeEditBookModal = () => {

    this.setState({
      show_edit_book_modal: false
    });
  }

  editBookModalRender = () => {
    const { show_edit_book_modal } = this.state;
    const { book } = this.props;

    if (!show_edit_book_modal) {
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
        show_modal={show_edit_book_modal}
        closeModalHandler={this.closeEditBookModal}
        book_name={book.name}
        book_description={book.description}
        bookSettings={settings}
        book_slug={book.key}
      />
    );
  }

  render() {
    const { book, requested_user } = this.props;
    const {name, key, cover, counts} = book;

    return (
      <Link
        to={`${location}/${key}`}
        className={counts && counts.sub_books > 0
          ? 'book book-with-subbooks'
          : 'book'
        }
      >

        <div
          className="coverBook"
          style={{
            backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
            backgroundImage: cover && cover.picture_small ? `url(${cover.picture_small})` : null
          }}
        />

        <div className="authorUser">
          <img src={requested_user.avatar48} alt=""/>
        </div>

        <div
          className="book-edit"
          onClick={this.openEditBookModal}
        >
          {this.editBookModalRender()}
        </div>

        <div className="title-infoblocks-book">
          <div className="book-name">
            {name}
          </div>
          <div className="book-author">
            {`${requested_user.first_name} ${requested_user.last_name}`}
          </div>
        </div>

        <div className="book-info">
          <ul>
            <li>
              <span>{counts ? counts.followers : 0}</span>
              <i className="followers-icon-sm"/>
            </li>
            <li>
              ·<span>{counts ? counts.stories : 0}</span>
              <i className="stories-icon-sm"/>
            </li>
            <li>
              ·<span>{counts ? counts.images : 0}</span>
              <i className="photos-icon-sm"/>
            </li>
            <li
              className="subbooks-btn"
              onClick={(e) => this.showSubBooks(e, requested_user.slug, key)}
            >
              ·<span>{counts ? counts.sub_books : 0}</span>
              <i className="subbooks-icon-sm"/>
            </li>
          </ul>
        </div>
        <div className="btn-following btn-following-book">
          <div>Following Book</div>
          <span/>
        </div>
      </Link>
    );
  }
}
