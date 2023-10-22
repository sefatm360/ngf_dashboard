// the ultimate url
import { url } from './constants';
const base = `${url}`;
const fetcher = {};

// make a get request
fetcher.get = async ({ url }) => {
  const obj = {
    mode: 'cors',
    credentials: 'include',
  };
  try {
    const response = await fetch(`${base}${url}`, obj);
    const status = response.status;

    const data = await response.json();
    return { data, status };
  } catch (err) {
    window.alert(err.message);
  }
};

// make a post request
fetcher.post = async ({ url, cType, body }) => {
  const obj = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  };

  if (cType === 'application/json') {
    obj.headers = { 'content-type': cType };
    obj.body = JSON.stringify(body);
  } else {
    obj.body = body;
  }

  const response = await fetch(`${base}${url}`, obj);
  const status = response.status;

  const data = await response.json();
  return { data, status };
};

// make a put request
fetcher.put = async ({ url, cType, body }) => {
  const obj = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
  };

  if (cType === 'application/json') {
    obj.headers = { 'content-type': cType };
    obj.body = JSON.stringify(body);
  } else {
    obj.body = body;
  }

  const response = await fetch(`${base}${url}`, obj);

  const status = response.status;

  const data = await response.json();
  return { data, status };
};

// make a delete request
fetcher.delete = async ({ url }) => {
  const response = await fetch(`${base}${url}`, { method: 'DELETE' });
  const data = await response.json();

  return { data };
};

export default fetcher;
