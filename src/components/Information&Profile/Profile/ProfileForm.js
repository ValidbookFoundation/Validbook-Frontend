import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Form, Input, Select, Textarea } from 'formsy-react-components';
import './index.scss';

const selectCountry = [
  {value: null, label: 'Select your country'},
  {value: 'United States', label: 'United States'},
  {value: 'Afghanistan', label: 'Afghanistan'},
  {value: 'Aland Islands', label: 'Aland Islands'},
  {value: 'Albania', label: 'Albania'},
  {value: 'Algeria', label: 'Algeria'}
];
const selectDay = [
  {value: null, label: 'Day'},
  {value: 1, label: '1'}
];
const selectMonth = [
  {value: null, label: 'Month'},
  {value: 'Jan', label: 'Jan'},
  {value: 'Feb', label: 'Feb'},
  {value: 'Mar', label: 'Mar'}
];
const selectYear = [
  {value: null, label: 'Year'},
  {value: 1900, label: '1900'},
  {value: 1901, label: '1901'},
  {value: 1902, label: '1902'}
];
const selectVisibility = [
  {value: 'Public', label: 'Public'},
  {value: 'Me', label: 'Only me'}
];

const ProfileForm = ({
                                onSubmit,
                                onInvalidSubmit,
                                first_name,
                                last_name,
                                bio,
                                occupation,
                                company,
                                country,
                                location,
                                birthDate,
                                birthMonth,
                                birthDateVisibility,
                                birthYear,
                                birthYearVisibility,
                                twitter,
                                facebook,
                                linkedin,
                                website,
                                phone,
                                skype
                            }) => {
  return (
    <Form
      onSubmit={onSubmit}
      onInvalidSubmit={onInvalidSubmit}
      rowClassName={[{'form-group': false}, {row: false}, 'engagement-form']}
    >
      <div className="engagement-wrap-form profile-wrap-form">
        <Input
          name="first_name"
          value={first_name}
          label="First Name"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />
        <Input
          name="last_name"
          value={last_name}
          label="Last Name"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />
        <Textarea
          rows={5}
          cols={40}
          name="bio"
          label="Bio"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          value={bio}
        />
        <Input
          name="occupation"
          value={occupation}
          label="Occupation"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />
        <Input
          name="company"
          value={company}
          label="Company"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />
        <Select
          name="country"
          value={country}
          label="Country"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          className={'form-control engagement-form-select'}
          placeholder="Select your country"
          options={selectCountry}
        />
        <Input
          name="location"
          value={location}
          label="Location"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />
        <div className="engagement-form-birth-date">
          <Select
            name="birthDate"
            value={birthDate}
            label="Birth Date"
            labelClassName={[{'col-sm-3': false}, 'profile-label']}
            className={'form-control profile-form-select profile-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper engagement-element-wrapper-small']}
            //style = {{left: '100px'}}
            options={selectDay}
          />

          <Select
            name="birthMonth"
            value={birthMonth}
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            className={'form-control profile-form-select profile-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper engagement-element-wrapper-small birth-visibility']}
            //style = {{left: '210px'}}
            options={selectMonth}
          />

          <Select
            name="birthDateVisibility"
            value={birthDateVisibility}
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            className={'form-control profile-form-select profile-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper engagement-element-wrapper-small ']}
            style={{left: '320px'}}
            options={selectVisibility}
          />
        </div>
        <div className="engagement-form-birth-date profile-form-birth-year">
          <Select
            name="birthYear"
            value={birthYear}
            label="Birth Year"
            labelClassName={[{'col-sm-3': false}, 'profile-label']}
            className={'form-control profile-form-select profile-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper engagement-element-wrapper-small']}
            //style = {{left: '100px'}}
            options={selectYear}
          />

          <Select
            name="birthYearVisibility"
            value={birthYearVisibility}
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            className={'form-control profile-form-select profile-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper engagement-element-wrapper-small']}
            //style = {{left: '210px'}}
            options={selectVisibility}
          />
        </div>

        <Input
          name="twitter"
          value={twitter}
          label="Twitter"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="url"
        />
        <Input
          name="facebook"
          value={facebook}
          label="Facebook"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="url"
        />
        <Input
          name="linkedin"
          value={linkedin}
          label="Linkedin"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="url"
        />
        <Input
          name="website"
          value={website}
          label="Website"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="url"
        />
        <Input
          name="phone"
          value={phone}
          label="Phone"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />
        <Input
          name="skype"
          value={skype}
          label="Skype"
          labelClassName={[{'col-sm-3': false}, 'profile-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper']}
          type="text"
        />

        <div className="profile-wrap-btn engagement-wrap-btn">
          <div>
            <Link to="/settings/delete-account" className="profile-delete">Delete my account</Link>
            <button className="engagement-btn profile-btn" type="submit">Save Changes</button>
          </div>
        </div>

      </div>
    </Form>
  );
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  bio: PropTypes.string,
  occupation: PropTypes.string,
  company: PropTypes.string,
  country: PropTypes.string,
  location: PropTypes.string,
  birthDate: PropTypes.string,
  birthMonth: PropTypes.string,
  birthDateVisibility: PropTypes.string,
  birthYear: PropTypes.string,
  birthYearVisibility: PropTypes.string,
  twitter: PropTypes.string,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string,
  phone: PropTypes.string,
  skype: PropTypes.string
};

export default ProfileForm;
