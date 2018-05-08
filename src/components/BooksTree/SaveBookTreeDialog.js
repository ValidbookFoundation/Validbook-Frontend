import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './books-tree.scss';

let SortableTree;
let FileExplorerTheme;

@connect((state) => ({
  books_tree: state.book.books_tree,
  requested_userSlug: state.user.requested_user.slug,
  authorized_userSlug: state.user.authorized_user.slug,
}))

export default class SaveBookTreeDialog extends Component {
  state = { };  

  componentDidMount() {
    const { books_tree } = this.props;

    SortableTree = require('react-sortable-tree').default;
    FileExplorerTheme = require('react-sortable-tree-theme-file-explorer');
    this.setState({
      treeData: books_tree[0].children
    });
  }

  componentWillReceiveProps(nextProps) {
    const { books_tree } = nextProps;

    if (!this.props.books_tree.length && nextProps.books_tree.length) {
      SortableTree = require('react-sortable-tree').default;
      FileExplorerTheme = require('react-sortable-tree-theme-file-explorer');
      this.setState({
        treeData: books_tree[0].children
      });
    }
  }

  render() {
    if (!SortableTree) {
      return null;
    }

    return (
      <div className="save_book_tree" style={{ height: 550 }}>
        <SortableTree 
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          canDrag={false}
          generateNodeProps={({ node }) => ({
            title: (
              <div className="tree_item">
                <span className="book_icon"/>
                <span>{node.name}</span>
                <button
                  className="btn-log"
                  onClick={() => this.props.relog(node.key)}
                >Save</button>
              </div>
            )
          })}
        />
      </div>
    ); 
  }
}

SaveBookTreeDialog.propTypes = {
  books_tree: PropTypes.array,
};
