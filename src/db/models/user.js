import { model, Schema } from 'mongoose';
import { normalizeDateOrThrow } from '../../utils/normalizeDate.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email is invalid'],
    },
    gender: {
      type: String,
      enum: ['boy', 'girl', 'null'],
      default: 'null',
    },
    dueDate: {
      type: Date,
      set: (v) =>
        v === null || v === '' || v === undefined ? v : normalizeDateOrThrow(v),
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default:
        'https://res.cloudinary.com/dmzxlx1if/image/upload/v1758557714/avatar-image_mccj83.png',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('users', userSchema);
