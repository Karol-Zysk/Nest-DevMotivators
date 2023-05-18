/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Types } from 'mongoose';
import { Place } from 'src/utils';
export type MotivatorDocument = Motivator & Document;
export declare class Motivator {
    title: string;
    subTitle: string;
    slug: string;
    image: string;
    like: Types.ObjectId[];
    dislike: Types.ObjectId[];
    accepted: Date;
    movedToMain: Date;
    place: Place;
    keyWords: string[];
    author: Types.ObjectId;
    safeIn(): string;
}
export declare const MotivatorSchema: import("mongoose").Schema<Motivator, import("mongoose").Model<Motivator, any, any, any, Document<unknown, any, Motivator> & Omit<Motivator & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Motivator, Document<unknown, {}, import("mongoose").FlatRecord<Motivator>> & Omit<import("mongoose").FlatRecord<Motivator> & {
    _id: Types.ObjectId;
}, never>>;
