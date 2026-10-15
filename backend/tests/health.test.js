const request = require('supertest');
const app = require('../server');

describe('Smoke & Health Check APIs', () => {
  it('GET /api/products should return HTTP 200 and a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/categories should return HTTP 200', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
