import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showActiveFormSteps } from '../actions/form';
import Engagement from '../components/Registration/Engagement/';

@connect((state) => ({
  activeFormSteps: state.forms.activeFormSteps
}), {
  showActiveFormSteps
})

export default class EngagementContainer extends Component {
  render() {
    return (
      <Engagement
        activeFormSteps={this.props.activeFormSteps}
        showActiveFormSteps={this.props.showActiveFormSteps}
      />
    );
  }
}

EngagementContainer.propTypes = {
  showActiveFormSteps: PropTypes.func,
  activeFormSteps: PropTypes.string
};
