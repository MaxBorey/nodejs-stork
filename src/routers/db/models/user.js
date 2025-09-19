import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email is invalid']
    },
    gender: {
      type: String,
      enum: ['boy', 'girl', 'null'],
      default: 'null'
    },
    dueDate: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
        },
    photoURL: {
      type: String
    },
  },
    {
      timestamps: true,
      versionKey: false
    }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('users', userSchema);
