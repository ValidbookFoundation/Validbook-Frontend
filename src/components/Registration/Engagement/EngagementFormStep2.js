import React from 'react';
import PropTypes from 'prop-types';
import { Form, File} from 'formsy-react-components';
import './index.scss';


const EngagementFormStep2 = ({avatar_value}) => {
  return (
    <Form
      rowClassName={[{'form-group': false}, {row: false}, 'engagement-form']}
    >
      <div className="engagement-wrap-form">
        <div className="engagement-wrap-user-img">
          <img className="engagement-user-avatar" src="http://devianmbanks.validbook.org/cdn/156x156.png?t=1488882812"/>
          <File
            name="avatar"
            value={avatar_value}
          />
        </div>

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

EngagementFormStep2.propTypes = {
  // onSubmit: PropTypes.func,
  // onInvalidSubmit: PropTypes.func,

  avatar_value: PropTypes.string

};

export default EngagementFormStep2;
