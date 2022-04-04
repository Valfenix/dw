import { Document, ObjectId } from 'mongoose';

export interface IYearlySummary {
  collectionType?: ObjectId;
  source_bank?: number;
  destination_bank?: number;
  day?: string;
  month?: string;
  year?: string;
  transactionDate?: Date;
  value?: number;
  volume?: number;
}

export interface IYearlySummaryDocument extends Document, IYearlySummary {}
