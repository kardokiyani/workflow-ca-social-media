// REGISTER JS

import { apiPath } from '../constants.js';
import { headers } from '../headers.js';

export async function register(name, email, password) {
  const response = await fetch(`${apiPath}/social/auth/register`, {
    method: 'post',
    body: JSON.stringify({ name, email, password }),
    headers: headers('application/json'),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
