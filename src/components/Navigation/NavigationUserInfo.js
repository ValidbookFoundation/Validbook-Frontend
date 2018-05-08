import React from 'react';
import PropTypes from 'prop-types';

const NavigationInfoUser = ({ user_name, display_user, avatar}) => {
  const _infoUserClick = (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SPAN') {
      window.scrollTo(0, 0);
    }
  };

  if (!user_name || !avatar) {
    return null;
  }

  return (
    <div className={display_user} onClick={_infoUserClick}>
      <img src={avatar} alt={user_name} />
      <span>{user_name}</span>
    </div>
  );
};

NavigationInfoUser.propTypes = {
  user_name: PropTypes.string,
  display_user: PropTypes.string,
  avatar: PropTypes.string
};

export default NavigationInfoUser;
