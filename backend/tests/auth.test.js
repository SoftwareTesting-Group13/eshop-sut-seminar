const request = require('supertest');
const app = require('../server');

describe('Auth API Concurrency Test', () => {
  it('POST /api/register should create a new user', async () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/register')
      .send({ name: 'Tester', email: uniqueEmail, password: 'password123' });
    expect(res.status).toBe(200);
  });

  it('POST /api/login should login with registered user', async () => {
    const uniqueEmail = `login_${Date.now()}@example.com`;
    await request(app)
      .post('/api/register')
      .send({ name: 'LoginTester', email: uniqueEmail, password: 'password123' });

    const res = await request(app)
      .post('/api/login')
      .send({ email: uniqueEmail, password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
