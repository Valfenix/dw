import { Document } from 'mongoose';

export interface ICollectionType {
  old_id: number;
  description?: string;
  category?: string;
  success?: boolean;
}

export interface ICollectionTypeDocument extends Document, ICollectionType {}
