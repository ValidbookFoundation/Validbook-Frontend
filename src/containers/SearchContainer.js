import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import NavigationSearch from '../components/Navigation/NavigationSearch';

const SearchContainer = ({ children }) => (
  <div>
    <Helmet title="Search"/>
    <NavigationSearch />
    {children}
  </div>
);

SearchContainer.propTypes = {
  children: PropTypes.element
};

export default SearchContainer;
