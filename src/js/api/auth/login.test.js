// LOGIN TEST JS

import { login } from './login';

const TestingTheMail = 'kardo@noroff.no';

const TestingThePassword = 'kardokiyani1998';

const TestingSuccess = {
  name: 'Kardo',
  email: 'kardo@noroff.no',
  accessToken: 'token',
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(TestingSuccess),
  });
}

function fetchInvalidLogin() {
  return Promise.resolve({
    ok: false,
    status: 401,
    statusText: 'Unauthorized',
  });
}

describe('login', () => {
  it('Returns a valid access token in local storage and valid response object', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const expectedToken = TestingSuccess.accessToken;
    const response = await login(TestingTheMail, TestingThePassword);
    const storedToken = JSON.parse(localStorage.getItem('token'));
    expect(storedToken).toEqual(expectedToken);
    expect(response).toEqual(TestingSuccess);
  });

  it('Throws error message on invalid details', async () => {
    global.fetch = jest.fn(() => fetchInvalidLogin());
    await expect(login(TestingTheMail, TestingThePassword)).rejects.toThrow(
      'Unauthorized'
    );
  });
});
