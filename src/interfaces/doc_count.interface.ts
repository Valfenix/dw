import { Document } from 'mongoose';

export enum ICountCategory {
  BANK = 'bank',
  COLLECTION_TYPE = 'collection_type',
  DAILY_SUMMARY = 'daily_summary',
  MONTHLY_SUMMARY = 'monthly_summary',
  YEARLY_SUMMARY = 'yearly_summary',
  TRANSACTIONS = 'transactions',
}

export interface IDocCount {
  count?: number;
  category?: string;
}

export interface IDocCountDocument extends Document, IDocCount {}
