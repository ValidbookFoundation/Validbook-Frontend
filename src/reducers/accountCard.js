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
import {
  filterRevokedSupportSignature
} from '../utils/accountCard';

export default function accountCardReducer(state = {}, action) {
  switch (action.type) {
    case GET_CARD:
      return state;
    
    case GET_CARD_SUCCESS:
      return Object.assign({}, action.result.data);
    
    case GET_CARD_FAIL:
      return {
        ...state,
        error: action.error,
      };
      
    case SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS:
    case HUMAN_CLAIM_SIGNATURE_SUCCESS: {
      return Object.assign({}, state, {
        claims: action.result.data.claims
      });
    }


    case SUPPORT_HUMAN_CLAIM_SIGNATURE:
      return {
        ...state,
      };
    
    case SUPPORT_HUMAN_CLAIM_SIGNATURE_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case REVOKE_SUPPORT_HUMAN_CLAIM_SIGNATURE_SUCCESS: {
      return {
        ...state,
        claims: filterRevokedSupportSignature(state.claims, action.auth_user_card_adress) 
      };
    }
      
    case ADD_LINK_DIGITAL_PROPERTY_SUCCESS: {
      return {
        ...state,
        linked_digital_properties: state.linked_digital_properties
          ? [...state.linked_digital_properties, action.result.data]
          : [action.result.data]
      };
    }
    
    case REVOKE_LINK_DIGITAL_PROPERTY_SUCCESS: {
      return {
        ...state,
        linked_digital_properties: state.linked_digital_properties
          .filter(property => property.id !== action.property_id)
      };
    }

    case PROOF_LINK_DIGITAL_PROPERTY_SUCCESS: {
      return {
        ...state,
        linked_digital_properties: state.linked_digital_properties
          .map(property => {
            if (property.id === action.property_id) {
              return action.result.data;
            }

            return property;
          })
      };
    }

    case CLEAR_CARD: {
      return {};
    }

    default:
      return state;
  }
}
