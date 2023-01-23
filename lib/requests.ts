import { Endpoint, Input, Body } from '../models/requests.model';

export const post = async (endpoint: Endpoint, body: Body) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const isValidHttpUrl = (input: Input) => {
  let url;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
