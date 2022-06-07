import { Document } from 'mongoose';

export interface IComplaintCategory {
  description: string;
  category: string;
  // status: boolean;
}

export interface IComplaintCategoryDocument extends Document, IComplaintCategory {}
