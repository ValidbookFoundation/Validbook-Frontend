import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

@connect((state) => ({
  requested_user: state.user.requested_user
}))

export default class PeopleContainer extends Component {
  render() {
    const {requested_user, small_subheader} = this.props;
    const helmet_title = requested_user.first_name && requested_user.last_name
    ? `${requested_user.first_name} ${requested_user.last_name} - Relations`
    : 'Relations';

    return (
      <div>
        <Helmet
          title={helmet_title}
        />
        {React.cloneElement(this.props.children, {small_subheader})}
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  requested_user: PropTypes.object,
  small_subheader: PropTypes.bool
};
