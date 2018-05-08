import React, { Component } from 'react';
import { TextField } from 'react-md';
import './claim-information.scss';

export default class ClaimInformation extends Component {
  render() {
    return (
      <div className="claim_information">
        <div className="claim">
          <svg xmlns="http://www.w3.org/2000/svg" height="19" width="4.75" version="1.1" viewBox="0 0 4.75 19">
            <path d="m2.4254 6.2665c0.9467 0 1.7213-0.77457 1.7213-1.7213 0-0.9467-0.77457-1.7213-1.7213-1.7213-0.9467 0-1.7213 0.77457-1.7213 1.7213 0 0.9467 0.77457 1.7213 1.7213 1.7213zm0 1.7213c-0.9467 0-1.7213 0.77457-1.7213 1.7213 0 0.9467 0.77457 1.7213 1.7213 1.7213 0.9467 0 1.7213-0.77457 1.7213-1.7213 0-0.9467-0.77457-1.7213-1.7213-1.7213zm0 5.1638c-0.9467 0-1.7213 0.77457-1.7213 1.7213 0 0.9467 0.77457 1.7213 1.7213 1.7213 0.9467 0 1.7213-0.77457 1.7213-1.7213 0-0.9467-0.77457-1.7213-1.7213-1.7213z" strokeWidth=".86064" fill="#cdcdcd"/>
          </svg>
          <TextField
            id="floating-center-title"
            label="Claim Name"
            placeholder="Add claim name"
            className="md-cell md-cell--bottom"
          />
          <TextField
            id="floating-multiline"
            label="Claim Text"
            rows={3}
            placeholder="Add claim text"
            className="md-cell md-cell--bottom"
          />
          
          <div className="md-grid">
            <TextField
              id="floating-center-title"
              label="Date"
              className="md-cell md-cell--bottom"
              value="30-NOV-2017 10:52:42"
            />
            <TextField
              id="floating-center-title"
              label="Author"
              className="md-cell md-cell--bottom"
              value="Test3 Test3"
            />
          </div>
        </div>

        <button className="btn-brand">Make Supporting Claim</button>

        <TextField
          id="floating-center-title"
          label="Proofs and Supporting Claims"
          placeholder="Add proofs or supporting claim"
          className="md-cell md-cell--bottom"
        />
        
        <TextField
          id="floating-center-title"
          label="Acknowledgement Claims"
          placeholder="Acknowledgement will be here"
          className="md-cell md-cell--bottom"
        />
      </div>
    );
  }
}
