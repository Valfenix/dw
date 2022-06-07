import { Document, ObjectId } from 'mongoose';

export interface IYearlyFraud {
  amount_involved?: number;
  complaint_category?: ObjectId;
  year: string;
  date_reported?: Date;
  status?: string;
  count?: number;
}

export interface IYearlyFraudDocument extends Document, IYearlyFraud {}
