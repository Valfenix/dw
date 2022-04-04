import { Document } from 'mongoose';

export interface IBank {
  name?: string;
  bank_code?: number;
  bank_category?: string;
}

export interface IBankDocument extends Document, IBank {}
