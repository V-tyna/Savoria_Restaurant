import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { KEYS } from './configs/keys';
import { User } from './modules/auth/models/user';
import authRouter from './modules/auth/routes/auth';
import { Password } from './services/password';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(authRouter);

const start = async () => {
  try {
    await mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(KEYS.MONGO_URL);

    console.log('MongoBD successfully connected.');

    app.listen(4200, () => {
      console.log('Server is running at port 4200.');
    });

    // const user = new User({ email: 'test@test.com', password: '123456' });
    // await user.save();
    // const user = await User.findOne({ email: 'admin@gmail.com' });
    // console.log(user)
    // const isPasswMatch = await Password.compare(user.password, '123456')
    // console.log('PASSWORDS: ', isPasswMatch)
  } catch (error) {
    console.error('Server starting error: ', error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
