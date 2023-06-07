import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { KEYS } from './configs/keys';
import { User } from './models/user';
import loginRouter from './routes/login';
import { Password } from './services/password';

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);

const start = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(KEYS.MONGO_URL);

    console.log('MongoBD successfully connected.');

    app.listen(4200, () => {
      console.log('Server is running at port 4200.');
    });

    // const user = await User.findOne({ email: 'admin@gmail.com' });
    // console.log(user)
    // const isPasswMatch = await Password.compare(user.password, '123456')
    // console.log('PASSWORDS: ', isPasswMatch)
  } catch (error) {
    console.error('Server starting error: ', error);
  }
};

start();
