import { Document, ObjectId } from 'mongoose';

export interface ILga {
  name?: string;
  stage: ObjectId;
  longitude?: number;
  latitude?: number;
}

export interface ILgaDocument extends Document, ILga {}
