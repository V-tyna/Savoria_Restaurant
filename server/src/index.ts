import cors from 'cors';
import express, { Application } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { KEYS } from './configs/keys';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import authRouter from './modules/auth/routes/auth';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/admin', authRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
