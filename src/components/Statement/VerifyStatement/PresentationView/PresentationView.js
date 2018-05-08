import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PresentationViewCertificate from './PresentationVeiwCertificate';

import './PresentationView.scss';

class PresentationView extends Component {

  selectFile = (e) => {
    this.props.droped(e.target.files);
  }

  presentationViewCertificateRender = () => {
    const { json } = this.props;
    if (!json.id) {
      return null;
    }

    return (
      <PresentationViewCertificate 
        json={json}
      />
    );
  }

  presentationContentRender = () => {
    const { json } = this.props;

    if (json.presentationTemplate) {
      return this.presentationViewCertificateRender();
    } else {
      return (
        <div className="select_statement_container">
          <span>Drop statement file</span>
          <span>or</span>
          <div className="select_statement_file_field">
            <input
              type="file"
              id="json"
              name="json"
              onChange={this.selectFile}
            />
            <label htmlFor="json">Select File</label> 
          </div>
        </div>
      );
    }
  }

  render() {
    return this.presentationContentRender();
  }
}

PresentationView.propTypes = {
  json: PropTypes.object,
  droped: PropTypes.func,
};

export default PresentationView;
