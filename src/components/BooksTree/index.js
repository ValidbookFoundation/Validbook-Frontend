import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import './books-tree.scss';

let SortableTree;
let FileExplorerTheme;

@connect((state) => ({
  requested_user_slug: state.user.requested_user.slug,
  path: state.routing.locationBeforeTransitions.pathname,
}))

class BookTree extends Component {
  state = { }

  componentDidMount() {
    SortableTree = require('react-sortable-tree').default;
    FileExplorerTheme = require('react-sortable-tree-theme-file-explorer');
    this.setState({
      treeData: this.props.books_tree[0].children
    });
  }

  clearStream = () => {
    this.props.clearBookStories();
    this.props.clearStories();
  }

  render() {
    const { treeData } = this.state;
    const { requested_user_slug } = this.props;

    if (!SortableTree || !treeData || !treeData.length) {
      return null;
    }

    const height = treeData.length <= 24 
      ? treeData.length * 25
      : 600;


    return (
      <div
        style={{ 
          height,
          marginBottom: 10
        }}
      >
        <SortableTree 
          treeData={treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          generateNodeProps={({ node }) => ({
            title: (
              <div
                className="tree_item"
                onClick={() => browserHistory.push(`/${requested_user_slug}/books/${node.key}`)}
              >
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

BookTree.propTypes = {
  books_tree: PropTypes.array,
  clearBookStories: PropTypes.func,
  clearStories: PropTypes.func,
};

export default BookTree;
