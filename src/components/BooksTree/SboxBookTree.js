import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SelectionControl
} from 'react-md';
import './books-tree.scss';

let SortableTree;
let FileExplorerTheme;

export default class SboxBookTree extends Component {
  static propTypes = {
    books_tree: PropTypes.array,
    selected_books: PropTypes.array,
    getCheckboxOfBook: PropTypes.func
  }

  state = { }

  componentDidMount() {
    SortableTree = require('react-sortable-tree').default;
    FileExplorerTheme = require('react-sortable-tree-theme-file-explorer');

    this.setState({
      treeData: this.props.books_tree
    });
  }  

  selectBook = (book_key, e) => {
    e.preventDefault();
    const { selected_books } = this.props;
    const selected_items_map = [].concat(selected_books);

    const book_key_index = selected_items_map.indexOf(book_key);
    if (~book_key_index) {
      selected_items_map.splice(book_key_index, 1);
    } else {
      selected_items_map.push(book_key);
    }
    
    this.props.getCheckboxOfBook(selected_items_map);
  }

  checkSelectedBook = (book_key) => {
    const { selected_books } = this.props;
    
    if (~selected_books.indexOf(book_key)) {
      return true;
    }

    return false;
  }

  render() {
    const { treeData } = this.state;
    if (!SortableTree || !treeData || !treeData.length) {
      return null;
    }

    const height = treeData.length <= 14 
      ? treeData.length * 25 + 1
      : treeData.length * 14 + 1;

    return (
      <div className="sbox_book_tree" style={{ height }}>
        <SortableTree 
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          canDrag={false}
          generateNodeProps={({ node }) => ({
            title: (
              <div 
                className="tree_item"
                onClick={(e) => this.selectBook(node.key, e)}
              >
                <SelectionControl
                  id={node.key}
                  name="selection-controls"
                  type="checkbox"
                  checked={this.checkSelectedBook(node.key)}
                />
                <span className="book_icon"/>
                <span>{node.name}</span>
              </div>
            )
          })}
        />
      </div>
    );
  }
}
