//import { fetch } from 'react-native';
import { API_URL } from '../global/baseUrl';
export const ApiInterceptor = (url,token, data) => {
    
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Firebase-Auth': token,
  };

  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  return fetch(`${API_URL}${url}`, config);
};
