import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PresentationView.scss';

class PresentationView extends Component {
  componentDidMount() {
    const { json, creator } = this.props;
    const file_field = document.querySelector('#file');
    if (file_field) {
      file_field.addEventListener('change', this.inputFieldChange, false);
    }

    const created_field = document.querySelector('#created');
    if (created_field) {
      created_field.value = this.createDate();
    }

    const creator_filed = document.querySelector('#creator');
    if (creator_filed && creator) {
      creator_filed.value = creator;
    }

    if (json.presentationTemplate) {
      Object.keys(json.claim).forEach(key => {
        if (key === 'fileHash') {
          const file_hash_field = document.querySelector('#fileHash');
          if (file_hash_field) {
            file_hash_field.innerHTML = json.claim[key];
          }
        } else if (key === 'fileName') {
          const file_field = document.querySelector('#file');
          if (file_field) {
            const label = document.querySelector('input + label');
            if (label) {
              label.innerHTML = json.claim[key] ? json.claim[key] : 'Select File';
            }
          }
        } else {
          const item = document.querySelector(`#${key}`);
          if (item) {
            item.value = json.claim[key];
          }
        }
      });
    }
  }

  componentDidUpdate() {
    const { json, creator } = this.props;
    const file_field = document.querySelector('#file');
    if (file_field) {
      file_field.addEventListener('change', this.inputFieldChange, false);
    }

    const created_field = document.querySelector('#created');
    if (created_field) {
      created_field.value = this.createDate();
    }

    const creator_filed = document.querySelector('#creator');
    if (creator_filed && creator) {
      creator_filed.value = creator;
    }

    if (json.presentationTemplate) {
      Object.keys(json.claim).forEach(key => {
        if (key === 'fileHash') {
          const file_hash_field = document.querySelector('#fileHash');
          if (file_hash_field) {
            file_hash_field.innerHTML = json.claim[key];
          }
        } else if (key === 'fileName') {
          const file_field = document.querySelector('#file');
          if (file_field) {
            const label = document.querySelector('input + label');
            if (label) {
              label.innerHTML = json.claim[key] ? json.claim[key] : 'Select File';
            }
          }
        } else {
          const item = document.querySelector(`#${key}`);
          if (item) {
            item.value = json.claim[key];
          }
        }
      });
    }
  }

  createDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    } 
    return dd + '.' + mm + '.' + yyyy;
  }

  inputFieldChange = (e) => {
    this.props.changed(e);
  }

  render() {
    return (
      <div className="presentation_view" dangerouslySetInnerHTML={{__html: this.props.json.presentationTemplate}} onInput={this.inputFieldChange}/>
    );
  }
}

PresentationView.propTypes = {
  creator: PropTypes.string,
  json: PropTypes.object,
  changed: PropTypes.func,
};

export default PresentationView;
