const request = require('supertest');
const app = require('../server');
const db = require('../database');

const api = () => request(app);
const auth = (token) => ({ Authorization: `Bearer ${token}` });

beforeAll(async () => {
  // database.js seeds SQLite asynchronously when the app is imported.
  for (let attempt = 0; attempt < 50; attempt++) {
    const ready = await new Promise((resolve) => {
      db.get("SELECT id FROM users WHERE email = 'test@eshop.com'", (error, row) => {
        resolve(!error && Boolean(row));
      });
    });
    if (ready) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Seed data was not ready in five seconds');
});

describe('Product and category flows', () => {
  it('searches products and reads one product', async () => {
    const search = await api().get('/api/products?search=MacBook');
    expect(search.status).toBe(200);
    expect(search.body.map((item) => item.name)).toContain('MacBook Pro M3');

    const detail = await api().get(`/api/products/${search.body[0].id}`);
    expect(detail.status).toBe(200);
    expect(detail.body.name).toBe('MacBook Pro M3');
  });

  it('creates, updates and deletes a product', async () => {
    const product = { name: 'Demo keyboard', price: 100_000, description: 'Demo', imageUrl: '', category_id: 3 };
    const created = await api().post('/api/products').send(product);
    expect(created.status).toBe(200);
    expect(created.body.id).toEqual(expect.any(Number));

    const updated = await api().put(`/api/products/${created.body.id}`)
      .send({ ...product, price: 120_000 });
    expect(updated.status).toBe(200);
    const detail = await api().get(`/api/products/${created.body.id}`);
    expect(Number(detail.body.price)).toBe(120_000);

    const deleted = await api().delete(`/api/products/${created.body.id}`);
    expect(deleted.status).toBe(200);
    const missing = await api().get(`/api/products/${created.body.id}`);
    expect(missing.body).toEqual({});
  });

  it('requires a token for categories and supports category CRUD', async () => {
    expect((await api().post('/api/categories').send({ name: 'Demo' })).status).toBe(401);
    const login = await api().post('/api/login')
      .send({ email: 'admin@eshop.com', password: 'Admin123!' });
    const headers = auth(login.body.token);

    const created = await api().post('/api/categories').set(headers).send({ name: 'Demo' });
    expect(created.status).toBe(200);
    const changed = await api().put(`/api/categories/${created.body.id}`)
      .set(headers).send({ name: 'Updated demo' });
    expect(changed.status).toBe(200);
    const categories = await api().get('/api/categories');
    expect(categories.body.some((row) => row.name === 'Updated demo')).toBe(true);
    expect((await api().delete(`/api/categories/${created.body.id}`).set(headers)).status).toBe(200);
  });
});

describe('Customer order flow', () => {
  let token;

  beforeAll(async () => {
    const login = await api().post('/api/login')
      .send({ email: 'test@eshop.com', password: 'Test1234!' });
    expect(login.status).toBe(200);
    token = login.body.token;
  });

  it('adds an item, checks out, lists and cancels the order', async () => {
    const headers = auth(token);
    expect((await api().get('/api/cart').set(headers)).body).toEqual([]);
    expect((await api().post('/api/cart').set(headers).send({ product_id: 1, quantity: 1 })).status).toBe(200);
    expect((await api().get('/api/cart').set(headers)).body).toEqual([{ product_id: 1, quantity: 1 }]);

    const checkout = await api().post('/api/checkout').set(headers)
      .send({ total_amount: 300_000, shipping_address: 'Demo street' });
    expect(checkout.status).toBe(200);
    const orderId = checkout.body.orderId;
    const list = await api().get('/api/orders/my-orders').set(headers);
    expect(list.body.some((order) => order.id === orderId)).toBe(true);
    expect((await api().get(`/api/orders/${orderId}`)).body.status).toBe('pending');

    expect((await api().put(`/api/orders/${orderId}/cancel`).set(headers)).status).toBe(200);
    expect((await api().get(`/api/orders/${orderId}`)).body.status).toBe('canceled');
    expect((await api().put(`/api/orders/${orderId}/cancel`).set(headers)).status).toBe(400);
  });

  it('rejects access without a valid token', async () => {
    expect((await api().get('/api/orders/my-orders')).status).toBe(401);
    expect((await api().get('/api/orders/my-orders').set(auth('invalid'))).status).toBe(403);
  });
});

describe('Admin flows', () => {
  let headers;

  beforeAll(async () => {
    const login = await api().post('/api/login')
      .send({ email: 'admin@eshop.com', password: 'Admin123!' });
    headers = auth(login.body.token);
  });

  it('imports valid rows and reports missing names', async () => {
    const imported = await api().post('/api/admin/import-products').set(headers)
      .send({ products: [{ name: 'Imported demo', price: 2000 }, { price: 1000 }] });
    expect(imported.status).toBe(200);
    expect(imported.body.inserted).toBe(1);
    expect(imported.body.errors).toHaveLength(1);
    expect((await api().post('/api/admin/import-products').set(headers).send({ products: [] })).status).toBe(400);
  });

  it('lists users and orders', async () => {
    const users = await api().get('/api/admin/users').set(headers);
    expect(users.status).toBe(200);
    expect(users.body.some((user) => user.email === 'admin@eshop.com')).toBe(true);
    const orders = await api().get('/api/admin/orders').set(headers);
    expect(orders.status).toBe(200);
    expect(Array.isArray(orders.body)).toBe(true);
  });

  it('creates and removes a coupon', async () => {
    const created = await api().post('/api/admin/coupons').set(headers).send({
      code: 'DEMO_FIXED', type: 'fixed', discount_value: 10_000,
      min_order_amount: 100_000, expired_at: '2099-12-31', max_uses_per_user: 1,
    });
    expect(created.status).toBe(200);
    const coupons = await api().get('/api/coupons').set(headers);
    expect(coupons.body.some((coupon) => coupon.code === 'DEMO_FIXED')).toBe(true);
    expect((await api().delete(`/api/admin/coupons/${created.body.id}`).set(headers)).status).toBe(200);
  });
});
