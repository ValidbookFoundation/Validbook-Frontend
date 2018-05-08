import {
  GET_CARD,
  GET_CARD_SUCCESS,
  GET_CARD_FAIL,
  HUMAN_CLAIM_SIGNATURE,
  HUMAN_CLAIM_SIGNATURE_SUCCESS,
  HUMAN_CLAIM_SIGNATURE_FAIL,
  CLEAR_CARD,
  
  SUPPORT_HUMAN_CLAIM_SIGNATURE,
  SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS,
  SUPPORT_HUMAN_CLAIM_SIGNATURE_FAIL,
  REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE,
  REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS,
  REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_FAIL,
  
  ADD_LINK_DIGITAL_PROPERTY,
  ADD_LINK_DIGITAL_PROPERTY_SUCCESS,
  ADD_LINK_DIGITAL_PROPERTY_FAIL,
  REVOKE_LINK_DIGITAL_PROPERTY,
  REVOKE_LINK_DIGITAL_PROPERTY_SUCCESS,
  REVOKE_LINK_DIGITAL_PROPERTY_FAIL,
  PROOF_LINK_DIGITAL_PROPERTY,
  PROOF_LINK_DIGITAL_PROPERTY_SUCCESS,
  PROOF_LINK_DIGITAL_PROPERTY_FAIL
} from '../constants/accountCard';

export function getCard(public_address) {
  return {
    types: [GET_CARD, GET_CARD_SUCCESS, GET_CARD_FAIL],
    promise: (client) => client.get(`/card/${public_address}`)
  };
}

export const humanClaimSignature = (public_address, signature) => {
  return {
    types: [HUMAN_CLAIM_SIGNATURE, HUMAN_CLAIM_SIGNATURE_SUCCESS, HUMAN_CLAIM_SIGNATURE_FAIL],
    promise: (client) => client.patch(`/card/${public_address}/human-claim-sig`, {data: {signature}}),
  };
};

export const supportHumanClaimSignature = (public_address, data) => {
  return {
    types: [SUPPORT_HUMAN_CLAIM_SIGNATURE, SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS, SUPPORT_HUMAN_CLAIM_SIGNATURE_FAIL],
    promise: (client) => client.patch(`/card/${public_address}/support-human-claim`, {data}),
  };
};

export const revokeSupportHumanClaimSignature = (card_address, auth_user_card_adress) => {
  console.log(card_address, auth_user_card_adress);
  return {
    types: [REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE, REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS, REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_FAIL],
    promise: (client) => client.patch(`/card/${card_address}/revoke-support-signature`),
    auth_user_card_adress
  };
};

// export const revokeAccountCard = (public_address, signature) => {
//   return {
//     types: [REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE, REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS, REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_FAIL],
//     promise: (client) => client.patch(`/card/${public_address}/revoke`, {data: {public_address, signature}})
//   };
// }

// link digital properties actions

export const addLinkDigitalProperty = (public_address, property, url_to_property) => {
  return {
    types: [ADD_LINK_DIGITAL_PROPERTY, ADD_LINK_DIGITAL_PROPERTY_SUCCESS, ADD_LINK_DIGITAL_PROPERTY_FAIL],
    promise: (client) => client.patch(`/card/${public_address}/add-digital-property`, {data: {property, url_to_property}})
  };
};

export const revokeLinkedDigitalProperty = (public_address, property_id) => {
  return {
    types: [REVOKE_LINK_DIGITAL_PROPERTY, REVOKE_LINK_DIGITAL_PROPERTY_SUCCESS, REVOKE_LINK_DIGITAL_PROPERTY_FAIL],
    promise: (client) => client.patch(`/card/${public_address}/revoke-digital-property`, {data: {property_id}}),
    property_id
  };
};

export const proofLinkedDigitalProperty = (public_address, data) => {
  return {
    types: [PROOF_LINK_DIGITAL_PROPERTY, PROOF_LINK_DIGITAL_PROPERTY_SUCCESS, PROOF_LINK_DIGITAL_PROPERTY_FAIL],
    promise: (client) => client.patch(`/card/${public_address}/proof-digital-property`, {data}),
    property_id: data.property_id
  };
};

export const clearAccountCard = () => {
  return {
    type: CLEAR_CARD
  };
};
