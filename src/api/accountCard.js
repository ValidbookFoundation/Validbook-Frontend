import axios from 'axios';
import { apiURL } from '../constants/apiURL';

export const messageForSupportHumanClaim = (public_address) => {
  const token = _getToken();
  return axios({
    method: 'get',
    url: `${apiURL}/card/${public_address}/support-human-claim-message`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const sendMessageForHumanClaim = (public_address) => {
  const token = _getToken();
  return axios({
    method: 'get',
    url: `${apiURL}/card/${public_address}/human-claim-message`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const _getToken = () => window.localStorage.getItem('_u');