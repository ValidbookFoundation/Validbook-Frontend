import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { TextField } from 'react-md';

import {
  getMessageForSignatureLogin,
  getAccessToken,
  signupUser
} from '../../actions/user';
import { 
  REGISTRATION_STEP,
  FIELD_ID
} from './constants';
import './authorization.scss';

const web3 = new Web3(Web3.givenProvider);

@connect(null, {
  getMessageForSignatureLogin,
  getAccessToken,
  signupUser
})
export default class Authorization extends Component {
  state = {
    first_name: '',
    last_name: '',
    password: '',
    form_step: REGISTRATION_STEP.PASSWORD_FOR_PROD,
    file: null,
    errors: {},
    downloaded_files: {
      keystore: null,
      recovery_keystore: null
    },
    password_for_prod: ''
  };

  keystore = null
  recovery_keystore = null

  componentDidMount() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('hello');
      window.shingle.new({
        el: document.getElementById('shinglecontainer'),
        nodeRadiusScaleFactor: 1 / 200.0,
        nodeRadiusScalePower: 0.75,
        initialZoom: 37,
        useBitmap: true,
        useMarkers: true,
        selectNodes: false,
        zoomSlider: false,
        nodeColors: [[255, 193, 7], [156, 39, 176], [139, 195, 74], [33, 150, 243], [244, 67, 54], [121, 85, 72], [233, 30, 99], [63, 81, 181], [0, 188, 212], [229, 57, 53]]
      });
    }
  }

  _signUpStep = () => {
    this.setState({
      form_step: REGISTRATION_STEP.SIGN_UP
    });
  };

  _fieldsChange = (fieldId, e) => {
    const { errors, password } = this.state;
    const new_errors = Object.assign({}, errors);

    if (errors.password && password.length > 8) {
      delete new_errors.password;
    }
    
    this.setState({
      errors: new_errors,
      [fieldId]: e
    });
  };

  _downloadFile = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(text)));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  _downloadKeystoreFile = () => {
    const { password, downloaded_files, first_name, last_name } = this.state;

    if (!downloaded_files.keystore) {
      const account = web3.eth.accounts.create();
      this.keystore = web3.eth.accounts.encrypt(account.privateKey, password);
      
      this.setState({
        downloaded_files: Object.assign({}, downloaded_files, {
          keystore: account.address
        })
      });
    }
    
    const keystore_filename = `${first_name}-${last_name}-keystore-file`;

    this._downloadFile(keystore_filename, this.keystore);
  };

  _downloadRecoveryKeystoreFile = () => {
    const { password, downloaded_files, first_name, last_name } = this.state;

    if (!downloaded_files.recovery_keystore) {
      const recovery_account = web3.eth.accounts.create();
      this.recovery_keystore = web3.eth.accounts.encrypt(
        recovery_account.privateKey,
        password
      );
      
      this.setState({
        downloaded_files: Object.assign({}, downloaded_files, {
          recovery_keystore: recovery_account.address
        })
      });
    }

    const recovery_keystore_filename = `${first_name}-${
      last_name
    }-recovery-keystore-file`;

    this._downloadFile(recovery_keystore_filename, this.recovery_keystore);
  };

  _signUp = () => {
    const { first_name, last_name, downloaded_files } = this.state;

    if (downloaded_files.keystore && downloaded_files.recovery_keystore) {
      this.props.signupUser(
          first_name,
          last_name,
          downloaded_files.keystore,
          downloaded_files.recovery_keystore
        )
        .then(response => {
          if (response.status === 'success') {
            this.keystore = null;
            this.recovery_keystore = null;
            browserHistory.push('/engagement');
          }
        });
    }
  };

  _createAccount = () => {
    const { password, errors } = this.state;

    if (password.length >= 9) {
      this.setState({
        errors: {},
        form_step: REGISTRATION_STEP.DOWNLOAD_KEYSTORES
      });
    } else {
      this.setState({
        errors: {
          password:
            'Your password must be at least 9 characters. Please ensure it is a strong password.'
        }
      });
    }
  };

  _fileChange = e => {
    e.preventDefault();
    const file = e.target.files[0];

    this.setState({ file });
  };

  _signInStep = () => {
    this.setState({
      form_step: REGISTRATION_STEP.SIGN_IN
    });
  };

  _signIn = () => {
    const { file, password } = this.state;
    const reader = new FileReader();

    if (password >= 9) {
      reader.readAsText(file);
      reader.onloadend = () => {
        const keystore = reader.result;
        const decrypt = web3.eth.accounts.decrypt(
          JSON.parse(keystore.toLowerCase()),
          password
        );
  
        this.props.getMessageForSignatureLogin(decrypt.address).then(response => {
          const resultOfSigning = web3.eth.accounts.sign(
            response.data.message,
            decrypt.privateKey
          );
  
          this.props.getAccessToken(decrypt.address, resultOfSigning.signature);
        });
      };

      this.setState({
        errors: {}
      });
    } else {
      this.setState({
        errors: {
          password:
            'Your password must be at least 9 characters. Please ensure it is a strong password.'
        }
      });
    }
  };

  _emptyPassword = () => {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        empty_password: 'Select keystore file first'
      })
    });

    setTimeout(() => {
      const errors = Object.assign({}, this.state.errors);
      delete errors.empty_password;

      this.setState({
        errors
      });
    }, 3000);
  }

  _backToMainWindow = () => {
    this.setState({
      form_step: null,
      password: '',
      first_name: '',
      last_name: '',
      file: null
    });
  };

  _errorRender = (error) => {
    if (!error) {
      return null;
    }
    
    return <div className="block-additional">{error}</div>;
  }

  signUpFormRender = () => {
    const {
      form_step,
      password,
      file,
      first_name,
      last_name,
      downloaded_files,
      errors
    } = this.state;

    switch (form_step) {
      case REGISTRATION_STEP.SIGN_IN: {
        return (
          <section className="signin-form">
            <div className="input-field">
              <input
                type="file"
                name="keystore"
                id="keystore"
                onChange={this._fileChange}
              />
              <label htmlFor="keystore">
                {file ? file.name : 'Select Keystore File'}
              </label>
            </div>

            {this._errorRender(errors.empty_password)}

            {file 
              ? <TextField
                required
                error={!!errors.password || false}
                type="password"
                id="floating-label-icon-counter-error-text-field"
                label="Type password to your keystore file"
                className="md-cell md-cell--top"
                onChange={(e) => this._fieldsChange(FIELD_ID.PASSWORD, e)}
                errorText={errors.password || ''}
                helpText="At least 9 characters"
                defaultValue={password}
              />
              : <TextField
                id="password"
                label="Type password to your keystore file"
                type="password"
                disabled
                onClick={this._emptyPassword}
                className="md-cell md-cell--bottom"
              />
            }

            <div className="buttons-container">
              <button 
                className="signin-button" 
                onClick={this._signIn}>Sign In</button>
              <a href="#" onClick={this._backToMainWindow}>
                Back
              </a>
            </div>
          </section>
        );
      }

      case REGISTRATION_STEP.SIGN_UP: {
        return (
          <section className="signup-form">
            <TextField
              required
              id="first_name"
              label="First Name"
              lineDirection="center"
              className="md-cell md-cell--bottom"
              onChange={(e) => this._fieldsChange(FIELD_ID.FIRST_NAME, e)}
              defaultValue={first_name}
              errorText="This field is required."
            />
            <TextField
              required
              id="last_name"
              label="Last Name"
              lineDirection="center"
              className="md-cell md-cell--bottom"
              onChange={(e) => this._fieldsChange(FIELD_ID.LAST_NAME, e)}
              defaultValue={last_name}
              errorText="This field is required."
            />
            <TextField
              required
              error={!!errors.password || false}
              type="password"
              id="floating-label-icon-counter-error-text-field"
              label="Enter a password (Do NOT forget to save this!)"
              className="md-cell md-cell--top"
              onChange={(e) => this._fieldsChange(FIELD_ID.PASSWORD, e)}
              errorText={errors.password || 'This field is required.'}
              infoText="At least 9 characters"
              defaultValue={password}
            />

            <div className="buttons-container">
              <button
                className="create-account-button"
                onClick={this._createAccount}
              >
                Create New Account
              </button>

              <a href="#" onClick={this._backToMainWindow}>
                Backƒ
              </a>
            </div>
          </section>
        );
      }

      case REGISTRATION_STEP.DOWNLOAD_KEYSTORES: {
        return (
          <section className="download-keystores">
            <h2>Save your Keystore Files</h2>

            <button 
              className="download-button"
              onClick={this._downloadKeystoreFile}>
              Download Keystore File
            </button>

            <button 
              className="download-button"
              onClick={this._downloadRecoveryKeystoreFile}>
              Download Recovery Keystore File
            </button>

            <div>
              <p>Do not lose it!</p>
              <p>Do not share it!</p>
              <p>Store keystore files in secure separate places!</p>
            </div>

            <button
              style={{
                opacity:
                  !downloaded_files.keystore ||
                  !downloaded_files.recovery_keystore
                    ? 0.7
                    : 1
              }}
              disabled={
                !downloaded_files.keystore ||
                !downloaded_files.recovery_keystore
              }
              className="signup-button"
              onClick={this._signUp}
            >
              I understand. Continue.
            </button>
          </section>
        );
      }

      default:
        return (
          <section className="main-window">
            <button onClick={this._signInStep} className="signin-button">
              Sign In
            </button>
            <button onClick={this._signUpStep} className="signup-button">
              Create New Account
            </button>
          </section>
        );
    }
  };

  passwordForProdHandler = (e) => {
    this.setState({
      password_for_prod: e.target.value
    });
  }

  checkProdPassword = () => {
    if (this.state.password_for_prod === 'Kudos are forever') {
      this.setState({
        form_step: null
      });
    }
  }

  render() {
    const { form_step, errors, password_for_prod } = this.state;
    const { password } = errors;

    if (form_step === REGISTRATION_STEP.PASSWORD_FOR_PROD) {
      return (
        <div style={{
          textAlign: 'center',
          marginTop: 300
        }}>
          <div style={{marginBottom: 20}}>You don't have to be an algebraist to know</div>
          <input
            type="password"
            name="password_for_prod"
            onChange={this.passwordForProdHandler}
            value={password_for_prod}
          />
          <button
            onClick={this.checkProdPassword}
          >
            Enter
          </button>
        </div>
      );
    }
    
    return (
      <div id="authorization">
        <div
          id="shinglecontainer"
          data-width="100%"
          data-height="100%"
          data-graph-path="/graph/random-graph_500000/"
          data-node-field="nodenumber"
        />

        <div className="auth-form">
          <header>
            <h1>Validbook</h1>
            <p>A universal platform for cooperation</p>
          </header>

          <hr className="devider" />

          {this.signUpFormRender()}

          <hr className="devider" />

          <footer>
            <p>
              Validbook is a public utility openly developed and governed. For
              more details see <a href="#">Validbook Wiki</a> and{" "}
              <a href="#">Forum</a>.
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

Authorization.propTypes = {
};

// {this.props.loading && (
//   <div className='spinner-bg'>
//     <div className='wrapper-loader'>
//       <div className='loader' style={{width: '65px', position: 'absolute', top: '40%', left: 'calc(50% - 35px)'}}>
//         <svg className='circular' viewBox='25 25 50 50'>
//           <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='2' strokeMiterlimit='10'/>
//         </svg>
//       </div>
//     </div>
//   </div>
// )}
