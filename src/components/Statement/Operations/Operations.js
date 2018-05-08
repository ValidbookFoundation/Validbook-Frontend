import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectField } from 'react-md';

import './Operations.scss';

class Operations extends Component {
  static propTypes = {
    data_template_id: PropTypes.string,
    presentation_tepmlate_id: PropTypes.string,
    data_templates: PropTypes.array,
    presentation_templates: PropTypes.array,
    dataTemplateChanged: PropTypes.func,
    presentationTemplateChanged: PropTypes.func,
    buttonClicked: PropTypes.func,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      presentation_tepmlate_id: props.presentation_tepmlate_id ? props.presentation_tepmlate_id : '-1',
      data_template_id: props.data_template_id ? props.data_template_id : '-1'
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((!this.props.data_template_id && nextProps.data_template_id) || (!this.presentation_tepmlate_id && nextProps.presentation_tepmlate_id)) {
      this.setState({
        data_template_id: nextProps.data_template_id,
        presentation_tepmlate_id: nextProps.presentation_tepmlate_id
      });
    }
  }
  
  
  templatesChange = (value, field_id) => {
    if (field_id === 'data_template_id') {
      this.props.dataTemplateChanged(value);
    } else {
      this.props.presentationTemplateChanged(value);
    }

    this.setState({
      [field_id]: value
    });
  }

  render() {
    const { data_templates, presentation_templates, buttonClicked } = this.props;
    const { data_template_id, presentation_tepmlate_id } = this.state;

    return (
      <div className="statement_operations_container">
        <div className="statement_operations_content">
          <div className="statement_templates">
            <SelectField
              id="data_templates"
              placeholder="Generic Statement"
              className="md-cell"
              menuItems={data_templates}
              value={data_template_id}
              helpText="Data Template"
              onChange={(value) => this.templatesChange(value, 'data_template_id')}
            />
            <SelectField
              id="presentation_templates"
              placeholder="Select Template"
              className="md-cell"
              menuItems={presentation_templates}
              value={presentation_tepmlate_id}
              helpText="Presentation Template"
              onChange={(value) => this.templatesChange(value, 'presentation_tepmlate_id')}
            />
          </div>
          <div className="statement_operations">
            <button
              className="btn-brand"
              onClick={this.verifyStatementHandler}
            >
              Verify
            </button>
            <button
              className="btn-brand btn-sign"
              onClick={buttonClicked}
            >
              Sign
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Operations;
