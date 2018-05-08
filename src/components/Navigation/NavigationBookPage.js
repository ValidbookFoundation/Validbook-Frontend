import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const NavigationBookPage = ({link, userName, displayUser, avatar32}) => {
  return (
    <div className={displayUser}>
      <Link to={link}>
        <img src={avatar32} alt={userName} />
        <span>{userName}</span>
      </Link>
    </div>
  );
};

NavigationBookPage.propTypes = {
  link: PropTypes.string,
  userName: PropTypes.string,
  displayUser: PropTypes.string,
  avatar32: PropTypes.string
};

export default NavigationBookPage;
