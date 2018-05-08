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
  GET_BOXES,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
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

export function createDocument(data) {
  return {
    types: [CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAIL],
    promise: (client) => client.post('/documents', {data})
  };
}

export function createBox(name, parent_id) {
  return {
    types: [CREATE_BOX, CREATE_BOX_SUCCESS, CREATE_BOX_FAIL],
    promise: (client) => client.post('/boxes', {data: {name, parent_id, description: ''}})
  };
}

export function getBoxes(user_slug) {
  return {
    types: [GET_BOXES, GET_BOXES_SUCCESS, GET_BOXES_FAIL],
    promise: (client) => client.get('/boxes', {params: {user_slug}}),
  };
}

export function getBox(box_slug, user_slug) {
  return {
    types: [GET_BOX, GET_BOX_SUCCESS, GET_BOX_FAIL],
    promise: (client) => client.get(`/boxes/${box_slug}?user_slug=${user_slug}`),
  };
}

export const clearBox = () => {
  return {
    type: CLEAR_BOX
  };
};

export const deleteDocument = (document_id) => {
  return {
    types: [DELETE_DOCUMENT, DELETE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_FAIL],
    promise: (client) => client.del(`/documents/${document_id}`),
    document_id
  };
};

export const updateDocumentTitle = (document_id, title) => {
  return {
    types: [RENAME_DOCUMENT, RENAME_DOCUMENT_SUCCESS, RENAME_DOCUMENT_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}`, {data: {title}}),
    document_id
  };
};

export const moveDocumentToBox = (document_id, box_slug) => {
  return {
    types: [MOVE_DOCUMENT_TO, MOVE_DOCUMENT_TO_SUCCESS, MOVE_DOCUMENT_TO_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}/move`, {data: {box_slug}}),
    document_id
  };
};

export const copyDocument = (document_id, box_slug) => {
  return {
    types: [COPY_DOCUMENT, COPY_DOCUMENT_SUCCESS, COPY_DOCUMENT_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}/copy`, {data: {box_slug}}),
    document_id
  };
};

export const createDocumentSignature = (document_id, public_address, signature) => {
  return {
    types: [DOCUMENT_SIGNATURE, DOCUMENT_SIGNATURE_SUCCESS, DOCUMENT_SIGNATURE_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}/save-sig`, {data: {public_address, signature}}),
    document_id
  };
};

export const openDocumentForSignature = (document_id) => {
  return {
    types: [OPEN_DOCUMENT_FOR_SIGNATURE, OPEN_DOCUMENT_FOR_SIGNATURE_SUCCESS, OPEN_DOCUMENT_FOR_SIGNATURE_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}/open-for-sig`),
    document_id
  };
};

export const downloadDocument = (document_id) => {
  return {
    types: [DOWNLOAD_DOCUMENT, DOWNLOAD_DOCUMENT_SUCCESS, DOWNLOAD_DOCUMENT_FAIL],
    promise: (client) => client.get(`/documents/${document_id}/download`)
  };
};

export const openSelectedDocument = (document_id) => {
  return {
    type: OPEN_DOCUMENT,
    document_id
  };
};

export const getDocument = (document_id) => {
  return {
    types: [GET_DOCUMENT, GET_DOCUMENT_SUCCESS, GET_DOCUMENT_FAIL],
    promise: (client) => client.get(`/documents/${document_id}`)
  };
};

export const updateDocument = (document_id, data) => {
  return {
    types: [UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}`, {data})
  };
};

export const getCustodialBalance = () => {
  return {
    types: [GET_CUSTODIAL_BALANCE, GET_CUSTODIAL_BALANCE_SUCCESS, GET_CUSTODIAL_BALANCE_FAIL],
    promise: (client) => client.get(`/wallet/custodial-balance`)
  };
};

export const getTransactionRecords = () => {
  return {
    types: [GET_TRANSACTION_RECORDS, GET_TRANSACTION_RECORDS_SUCCESS, GET_TRANSACTION_RECORDS_FAIL],
    promise: (client) => client.get(`/wallet/transaction-records`)
  };
};

export const clearDocument = () => {
  return {
    type: CLEAR_DOCUMENT
  };
};
