import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('Auth router', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    const testDB = 'mongodb+srv://boikovtyna:mSSiWSq4JEJOsJ6j@cluster0.3yolbxw.mongodb.net/test?retryWrites=true&w=majority';
    await mongoose.connect(testDB);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    mongoose.connection.close();
  });

  test('Successfully login', async (): Promise<void> => {
    const res = await request(app).post('/admin/login').send({ email: 'test@test.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Login ok', accessToken: 'fjd', refreshToken: 'hvch' });
  });
});