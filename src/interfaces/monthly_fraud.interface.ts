import { Document, ObjectId } from 'mongoose';

export interface IMonthlyFraud {
  amount_involved?: number;
  complaint_category?: ObjectId;
  month: string;
  year: string;
  date_reported?: Date;
  status?: string;
  count?: number;
}

export interface IMonthlyFraudDocument extends Document, IMonthlyFraud {}
