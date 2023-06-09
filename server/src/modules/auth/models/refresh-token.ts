import { model, Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expiresIn: Date,
});

const RefreshToken = model('RefreshToken', refreshTokenSchema);

export { RefreshToken };
