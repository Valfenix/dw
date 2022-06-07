import { Document, ObjectId } from 'mongoose';

export interface IFraud {
  amount_involved?: string;
  comment?: number;
  complaint_category?: ObjectId;
  date_created?: Date;
  date_reported?: Date;
  desc_of_transaction?: string;
  financial_institution?: ObjectId;
  agent_code?: string;
  status?: string;
}

export interface IFraudDocument extends Document, IFraud {}
