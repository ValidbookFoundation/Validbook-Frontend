import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  getCard,
  addLinkDigitalProperty,
  revokeLinkedDigitalProperty,
  proofLinkedDigitalProperty
} from '../../actions/accountCard';
import {
  parsePublicAddress,
  parseRandomNumber
} from '../../utils/url_parsing';
import {
  LINKED_DIGITAL_PROPERTY_DIALOGS,
  SOCIAL_NETWORKS,
  SOCIAL_NETWORK_URL,
  FACEBOOK_APP_IDS
} from './constants';

import TwitterUserNameModal from './TwitterUserNameModal';
import FacebookUserNameModal from './FacebookUserNameModal';
import AccountCard from './AccountCard';
import TweetModal from './TweetModal';
import FacebookPostModal from './FacebookPostModal';
// import LinkedDigitalProperties from './LinkedDigitalProperties';
import ClaimInformation from './ClaimInformation';
import './account-card-page.scss';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const state = getState();
      const path = state.routing.locationBeforeTransitions.pathname;
      const random_number = parseRandomNumber(path);
      const public_address = parsePublicAddress(path);

      if (random_number && public_address) {
        return dispatch(getCard(public_address));
      }
    }
  }
])
@connect(
  state => ({
    authorized_user: state.user.authorized_user,
    requested_user: state.user.requested_user,
    path: state.routing.locationBeforeTransitions.pathname,
    card: state.account_card
  }),
  {
    getCard,
    addLinkDigitalProperty,
    revokeLinkedDigitalProperty,
    proofLinkedDigitalProperty
  }
)
export default class AccountCardPage extends Component {
  constructor() {
    super();

    this.state = {
      step_dialog: null,
      property_id: null
    };
  }

  componentDidMount() {
    const { path, getCard } = this.props;
    const random_number = parseRandomNumber(path);
    const public_address = parsePublicAddress(path);

    if (!random_number && public_address) {
      getCard(public_address);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      const { path, getCard } = nextProps;
      const public_address = parsePublicAddress(path);

      if (public_address) {
        getCard(public_address);
      }
    }
  }

  claimsListRender() {
    return (
      <div className="card_claims_container">
        <div className="card_claims_header">
          <h2>Claims about this card</h2>
          <span className="help_icon">
            <div className="block-additional">
              See explanations about Account Cards and Account Card's Claims
            </div>
          </span>
        </div>
        <div className="support_claims_list">
          <div>This card uniquely represents human individual</div>
          <hr className="devider"/>
          {this.accountCardButtonsRender()}
        </div>
      </div>
    );
  }

  claimInformationRender() {
    return (
      <ClaimInformation />
    );
  }

  createFacebookPost = response => {
    const { card, authorized_user } = this.props;
    const property = card.linked_digital_properties.filter(
      property => property.id === this.state.property_id
    )[0];
    const random_number = property && property.random_number;

    if (response.accessToken) {
      this.token = response.accessToken;
      window.open(
        `https://www.facebook.com/dialog/feed?app_id=${
          FACEBOOK_APP_IDS.DEV
        }&link=http://futurama11001111.validbook.org/${
          authorized_user.slug
        }/documents/account-card/${card.public_address}/${random_number}`,
        'FacebookPost',
        'width=600,height=377,resizable,scrollbars=yes,status=1,top=500,left=500'
      );
    }
  };

  openFacebookUserNameModal = () => {
    this.setState({
      step_dialog: LINKED_DIGITAL_PROPERTY_DIALOGS.FACEBOOK_USER_NAME
    });
  };

  openTwitterUserNameModal = () => {
    this.setState({
      step_dialog: LINKED_DIGITAL_PROPERTY_DIALOGS.TWITTER_USER_NAME
    });
  };

  closeTwitterUserNameModal = () => {
    this.setState({
      step_dialog: null
    });
  };

  saveTwitterUserName = user_name => {
    const { card, addLinkDigitalProperty } = this.props;
    const user_account = SOCIAL_NETWORK_URL.TWITTER + user_name;

    addLinkDigitalProperty(
      card.public_address,
      SOCIAL_NETWORKS.TWITTER,
      user_account
    ).then(response => {
      if (response.data.id) {
        this.setState({
          step_dialog: LINKED_DIGITAL_PROPERTY_DIALOGS.TWITTER_TWEET,
          property_id: response.data.id
        });
      }
    });
  };

  closeTweetModal = () => {
    const { property_id } = this.state;
    const { revokeLinkedDigitalProperty, card } = this.props;

    revokeLinkedDigitalProperty(card.public_address, property_id).then(
      response => {
        if (response.data) {
          this.setState({
            step_dialog: null,
            property_id: null
          });
        }
      }
    );
  };

  checkFacebook = () => {
    const data = {
      property_id: this.state.property_id,
      property: SOCIAL_NETWORKS.FACEBOOK,
      facebook_token: this.token
    };

    this.proofLinkedProperty(data);
  };

  checkTweet = () => {
    const data = {
      property_id: this.state.property_id,
      property: SOCIAL_NETWORKS.TWITTER
    };

    this.proofLinkedProperty(data);
  };

  proofLinkedProperty = data => {
    const { card, proofLinkedDigitalProperty } = this.props;

    proofLinkedDigitalProperty(card.public_address, data).then(response => {
      if (response.data.is_valid) {
        this.setState({
          step_dialog: null,
          property_id: null
        });
      }
      this.token = null;
    });
  };

  closeFacebookUserNameModal = () => {
    this.setState({
      step_dialog: null
    });
  };

