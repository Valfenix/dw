import { Document, ObjectId } from 'mongoose';

export interface IMonthlySummary {
  collectionType?: ObjectId;
  source_bank?: number;
  destination_bank?: number;
  month?: string;
  year?: string;
  transactionDate?: Date;
  value?: number;
  volume?: number;
}

export interface IMonthlySummaryDocument extends Document, IMonthlySummary {}
