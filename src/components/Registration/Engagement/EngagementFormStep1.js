import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Textarea } from 'formsy-react-components';
import './bootstrapForm.scss';
import './index.scss';

const selectCountry = [
  {value: null, label: 'Select your country'},
  {value: 1, label: 'United States'},
  {value: 2, label: 'Afghanistan'},
  {value: 3, label: 'Aland Islands'},
  {value: 4, label: 'Albania'},
  {value: 5, label: 'Algeria'}
];
const selectDay = [
  {value: null, label: 'Day'},
  {value: 1, label: '1'}
];
const selectMonth = [
  {value: null, label: 'Month'},
  {value: 1, label: 'Jan'},
  {value: 2, label: 'Feb'},
  {value: 3, label: 'Mar'}
];
const selectYear = [
  {value: null, label: 'Year'},
  {value: 1900, label: '1900'},
  {value: 1901, label: '1901'},
  {value: 1902, label: '1902'}
];
const selectVisibility = [
  {value: 1, label: 'Public'},
  {value: 0, label: 'Only me'}
];

const EngagementFormStep1 = ({
  authorized_user
}) => {
  const {
    onSubmit,
    onInvalidSubmit,
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
  } = authorized_user
  return (
    <Form
      onSubmit={onSubmit}
      onInvalidSubmit={onInvalidSubmit}
      rowClassName={[{'form-group': false}, {row: false}, 'engagement-form']}
    >
      <div className="engagement-wrap-form">
        <Textarea
          rows={5}
          cols={40}
          name="bio"
          label="Bio"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          value={bio}
        />
        <Input
          name="occupation"
          value={occupation}
          label="Occupation"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="text"
        />
        <Input
          name="company"
          value={company}
          label="Company"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="text"
        />
        <Select
          name="country"
          value={country}
          label="Country"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          className={'form-control engagement-form-select'}
          placeholder="Select your country"
          options={selectCountry}
        />
        <Input
          name="location"
          value={location}
          label="Location"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="text"
        />
        <div className="engagement-form-birth-date">
          <Select
            name="birthDate"
            value={birthDate}
            label="Birth Date"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
            className={'form-control engagement-form-select engagement-form-select-small'}
            style={{left: '140px'}}
            options={selectDay}
          />

          <Select
            name="birthMonth"
            value={birthMonth}
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            className={'form-control engagement-form-select engagement-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
            style={{left: '250px'}}
            options={selectMonth}
          />

          <Select
            name="birthDateVisibility"
            value={birthDateVisibility}
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            className={'form-control engagement-form-select engagement-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small birth-visibility']}
            style={{left: '360px'}}
            options={selectVisibility}
          />
        </div>
        <div className="engagement-form-birth-date engagement-form-birth-year">
          <Select
            name="birthYear"
            value={birthYear}
            label="Birth Year"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
            className={'form-control engagement-form-select engagement-form-select-small'}
            style={{left: '140px'}}
            options={selectYear}
          />

          <Select
            name="birthYearVisibility"
            value={birthYearVisibility}
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            className={'form-control engagement-form-select engagement-form-select-small'}
            elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
            style={{left: '250px'}}
            options={selectVisibility}
          />
        </div>

        <Input
          name="twitter"
          value={twitter}
          label="Twitter"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="url"
        />
        <Input
          name="facebook"
          value={facebook}
          label="Facebook"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="url"
        />
        <Input
          name="linkedin"
          value={linkedin}
          label="Linkedin"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="url"
        />
        <Input
          name="website"
          value={website}
          label="Website"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="url"
        />
        <Input
          name="phone"
          value={phone}
          label="Phone"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="text"
        />
        <Input
          name="skype"
          value={skype}
          label="Skype"
          labelClassName={[{'col-sm-3': false}, 'engagement-label']}
          elementWrapperClassName={[{'col-sm-9': false}, 'engagement-element-wrapper']}
          type="text"
        />

        <div className="engagement-wrap-btn">
          <div>
            <button className="engagement-btn" type="submit">Save and Continue</button> <br/>
            <button className="engagement-btn engagement-btn-skip">Skip</button>
          </div>
        </div>

      </div>
    </Form>
  );
};

EngagementFormStep1.propTypes = {
  onSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,

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
  skype: PropTypes.string
};

export default EngagementFormStep1;
