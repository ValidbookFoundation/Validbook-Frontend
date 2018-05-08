import React, { Component } from 'react';
import StackGrid from 'react-stack-grid';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { searchBook } from '../../actions/search';
import './index.scss';

const TestBook = ({ name, childrens }) => {
  // console.log(childrens)
  return (
    <div className="book">
      <div className="title-infoblocks-book">
        <h5>{ name }</h5>
      </div>
      <div className="book-info">
        <ul className="book-info-list">
          <li className="book-icon-visibility"></li>
          <li className="book-icon-stories">5</li>
          <li className="book-icon-subbooks">3</li>
          <li className="book-icon-followers">1</li>
        </ul>
        <hr />
      </div>
      <div className="book-description">
        <p>Description...</p>
      </div>
      <div className="book-quantity">
        <span>2 subbooks</span>
      </div>
      <div className="book-subbooks">
        {/*<BookTree*/}
          {/*books_tree={childrens}*/}
        {/*/>*/}
      </div>
      <div className="book-btn">Edit</div>
    </div>
  );
};

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(searchBook(getState())));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  query: state.search.query,
  foundBooks: state.search.foundBooks,
}), {
  searchBook
})

class SearchBooks extends Component {
  render() {
    const { foundBooks } = this.props;
    return (
      <div className="page-bg">
        <StackGrid
          //monitorImagesLoaded
          columnWidth={180}
          duration={600}
          gutterWidth={10}
          gutterHeight={10}
          //easing={easings.cubicOut}
          //appearDelay={60}
          // appear={transition.appear}
          // appeared={transition.appeared}
          // enter={transition.enter}
          // entered={transition.entered}
          //leaved={transition.leaved}
        >
          {foundBooks && foundBooks.map((book) => (
            <TestBook
              key={book.key}
              name={book.name}
              childrens={book.children}
            />
          ))
          }
        </StackGrid>
      </div>
    );
  }
}

export default SearchBooks;
