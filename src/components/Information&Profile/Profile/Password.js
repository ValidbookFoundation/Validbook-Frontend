import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'formsy-react-components';
import Helmet from 'react-helmet';
import './index.scss';


class Password extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data) {
    console.log(data);
  }

  invalid() {
    console.log('error');
  }

  render() {
    return (
      <div className="additional-content">
        <Helmet title="Change Password"/>
        <div className="additional-title">Change Password</div>

        <Form
          onSubmit={this.submitForm}
          onInvalidSubmit={this.invalid}
          rowClassName={[{'form-group': false}, {row: false}, 'engagement-form']}
        >
          <div className="engagement-wrap-form password-wrap-form">
            <Input
              name="occupation"
              // value={occ_value}
              label="Current password"
              labelClassName={[{'col-sm-3': false}, 'password-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper password-element-wrapper']}
              type="text"
            />

            <a className="password-forgot" href="#">Forgot your password?</a>

            <Input
              name="occupation"
              // value={occ_value}
              label="New password"
              labelClassName={[{'col-sm-3': false}, 'password-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper password-element-wrapper']}
              type="text"
            />
            <Input
              name="occupation"
              // value={occ_value}
              label="Confirm new password"
              labelClassName={[{'col-sm-3': false}, 'password-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'profile-element-wrapper password-element-wrapper']}
              type="text"
            />

            <hr className="additional-hr"/>

            <div className="engagement-wrap-btn password-wrap-btn">
              <div>
                <button className="engagement-btn profile-btn" type="submit">Save Changes</button>
              </div>
            </div>

          </div>
        </Form>

        {this.props.children}
      </div>
    );
  }
}

Password.propTypes = {
  children: PropTypes.element
};

export default Password;
