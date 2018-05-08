import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  PROPERTY_NOT_INDENTITY_TEXT,
  SOCIAL_NETWORKS
} from './constants';
import './linked-digital-properties.scss'; 

class LinkedDigitalProperties extends Component {

  constructor() {
    super();

    this.state = {
      property_id: null
    };
  }

  componentDidMount() {
    window.addEventListener('click', this._closeLinkedPropertyOperations);
  }

  _closeLinkedPropertyOperations = () => {
    if (this.state.property_id) {
      this.setState({
        property_id: null
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._closeShowMoreOperations, false);
  }

  onViewProofClick = (url_proof) => {
    window.open(url_proof);
  }

  onOperationsClick = (property_id, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      property_id: this.state.property_id ? null : property_id
    });
  }

  operationsRender = (property) => {
    const { property_id } = this.state;
    const { revokeLinkedDigitalPropertyHandler, card } = this.props;

    if (!property_id) {
      return null;
    }

    return (
      <div className="linked-properties-operations-container">
        <ul className="linked-properties-operations">
          {property.is_valid
            ? <li><a onClick={() => this.onViewProofClick(property.url_proof)} href="#">See the proof</a></li>
            : null
          }
          <li onClick={() => revokeLinkedDigitalPropertyHandler(card.public_address, property_id)}>Revoke</li>
        </ul>
      </div>
    );
  }

  linkedPropertiesRender = (properties, social_item) => {
    const { property_id, openTwitterUserNameModalHandler, openFacebookUserNameModalHandler } = this.state;

    return properties.map(property => {
      if (!property.random_number && property.property === SOCIAL_NETWORKS.TWITTER) {
        return this.linkNotIndentityRender(openTwitterUserNameModalHandler, PROPERTY_NOT_INDENTITY_TEXT.TWITTER);
      } else if (!property.random_number && property.property === SOCIAL_NETWORKS.FACEBOOK) {
        return this.linkNotIndentityRender(openFacebookUserNameModalHandler, PROPERTY_NOT_INDENTITY_TEXT.FACEBOOK);
      }

      const arr = property.url_property.split('/');
      const user_name = arr[arr.length - 1];

      return (
        <div className="social-item-container">
          {property.property === SOCIAL_NETWORKS.FACEBOOK
            ? <div className="facebook-icon"/>
            : <div className="twitter-icon"/>
          }
          <div key={property.id}>
            <a href={property.url_property}>{user_name}</a>
            <a 
              href="#" 
              className={property.is_valid 
                ? 'property-identify-operations' 
                : 'property-not-identify-operations'
              }
              onClick={(e) => this.onOperationsClick(property.id, e)}
            >
              (proof)
              {property_id && property_id === property.id && this.operationsRender(property)}
            </a>
          </div>
        </div>
      );
    });
  }

  linkNotIndentityRender = (handler, text) => {
    const { authorized_user_id, requested_user_id } = this.props;

    if (authorized_user_id && authorized_user_id === requested_user_id) {
      return (
        <div className="social-item-container">
          {text === PROPERTY_NOT_INDENTITY_TEXT.FACEBOOK
            ? <div className="facebook-icon-not-identity"/>
            : <div className="twitter-icon-not-identity"/>
          }
          <a className="property-not-identity" onClick={handler}>{text}</a>
        </div>
      );
    }

  }

  render() {
    const { card, openFacebookUserNameModalHandler, openTwitterUserNameModalHandler } = this.props;
    let twitters = null;
    let facebooks = null;
    
    if (card && card.linked_digital_properties) {
      twitters = card.linked_digital_properties
      .filter(property => property.property === SOCIAL_NETWORKS.TWITTER);
      facebooks = card.linked_digital_properties
      .filter(property => property.property === SOCIAL_NETWORKS.FACEBOOK);
    }

    return (
      <div className="linked-digital-properties">
        <div className="properties-list">
          {twitters && twitters.length
            ? this.linkedPropertiesRender(twitters)
            : this.linkNotIndentityRender(openTwitterUserNameModalHandler, PROPERTY_NOT_INDENTITY_TEXT.TWITTER)
          }
          {facebooks && facebooks.length
            ? this.linkedPropertiesRender(facebooks)
            : this.linkNotIndentityRender(openFacebookUserNameModalHandler, PROPERTY_NOT_INDENTITY_TEXT.FACEBOOK)
          }
        </div>
      </div>
    );
  }
}

LinkedDigitalProperties.PropTypes = {
  card: PropTypes.object,
  openTwitterUserNameModalHandler: PropTypes.func,
  openFacebookUserNameModalHandler: PropTypes.func,
  revokeLinkedDigitalPropertyHandler: PropTypes.func
};

export default LinkedDigitalProperties;
