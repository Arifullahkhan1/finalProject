import { API_URL } from '../global/baseUrl';
export const GetCars  =   (url,token, data) => {
    
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': token,
  };

  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  return fetch(`${API_URL}${url}`, config);
};