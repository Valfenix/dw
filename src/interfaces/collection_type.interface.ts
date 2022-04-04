import { Document } from 'mongoose';

export interface ICollectionType {
  description?: string;
  category?: string;
  success?: boolean;
}

export interface ICollectionTypeDocument extends Document, ICollectionType {}
