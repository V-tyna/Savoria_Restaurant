import mongoose from 'mongoose';
import request from 'supertest';

import { TEST_KEYS } from '@rootSrc/configs/dev.keys';
import app from '@rootSrc/index';
import { RefreshToken } from '@rootSrc/modules/auth/models/refresh-token';

describe('Auth router', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(TEST_KEYS.MONGO_TEST_URL);
  });

  afterAll(async () => {
    await RefreshToken.deleteMany({ userId: TEST_KEYS.USER_ID });
    await mongoose.disconnect();
    mongoose.connection.close();
  });

  describe('Login controller should', () => {
    test('successfully login with VALID data', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'test@test.com', password: '123456' });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toEqual('Successful login.');
      expect(res.body.accessToken).not.toBeNull();
      expect(res.body.refreshToken).not.toBeNull();
      expect(res.body.userId).not.toBeNull();
      expect(res.body.email).not.toBeNull();
    });

    test('return 400 status and correct error message if email is INVALID', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'INVALID', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toEqual('Email must be valid.');
    });

    test('return 400 status and correct error message if password is INVALID', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'VALID@test.com', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toEqual('Password must be between 6 and 20 characters.');
    });

    test('return 400 status and correct error messages if email and password are INVALID', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'INVALID', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toEqual('Email must be valid.');
      expect(res.body.errors[1].message).toEqual('Password must be between 6 and 20 characters.');
    });
    test('return 400 status and correct error message if email does NOT exists', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'DOES_NOT_EXIST_EMAIL@test.com', password: '123456' });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toEqual('User with such email does not exist.');
    });

    test('return 400 status and correct error message if password is WRONG', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'test@test.com', password: 'WRONG_PASSWORD' });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toEqual('Wrong password.');
    });
  });

  describe('Logout controller should', () => {
    test('successfully logout with VALID userId', async (): Promise<void> => {
      const loginRes = await request(app).post('/admin/login').send({ email: 'test@test.com', password: '123456' });
      const res = await request(app).post('/admin/logout')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .send({ userId: loginRes.body.userId });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toEqual('Successful logout.');
    });

    test('throw an error if token is NOT set as Authorization header', async (): Promise<void> => {
      const res = await request(app).post('/admin/logout').send({ userId: 'ANY_USER_ID' });

      expect(res.statusCode).toBe(403);
      expect(res.body.errors[0].message).toBe('Unauthorized.');
    });

    test('throw an error if token is INVALID', async (): Promise<void> => {
      const res = await request(app).post('/admin/logout')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({ userId: 'ANY_USER_ID' });

      expect(res.statusCode).toBe(403);
      expect(res.body.errors[0].message).toBe('Forbidden. Access denied. Token is not valid.');
    });

    test('throw an error if token EXPIRED', async (): Promise<void> => {
      const res = await request(app).post('/admin/logout')
        .set('Authorization', `Bearer ${TEST_KEYS.EXPIRED_TOKEN}`)
        .send({ userId: 'ANY_USER_ID' });

      expect(res.statusCode).toBe(403);
      expect(res.body.errors[0].message).toBe('Forbidden. Access denied. Token expired.');
    });

    test('throw an error if userId is INVALID', async (): Promise<void> => {
      const loginRes = await request(app).post('/admin/login').send({ email: 'test@test.com', password: '123456' });
      const res = await request(app).post('/admin/logout')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .send({ userId: 'INVALID_USER_ID' });

      expect(res.statusCode).toBe(403);
    });
  });

  describe('Refresh controller should', () => {
    test('successfully refresh token pair', async (): Promise<void> => {
      const loginRes = await request(app).post('/admin/login').send({ email: 'test@test.com', password: '123456' });
      const { accessToken, refreshToken, userId, email } = loginRes.body;
      const res = await request(app).post('/admin/refresh')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken, userId, email });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toEqual('Successful refresh tokens pair.');
      expect(res.body.accessToken).not.toBeNull();
      expect(res.body.refreshToken).not.toBeNull();
      expect(res.body.userId).not.toBeNull();
      expect(res.body.email).not.toBeNull();
    });

  });
});
