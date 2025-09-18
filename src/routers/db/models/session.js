import { model, Schema, Types } from 'mongoose';

const sessionSchema = new Schema(
  {
     userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
      unique: true
    },
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    accessTokenValidUntil: {
      type: Date,
      required: true
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const Session = model('session', sessionSchema);
