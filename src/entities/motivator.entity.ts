import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import slugify from 'slugify';
import { convertMilliseconds } from '../utils/millisecondsToTime';

export enum Place {
  main = 'Main',
  waiting = 'Waiting',
  purgatory = 'Purgatory',
}

// export type MotivatorDocument = Motivator & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Motivator {
  @Prop({ required: true, maxLength: 40 })
  title: string;

  @Prop({ required: true, maxLength: 999 })
  subTitle: string;

  @Prop()
  slug: string;

  @Prop({ required: true })
  photo: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  thumbUp: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  thumbDown: Types.ObjectId[];

  @Prop()
  accepted: Date;

  @Prop()
  movedToMain: Date;

  @Prop({
    enum: [Place.main, Place.purgatory, Place.waiting],
    default: Place.waiting,
  })
  place: Place;

  @Prop([{ type: String }])
  keyWords: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  safeIn(): string {
    if (this.accepted && this.movedToMain) {
      const safeIn = Number(this.movedToMain) - Number(this.accepted);
      return convertMilliseconds(safeIn);
    }
    return '';
  }
}

const MotivatorSchema = SchemaFactory.createForClass(Motivator);

MotivatorSchema.pre('save', function () {
  this.slug = slugify(this.title, { lower: true });
});

export { MotivatorSchema };
