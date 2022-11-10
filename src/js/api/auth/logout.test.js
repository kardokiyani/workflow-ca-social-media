// LOG-OUT TEST JS

import { logout } from './logout';

const TestingToAccessTheToken = 'access';

const TestingTheProfile = {
  name: 'Kardo',
  email: 'kardo@noroff.no',
  avatar:
    'https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-huracan-tecnica-101-1657303967.jpg?crop=0.700xw:0.790xh;0.0717xw,0.183xh&resize=640:*',
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

describe('The user can log out', () => {
  it('Returns a valid access token in local storage and valid response object', () => {
    localStorage.setItem('profile', JSON.stringify(TestingTheProfile));
    localStorage.setItem('token', JSON.stringify(TestingToAccessTheToken));
    logout();
    expect(localStorage.getItem('profile')).toEqual(null);
    expect(localStorage.getItem('token')).toEqual(null);
  });
});
