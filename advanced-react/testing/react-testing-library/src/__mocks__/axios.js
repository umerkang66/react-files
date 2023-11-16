const mockedResponse = {
  data: {
    results: [
      {
        name: { first: 'umer', last: 'kang' },
        picture: { large: 'https://randomuser.me/api/portraits/men/39.jpg' },
        login: { username: 'ThePhonyGoat' },
      },
      {
        name: { first: 'umer', last: 'kang' },
        picture: { large: 'https://randomuser.me/api/portraits/men/39.jpg' },
        login: { username: 'ThePhonyGoat' },
      },
    ],
  },
};

const axios = {
  get: jest.fn().mockResolvedValue(mockedResponse),
};

export default axios;
