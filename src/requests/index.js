import queryString from 'query-string';
import { REST_API_BASE_URL } from '../constants/urls';
import { API_KEY } from '../constants/keys';
import { withToken } from '../helpers/authorization';
import { isObject, isString } from '../helpers/types';

const getDefaultRequestOptions = (token = null) => ({
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Application-Key': API_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

const processRawResponse = (response) => Promise.resolve(response.json());

const processResponse = ({
  success,
  errors = [],
  data = {},
}) => (success ? Promise.resolve(data) : Promise.reject(errors));

const processErrors = (errors) => {
  const isStr = isString(errors);
  const isObj = isObject(errors);
  const type = isStr && /\./.test(errors) ? errors.split('.')[0] : 'common';

  return Promise.reject({
    type,
    message: isStr ? errors : JSON.stringify(errors),
    invalid: isObj ? Object.keys(errors) : [],
  });
};

const getRequest = ({ url, params = null, token = '' }) => {
  const query = params ? `?${queryString.stringify(params)}` : '';
  return fetch(
    `${REST_API_BASE_URL}/${url}${query}`,
    getDefaultRequestOptions(token)
  )
    .then(processRawResponse)
    .then(processResponse)
    .catch(processErrors);
};
export const postSelfRequest = ({ url, body = null }) =>
  fetch(`/${url}`, {
    ...getDefaultRequestOptions(),
    method: 'POST',
    body: body ? JSON.stringify(body) : '{}',
  })
    .then(processRawResponse)
    .then(processResponse)
    .catch(processErrors);

const postRequest = ({ url, body = null, token = '' }) =>
  fetch(`${REST_API_BASE_URL}/${url}`, {
    ...getDefaultRequestOptions(token),
    method: 'POST',
    body: body ? JSON.stringify(body) : '{}',
  })
    .then(processRawResponse)
    .then(processResponse)
    .catch(processErrors);

const putRequest = ({ url, body = null, token = '' }) =>
  fetch(`${REST_API_BASE_URL}/${url}`, {
    ...getDefaultRequestOptions(token),
    method: 'PUT',
    body: body ? JSON.stringify(body) : '{}',
  })
    .then(processRawResponse)
    .then(processResponse)
    .catch(processErrors);

export const deleteRequest = ({ url, token = '' }) =>
  fetch(`${REST_API_BASE_URL}/${url}`, {
    ...getDefaultRequestOptions(token),
    method: 'DELETE',
  })
    .then(processRawResponse)
    .then(processResponse)
    .catch(processErrors);

export const get = getRequest;
export const post = postRequest;
export const put = putRequest;

export const getWithToken = withToken(getRequest);
export const postWithToken = withToken(postRequest);
export const putWithToken = withToken(putRequest);
export const deleteWithToken = withToken(deleteRequest);
