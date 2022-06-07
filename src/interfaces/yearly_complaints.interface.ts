import { Document, ObjectId } from 'mongoose';

export interface IYearlyComplaints {
  amount_in_dispute?: number;
  complaint_category?: ObjectId;
  year: string;
  date_received?: Date;
  status?: string;
  count?: number;
}

export interface IYearlyCompalintsDocument extends Document, IYearlyComplaints {}
