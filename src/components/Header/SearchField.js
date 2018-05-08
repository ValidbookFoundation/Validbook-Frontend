import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getQuery } from '../../actions/search';

@connect(null, {
  getQuery
})

export default class SearchField extends Component {
  handleChange = (event) => {
    if (event.key === 'Enter') {
      this.props.getQuery(event.target.value);
      browserHistory.push('/search/people');
    }
  }

  render() {
    return (
      <div className="search-field">
        <input type="text" placeholder="Search" onKeyPress={this.handleChange}/>
        <span></span>
      </div>
    );
  }
}


