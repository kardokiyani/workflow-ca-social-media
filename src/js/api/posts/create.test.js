// CREATE TEST JS

import { createPost } from './create';

const TestingTheTitle = 'Testing';
const TestingTheBody = 'Just enjoy your day with testing';
const TestingTheMedia =
  'https://img.theculturetrip.com/472x265/smart/wp-content/uploads/2020/11/santorini.jpg';
const TestingTheTags = ['Test', 'All', 'Day', 'Long'];
const TestingTheBadTags = 'Jest, Test, Rest';
const TestingSuccess = `{"title":"Testing","body":"Just enjoy your day with testing","tags":["Test", "All", "Day", "Long"],"media":"https://img.theculturetrip.com/472x265/smart/wp-content/uploads/2020/11/santorini.jpg","created":"2022-11-02T00:17:18.803Z","updated":"2022-11-02T00:17:18.803Z","id":121,"_count":{"comments":0,"reactions":0}}`;

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
  it('Returns a response object with corresponding values for inputs', async () => {
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

  it('If a bad request was made, it will throw an error message', async () => {
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

  it('If a request was unauthorized, it will throw an error message', async () => {
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
