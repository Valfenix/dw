import { Document, ObjectId } from 'mongoose';

export interface IDailySummary {
  collectionType?: ObjectId;
  source_bank?: number;
  destination_bank?: number;
  day?: string;
  month?: string;
  year?: string;
  transactionDate?: Date;
  value?: number;
  volume?: number;
  key?: string;
}

export interface IDailySummaryDocument extends Document, IDailySummary {}
