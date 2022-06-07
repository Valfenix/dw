import { Document, ObjectId } from 'mongoose';

export interface IDailyComplaints {
  amount_in_dispute?: number;
  complaint_category?: ObjectId;
  day: string;
  month: string;
  year: string;
  date_received?: Date;
  status?: string;
  count?: number;
}

export interface IDailyCompalintsDocument extends Document, IDailyComplaints {}
