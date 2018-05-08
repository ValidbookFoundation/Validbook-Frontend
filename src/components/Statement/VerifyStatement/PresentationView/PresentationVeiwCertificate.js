import React, { Component } from 'react';

class PresentationViewCertificate extends Component {
  componentDidMount() {
    const { json } = this.props;

    if (json.presentationTemplate && json.proof && json.proof.creator && json.proof.created && json.claim) {
      const created = document.querySelector('#created');
      if (created) {
        created.value = json.proof.created;
      }
      const creator = document.querySelector('#creator');
      if (creator) {
        creator.value = json.proof.creator;
      }
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
    const { json } = this.props;

    if (json.presentationTemplate && json.proof && json.proof.creator && json.proof.created && json.claim) {
      const created = document.querySelector('#created');
      if (created) {
        created.value = json.proof.created;
      }
      const creator = document.querySelector('#creator');
      if (creator) {
        creator.value = json.proof.creator;
      }
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
  
  render() {
    console.log(this.props.json);
    return (
      <div className="presentation_view" dangerouslySetInnerHTML={{__html: this.props.json.presentationTemplate}}/>
    );
  }
}

export default PresentationViewCertificate;