  saveFacebookUserName = user_name => {
    const { addLinkDigitalProperty, card } = this.props;
    const url_to_property = SOCIAL_NETWORK_URL.FACEBOOK + user_name;    

    addLinkDigitalProperty(
      card.public_address,
      SOCIAL_NETWORKS.FACEBOOK,
      url_to_property
    ).then(response => {
      if (response.data.id) {
        this.setState({
          step_dialog: LINKED_DIGITAL_PROPERTY_DIALOGS.FACEBOOK_POST,
          property_id: response.data.id
        });
      }
    });
  };

  revokeLinkedProperty = () => {
    const { property_id } = this.state;
    const { revokeLinkedDigitalProperty, card } = this.props;

    this.setState({
      step_dialog: null,
      property_id: null
    });
    revokeLinkedDigitalProperty(card.public_address, property_id);
  };

  helmetRender = () => {
    const { path, requested_user, card } = this.props;
    const random_number = parseRandomNumber(path);

    if (card.public_address && requested_user.id) {
      const property =
        card.linked_digital_properties &&
        card.linked_digital_properties.filter(
          item => item.random_number === +random_number
        )[0];

      if (property && property.property === 'twitter') {
        return (
          <Helmet
            title={random_number}
            meta={[
              {
                property: 'twitter:title',
                content: `Proving ownership over my Twitter account. Posting random number generated by Validbook: ${
                  random_number
                }`
              },
              {
                property: 'twitter:description',
                content: `${requested_user.first_name} ${
                  requested_user.last_name
                } is now on Validbook - a universal platform for cooperation`
              }
            ]}
          />
        );
      } else if (property && property.property === 'facebook') {
        return (
          <Helmet
            title={random_number}
            meta={[
              {
                property: 'og:title',
                content: `Proving ownership over my Facebook account. Posting random number generated by Validbook: ${
                  random_number
                }`
              },
              {
                property: 'og:description',
                content: `${requested_user.first_name} ${
                  requested_user.last_name
                } is now on Validbook - a universal platform for cooperation`
              }
            ]}
          />
        );
      }
    }
  };

  dialogsRender = () => {
    const { step_dialog } = this.state;
    let dialog = null;

    switch (this.state.step_dialog) {
      case LINKED_DIGITAL_PROPERTY_DIALOGS.FACEBOOK_POST: {
        dialog = (
          <FacebookPostModal
            showModal={!!step_dialog}
            createFacebookPostHandler={this.createFacebookPost}
            closeModalHandler={this.revokeLinkedProperty}
            checkFacebookPostHandler={this.checkFacebook}
          />
        );
        break;
      }

      case LINKED_DIGITAL_PROPERTY_DIALOGS.FACEBOOK_USER_NAME: {
        dialog = (
          <FacebookUserNameModal
            showModal={!!step_dialog}
            closeModalHandler={this.closeFacebookUserNameModal}
            saveFacebookUserNameHandler={this.saveFacebookUserName}
          />
        );
        break;
      }

      case LINKED_DIGITAL_PROPERTY_DIALOGS.TWITTER_TWEET: {
        const { authorized_user, card } = this.props;
        const property = card.linked_digital_properties.filter(
          property => property.id === this.state.property_id
        )[0];
        const data = {
          public_address: card.public_address,
          random_number: property.random_number
        };

        dialog = (
          <TweetModal
            card={data}
            user_slug={authorized_user.slug}
            showModal={!!step_dialog}
            closeModalHandler={this.revokeLinkedProperty}
            checkTweetHandler={this.checkTweet}
          />
        );
        break;
      }

      case LINKED_DIGITAL_PROPERTY_DIALOGS.TWITTER_USER_NAME: {
        dialog = (
          <TwitterUserNameModal
            showModal={!!step_dialog}
            closeModalHandler={this.closeTwitterUserNameModal}
            saveTwitterUserNameHandler={this.saveTwitterUserName}
          />
        );
        break;
      }
    }

    return dialog;
  };
  
  accountCardButtonsRender = () => {
    const { authorized_user, requested_user, card, info_block } = this.props;

    if (!card || !authorized_user.id || !requested_user.id || info_block) {
      return null;
    }

    let self_sign = null;

    if (card.claims) {
      self_sign = card.claims.filter(claim => claim.type === 'I am human')[0];
    }
    
    if (
      authorized_user.id &&
      authorized_user.id === requested_user.id &&
      card.public_address &&
      !self_sign
    ) {
      return (
        <div className="add-new-claim" onClick={this._newDocumentClick}>
          <span className="add-new-claim-icon" />
          <div className="block-additional">
            Make new claim about card
          </div>
        </div>
      );
    }
  };

  render() {
    const {
      authorized_user,
      card,
      requested_user,
      revokeLinkedDigitalProperty,
      small_subheader
    } = this.props;

    return (
      <div className="human-card-page">
        <div
          style={{
            position: small_subheader ? 'fixed' : null,
            top: small_subheader ? 116 : null
          }}
          className="left_side_container">
          <AccountCard
            card={card}
            authorized_user={authorized_user}
          />
          {this.claimsListRender()}
        </div>
        {this.helmetRender()}

        {/* <LinkedDigitalProperties
          card={card}
          authorized_user_id={authorized_user.id}
          requested_user_id={requested_user.id}
          openFacebookUserNameModalHandler={this.openFacebookUserNameModal}
          openTwitterUserNameModalHandler={this.openTwitterUserNameModal}
          revokeLinkedDigitalPropertyHandler={revokeLinkedDigitalProperty}
        /> */}
        <div className="right_side_container">
          {this.claimInformationRender()}
        </div>
        {this.dialogsRender()}
      </div>
    );
  }
}
