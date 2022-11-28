// CREATE TEST JS

import { createPost } from './create';

const postItem = {
  TestingTheTitle: 'Testing!',
  TestingTheBody: 'Just enjoy your day with testing!',
  TestingTheMedia:
    'https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-huracan-tecnica-101-1657303967.jpg?crop=0.700xw:0.790xh;0.0717xw,0.183xh&resize=640:*',
  TestingTheTags: ['Test', 'All', 'Day', 'Long'],
  TestingTheBadTags: ['Jest, Test, Rest'],
};

const invalidPostItem = {
  title: 'Testing!',
  body: 'Just enjoy your day with testing!',
  tags: ['Test', 'All', 'Day', 'Long'],
  media: 5,
};

function createSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(postItem),
  });
}

function createBadRequest() {
  return Promise.resolve({
    ok: false,
    status: 400,
    statusText: 'Sorry, bad Request!',
    json: () => Promise.resolve(invalidPostItem),
  });
}

describe('createPost', () => {
  it('Returns a RESPONSE OBJECT with correct values for inputs!', async () => {
    global.fetch = jest.fn(() => createSuccess());
    const response = await createPost();
    expect(response).toEqual(postItem);
  });

  it('If request was unsuccessful it throws an error with statusText', async () => {
    global.fetch = jest.fn(() => createBadRequest());
    await expect(createPost()).rejects.toThrow('Sorry, bad Request!');
  });
});
