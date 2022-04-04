import { Document, ObjectId } from 'mongoose';

export interface IYearlySummary {
  collectionType?: ObjectId;
  source_bank?: number;
  destination_bank?: number;
  year?: string;
  transactionDate?: Date;
  value?: number;
  volume?: number;
}

export interface IYearlySummaryDocument extends Document, IYearlySummary {}
