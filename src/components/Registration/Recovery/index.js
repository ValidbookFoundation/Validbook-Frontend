import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Form, Input } from 'formsy-react-components';
import InformationFooter from '../../Information&Profile/Information/InformationFooter';
import './index.scss';

class Recovery extends Component {
  render() {
    return (
      <div>
        <Helmet title="Recovery Password"/>

        <div className="recovery registration-xs">
          <h3 className="registration-xs-title">Forgot your password?</h3>
          <p>Enter your email below and we will send you further instructions.</p>
          <Form
            rowClassName={[{'form-group': false}, {row: false}, 'registration-wrap-form']}
            >
            <Input
              name="email"
              //value=
              type="email"
              validations="isEmail"
              placeholder="Your Email"
              elementWrapperClassName={[{'col-sm-9': false}]}
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              required
            />
            <input className="registration-btn registration-btn-sign-up" type="submit" defaultValue="Submit"/>
          </Form>

          <div className="recovery-help">
            <span>Need help? <Link to="/contacts" >Contact Validbook support team</Link></span>
          </div>

          <InformationFooter />
        </div>
      </div>
    );
  }
}

export default Recovery;
