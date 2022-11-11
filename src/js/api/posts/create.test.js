// CREATE TEST JS

import { createPost } from './create';

const TestingTheTitle = 'Testing!';
const TestingTheBody = 'Just enjoy your day with testing!';
const TestingTheMedia =
  'https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-huracan-tecnica-101-1657303967.jpg?crop=0.700xw:0.790xh;0.0717xw,0.183xh&resize=640:*';
const TestingTheTags = ['Test', 'All', 'Day', 'Long'];
const TestingTheBadTags = 'Jest, Test, Rest';
const TestingSuccess = `{"title":"Testing","body":"Just enjoy your day with testing","tags":["Test", "All", "Day", "Long"],"media":"https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-huracan-tecnica-101-1657303967.jpg?crop=0.700xw:0.790xh;0.0717xw,0.183xh&resize=640:*"`;

function createSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(JSON.parse(TestingSuccess)),
  });
}

function createBadRequest() {
  return Promise.resolve({
    ok: false,
    status: 400,
    statusText: 'Sorry, bad Request!',
  });
}

function createUnauthorized() {
  return Promise.resolve({
    ok: false,
    status: 401,
    statusText: 'Sorry, unauthorized!',
  });
}

describe('createPost', () => {
  it('Returns a RESPONSE OBJECT with correct values for inputs!', async () => {
    global.fetch = jest.fn(() => createSuccess());
    const response = await createPost(
      TestingTheTitle,
      TestingTheBody,
      TestingTheTags
    );
    expect(response).toEqual(JSON.parse(TestingSuccess));
    expect(response.title).toEqual(TestingTheTitle);
    expect(response.body).toEqual(TestingTheBody);
    expect(response.media).toEqual(TestingTheMedia);
    expect(response.tags).toEqual(TestingTheTags);
  });

  it('If a BAD REQUEST was made, it will throw an error message!', async () => {
    global.fetch = jest.fn(() => createBadRequest());
    await expect(
      createPost(
        TestingTheTitle,
        TestingTheBody,
        TestingTheMedia,
        TestingTheBadTags
      )
    ).rejects.toThrow('Sorry, bad Request!');
  });

  it('If a request was UNAUTHORIZED, it will throw an error message!', async () => {
    global.fetch = jest.fn(() => createUnauthorized());
    await expect(
      createPost(
        TestingTheTitle,
        TestingTheBody,
        TestingTheMedia,
        TestingTheBadTags
      )
    ).rejects.toThrow('Sorry, unauthorized!');
  });
});
