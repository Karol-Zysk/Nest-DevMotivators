import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, Seniority } from 'src/utils/enums';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    maxLength: 40,
  })
  login: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    select: false,
  })
  hash: string;

  @Prop({
    select: false,
  })
  refreshToken: string;

  @Prop({
    enum: Role,
    default: Role.admin,
  })
  role: Role;

  @Prop({
    enum: Seniority,
    default: Seniority.trainee,
  })
  seniority: Seniority;

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
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
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

UserSchema.methods.changedPassword = async function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    let changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
    changedTimeStamp = parseInt(changedTimeStamp.toString(), 10);

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};
