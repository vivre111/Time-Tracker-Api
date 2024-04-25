const axios = require('axios');

describe('GET /api/user/getAll', () => {
  test('It should require authorization', async () => {
    try {
      await axios.get('http://localhost:8000/api/user/getAll');
      fail('Request should have been denied access');
    } catch (error) {
      // Expect an error response with a 401 Unauthorized status code
      expect(error.response.status).toBe(401);
    }
  });
});
