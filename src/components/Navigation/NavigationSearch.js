import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

class NavigationSearch extends Component {
  render() {
    return (
      <div className="navigation search">
        <div className="wrapper">
          <Link
            to={'/search'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Top
          </Link>
          <Link
            to={'/search/latest'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Latest
          </Link>
          <Link
            to={'/search/people'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            People
          </Link>
          <Link
            to={'/search/stories'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Stories
          </Link>
          <Link
            to={'/search/books'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Books
          </Link>
          <Link
            to={'/search/tokens'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Tokens
          </Link>
          <Link
            to={'/search/photos'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Photos
          </Link>
          <Link
            to={'/search/channels'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Channels
          </Link>
          <Link
            to={'/search/things'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Things
          </Link>
        </div>
      </div>
    );
  }
}

export default NavigationSearch;
