import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({marginTop}) => (
  <div className="wrapper-loader">
    <div className="loader" style={{marginTop}}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    </div>
  </div>
);

Loader.propTypes = {
  marginTop: PropTypes.string
};

export default Loader;
