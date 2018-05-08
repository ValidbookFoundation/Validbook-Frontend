import React from 'react';
import PropTypes from 'prop-types';
import ProfileMenu from '../components/Information&Profile/Profile/ProfileMenu';

const ProfileContainer = ({children}) => (
  <div className="additional-wrap">
    <ProfileMenu />
    {children}
  </div>
);

ProfileContainer.propTypes = {
  children: PropTypes.element
};

export default ProfileContainer;
