import React from 'react';
import { Form, Select, Input } from 'formsy-react-components';
import Helmet from 'react-helmet';

const selectReason = [
  {value: '', label: 'Why you decided to leave?'},
  {value: 'Concerns about privacy', label: 'Concerns about privacy'},
  {value: 'Deletion of my Thanks/comments', label: 'Deletion of my Thanks/comments'}
];

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data) {
    console.log(data); // eslint-disable-line no-console
  }
  invalid() {
    console.log('error');// eslint-disable-line no-console
  }

  render() {
    return (
      <div className="additional-content delete-account-content">
        <Helmet title="Delete Account"/>
        <div className="additional-title">Delete Account</div>

        <div className="delete-account-regret">
          <p>Hello, <b>Name Surname</b></p>
          <p>We are sorry to hear, that you decided to delete your account.</p>
        </div>

        <hr className="additional-hr"/>

        <div className="delete-account-before">
          <p>Before you leave, please let us know why you decided to leave.</p>

          <Form
            onSubmit={this.submitForm}
            onInvalidSubmit={this.invalid}
            rowClassName={[{'form-group': false}, {row: false}, 'engagement-form']}
          >
            <Select
              name="reason"
              value=""
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              className={'form-control delete-account-select'}
              elementWrapperClassName={[{'col-sm-9': false}, 'delete-account-element-wrapper']}
              options={selectReason}
            />

            <p>Please, read below articles from our Help and FAQ pages, before you permanetly delete your account.</p>

            <ul>
              <li>How to manage sharing settings</li>
              <li>How to block someone</li>
              <li>How to report someone</li>
            </ul>

            <p><b>Please, read below articles from our Help and FAQ pages, before you permanetly delete your account.</b></p>
            <Input
              name="occupation"
              // value={occ_value}
              placeholder="Your password"
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              className={'form-control delete-account-select'}
              elementWrapperClassName={[{'col-sm-9': false}, 'delete-account-element-wrapper']}
              type="text"
            />
            <p>By pressing the button below, you kudos, comments, likes, private messages, and all other data will be deleted permanently and will not be recoverable.</p>

            <button className="submit-btn delete-account-btn" type="submit">Delete my account permanently</button>
          </Form>

        </div>
      </div>
    );
  }
}

export default DeleteAccount;
