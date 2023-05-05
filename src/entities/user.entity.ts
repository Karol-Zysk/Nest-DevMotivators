import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

export enum Role {
  admin = 'Admin',
  moderator = 'Moderator',
  user = 'User',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    maxLength: 40,
  })
  login: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Please provide a valid email',
    },
  })
  email: string;

  @Prop({
    required: true,
    minlength: 8,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
  })
  passwordConfirm: string;

  @Prop({
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @Prop({
    select: false,
    default: true,
  })
  active: boolean;

  @Prop({
    maxLength: 999,
  })
  description: string;

  @Prop({
    default: 'default.jpg',
  })
  userPhoto: string;

  @Prop({
    default: () => Date.now(),
  })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
  this.passwordConfirm = undefined;
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPassword = async function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    let changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
    changedTimeStamp = parseInt(changedTimeStamp.toString(), 10);

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};
