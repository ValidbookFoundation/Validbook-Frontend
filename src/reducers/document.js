import {
  CREATE_DOCUMENT,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAIL,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAIL,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAIL,
  RENAME_DOCUMENT,
  RENAME_DOCUMENT_SUCCESS,
  RENAME_DOCUMENT_FAIL,
  MOVE_DOCUMENT_TO,
  MOVE_DOCUMENT_TO_SUCCESS,
  MOVE_DOCUMENT_TO_FAIL,
  COPY_DOCUMENT,
  COPY_DOCUMENT_SUCCESS,
  COPY_DOCUMENT_FAIL,
  DOCUMENT_SIGNATURE,
  DOCUMENT_SIGNATURE_SUCCESS,
  DOCUMENT_SIGNATURE_FAIL,
  OPEN_DOCUMENT_FOR_SIGNATURE,
  OPEN_DOCUMENT_FOR_SIGNATURE_SUCCESS,
  OPEN_DOCUMENT_FOR_SIGNATURE_FAIL,
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAIL,
  GET_DOCUMENT,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAIL,
  OPEN_DOCUMENT,
  CLEAR_DOCUMENT,
  
  // boxes
  GET_BOX,
  GET_BOX_SUCCESS,
  GET_BOX_FAIL,
  CREATE_BOX,
  CREATE_BOX_SUCCESS,
  CREATE_BOX_FAIL,
  CLEAR_BOX,
  
  // wallet
  GET_CUSTODIAL_BALANCE,
  GET_CUSTODIAL_BALANCE_SUCCESS,
  GET_CUSTODIAL_BALANCE_FAIL,
  GET_TRANSACTION_RECORDS,
  GET_TRANSACTION_RECORDS_FAIL,
  GET_TRANSACTION_RECORDS_SUCCESS
} from '../constants/document';

const initialState = {
  box: {},
  document: {},
  custodial_balance: null,
  transactions: []
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOX:
      return {
        ...state,
      };

    case GET_BOX_SUCCESS:
      return {
        ...state,
        box: action.result.data,
      };

    case GET_BOX_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case CREATE_BOX:
      return {
        ...state,
        creating: true
      };

    case CREATE_BOX_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        box: Object.assign({}, state.box, {
          children: state.box.children.concat(action.result.data)
        })
      };
    case CREATE_BOX_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

    case CREATE_DOCUMENT:
      return {
        ...state,
        creating: true
      };

    case CREATE_DOCUMENT_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };


    case CLEAR_BOX:
      return {
        ...state,
        box: {}
      };

    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: state.box.documents.filter(document => document.id !== action.document_id)
        })
      };

    case RENAME_DOCUMENT_SUCCESS:
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: state.box.documents.map(document => {
            if (document.id === action.document_id) {
              return action.result.data;
            }

            return document;
          })
        })
      };
    
    case MOVE_DOCUMENT_TO_SUCCESS:
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: state.box.documents.filter(document => document.id !== action.document_id)
        })
      };

    case COPY_DOCUMENT_SUCCESS: {
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: [...state.box.documents, action.result.data]
        })
      };
    }

    case DOCUMENT_SIGNATURE_SUCCESS: {
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: state.box.documents.map(document => {
            if (document.id === action.document_id) {
              return action.result.data;
            }

            return document;
          })
        })
      };
    }

    case OPEN_DOCUMENT: {
      return {
        ...state,
        document: state.box.documents.filter(document => document.id === action.document_id)[0]
      };
    }

    case CREATE_DOCUMENT_SUCCESS:
    case GET_DOCUMENT_SUCCESS: {
      let xhr;

      if (action.result.data.url) {
        const document = action.result.data;
        xhr = new XMLHttpRequest();
        xhr.open('GET', document.url, false);
        xhr.send();
        
        return {
          ...state,
          document: Object.assign(document, { markdown: xhr.responseText })
        };
      } else {
        return {
          ...state,
          document: Object.assign({}, action.result.data, { markdown: '' })
        };
      }
    }

    case GET_CUSTODIAL_BALANCE_SUCCESS: {
      return Object.assign({}, state, {
        custodial_balance: action.result.data.custodial_balance
      });
    }

    case GET_TRANSACTION_RECORDS_SUCCESS: {
      return {
        ...state,
        transactions: action.result.data
      };
    }

    case CLEAR_DOCUMENT: {
      return {
        ...state,
        document: {}
      };
    }

    default:
      return state;
  }
}
