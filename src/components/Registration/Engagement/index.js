import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-connect';
import { save as saveProfile } from '../../../actions/user';
// import { save as saveProfile, load as loadProfile, isLoadedProfile } from '../../../actions/profile';
import { showActiveFormSteps } from '../../../actions/form';
import EngagementFormStep1 from './EngagementFormStep1';
import EngagementFormStep2 from './EngagementFormStep2';
import './index.scss';

// @asyncConnect([{
//   promise: ({ store: { dispatch, getState } }) => {
//     const promises = [];

//     if (!isLoadedProfile(getState())) {
//       promises.push(dispatch(loadProfile()));
//     }
//     return Promise.all(promises);
//   }
// }])

@connect((state) => ({
  activeFormSteps: state.forms.activeFormSteps,
  authorized_user: state.user.authorized_user
  // first_name: state.user.authorized_user.profile.first_name,
  // last_name: state.user.authorized_user.profile.last_name,
  // bio: state.user.authorized_user.profile.bio,
  // occupation: state.user.authorized_user.profile.occupation,
  // company: state.user.authorized_user.profile.company,
  // country: state.user.authorized_user.profile.country,
  // location: state.user.authorized_user.profile.location,
  // birthDate: state.user.authorized_user.profile.birthDate,
  // birthMonth: state.user.authorized_user.profile.birthMonth,
  // birthDateVisibility: state.user.authorized_user.profile.birthDateVisibility,
  // birthYear: state.user.authorized_user.profile.birthYear,
  // birthYearVisibility: state.user.authorized_user.profile.birthYearVisibility,
  // twitter: state.user.authorized_user.profile.twitter,
  // facebook: state.user.authorized_user.profile.facebook,
  // linkedin: state.user.authorized_user.profile.linkedin,
  // website: state.user.authorized_user.profile.website,
  // phone: state.user.authorized_user.profile.phone,
  // skype: state.user.authorized_user.profile.skype
}), {
  showActiveFormSteps,
  saveProfile
})

export default class Engagement extends Component {

  onFormShowSteps = (formSteps) => {
    console.log(formSteps);
    this.props.showActiveFormSteps(formSteps);
  }

  submitForm = (data) => {
    data.first_name = this.props.first_name;        // get first_name & last_name from store
    data.last_name = this.props.last_name;
    console.log(data);
    this.props.saveProfile(data);
  }

  invalid() {
    console.log('error');
  }

  render() {
    const {authorized_user} = this.props;

    return (
      <div>
        {/* <Header /> */}
        <div className="engagement">
          <div className="engagement-wrap ">

            <div className="engagement-steps">
              <div className="engagement-step-1 engagement-step-1-active" onClick={() => this.onFormShowSteps('step-1')}>
                <div className="engagement-step-title">
                  <h3>Step 1</h3>
                  <p>Add details</p>
                </div>
              </div>
              <div className="engagement-step-2" onClick={() => this.onFormShowSteps('step-2')}>
                <div className="engagement-step-title">
                  <h3>Step 2</h3>
                  <p>Add picture</p>
                </div>
              </div>
            </div>
            {this.props.activeFormSteps === 'step-1' &&
              <div className="engagement-content engagement-content-1">
                <div className="engagement-content-title">Add more details about yourself. This information will help people find you.</div>

                <EngagementFormStep1
                  onSubmit={this.submitForm}      /* todo check onSubmit & onInvalidSubmit */
                  onInvalidSubmit={this.invalid}
                  authorized_user={authorized_user}
                />
              </div>
            }

            {this.props.activeFormSteps === 'step-2' &&
              <div className="engagement-content engagement-content-2">
                <div className="engagement-content-title">Set your profile picture to help people find you</div>
                <EngagementFormStep2
                  avatar={this.avatar}
                />
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}

Engagement.propTypes = {
  activeFormSteps: PropTypes.string,
  showActiveFormSteps: PropTypes.func,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  bio: PropTypes.string,
  occupation: PropTypes.string,
  company: PropTypes.string,
  country: PropTypes.string,
  location: PropTypes.string,
  birthDate: PropTypes.string,
  birthMonth: PropTypes.string,
  birthDateVisibility: PropTypes.number,
  birthYear: PropTypes.string,
  birthYearVisibility: PropTypes.number,
  twitter: PropTypes.string,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string,
  phone: PropTypes.string,
  skype: PropTypes.string,
  saveProfile: PropTypes.func,
};
