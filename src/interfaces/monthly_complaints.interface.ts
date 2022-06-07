import { Document, ObjectId } from 'mongoose';

export interface IMonthlyComplaints {
  amount_in_dispute?: number;
  complaint_category?: ObjectId;
  month: string;
  year: string;
  date_received?: Date;
  status?: string;
  count?: number;
}

export interface IMonthlyCompalintsDocument extends Document, IMonthlyComplaints {}
