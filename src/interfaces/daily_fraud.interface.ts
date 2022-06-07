import { Document, ObjectId } from 'mongoose';

export interface IDailyFraud {
  amount_involved?: number;
  complaint_category?: ObjectId;
  day: string;
  month: string;
  year: string;
  date_reported?: Date;
  status?: string;
  count?: number;
}

export interface IDailyFraudDocument extends Document, IDailyFraud {}
