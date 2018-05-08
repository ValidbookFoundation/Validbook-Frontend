import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  getBookTree,
  getBooks,
  showSubBooksCurrentBook
} from '../../actions/book';
import Books from '../../components/Books';
import {
  parseUserSlug
} from '../../utils/url_parsing';

@connect((state) => ({
  requested_user: state.user.requested_user,
  books_tree: state.book.books_tree,
  path: state.routing.locationBeforeTransitions.pathname,
  loaded: state.book.loaded,
  sub_books: state.book.sub_books,
}), {
  getBookTree,
  getBooks,
  showSubBooksCurrentBook,
})

export default class BooksContainer extends Component {
  componentDidMount() {
    const { path, getBooks, getBookTree } = this.props;
    const user_slug = parseUserSlug(path);

    getBookTree(user_slug);
    getBooks(user_slug);
  }

  render() {
    const {
      requested_user, 
      router,
      books_tree,
      loaded,
      small_subheader,
      sub_books,
      getBooks,
      showSubBooksCurrentBook
    } = this.props;
    const helmet_title = requested_user.first_name && requested_user.last_name
    ? `${requested_user.first_name} ${requested_user.last_name} - Books`
    : 'Books';

    return (
      <div>
        <Helmet
          title={helmet_title}
        />
        <Books
          books_tree={books_tree}
          requested_user={requested_user}
          loaded={loaded}
          history={router}
          sub_books={sub_books}
          small_subheader={small_subheader}
          getBooks={getBooks}
          showSubBooksCurrentBook={showSubBooksCurrentBook}
        />
      </div>
    );
  }
}

BooksContainer.propTypes = {
  requested_user: PropTypes.object,
  books_tree: PropTypes.array,
  getBookTree: PropTypes.func,
  sub_books: PropTypes.array,
  path: PropTypes.string,
  loaded: PropTypes.object,
  getBooks: PropTypes.func,
  small_subheader: PropTypes.bool,
  router: PropTypes.object,
  showSubBooksCurrentBook: PropTypes.bool
};
