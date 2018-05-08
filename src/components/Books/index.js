import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import BookCard from '../BookCard';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Loader from '../Loader';
import './index.scss';

class Books extends Component {
  render() {
    const {
      books_tree,
      requested_user,
      loaded,
      small_subheader,
      sub_books,
      getBooks,
      showSubBooksCurrentBook
    } = this.props;
    const loader = <Loader/>;

    return (
      loaded.book_tree &&
        <div className="books contents">
          <div
            className="sidebar-books"
            style={{
              position: small_subheader ? 'fixed' : null,
              top: small_subheader ? 118 : null
            }}
          >
            <BooksTreeContainer
              books_tree={books_tree}
              title="Primary Books"
            />

          </div>
          <div
            className="common-lists"
          >
            {loaded.books && sub_books[0].children.length > 0 && sub_books[0].name !== 'root' &&
              <div className="subbooks-title">{sub_books[0].name} > Subbooks</div>
            }
            <InfiniteScroll
              hasMore={true}
              threshold={50}
              loader={loader}
            >
              <div className="wrapper">
                {loaded.books && sub_books[0].children.length > 0 && sub_books[0].children.map(book => (
                  <BookCard
                    key={book.key}
                    book={book}
                    requested_user={requested_user}
                    getBooks={getBooks}
                  />
                ))}
              </div>
            </InfiniteScroll>

          </div>
        </div>
    );
  }
}

export default Books;
