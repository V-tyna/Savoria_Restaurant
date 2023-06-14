import mongoose from 'mongoose';
import request from 'supertest';

import { TEST_KEYS } from '@rootSrc/configs/dev.keys';
import app from '@rootSrc/index';

describe('Auth router', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(TEST_KEYS.MONGO_TEST_URL);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    mongoose.connection.close();
  });

  describe('Login controller should', () => {
    test('successfully login with VALID data', async (): Promise<void> => {
      const res = await request(app).post('/admin/login').send({ email: 'test@test.com', password: '123456' });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toEqual('Login ok');
      expect(res.body.accessToken).not.toBeNull();
      expect(res.body.refreshToken).not.toBeNull();
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
});
