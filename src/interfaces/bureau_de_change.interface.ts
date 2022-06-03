import { ObjectId, Document } from 'mongoose';

export interface IBdc {
  longitude?: number;
  latitude?: number;
  category?: string;
  category_code?: string;
  state?: ObjectId;
  lga?: ObjectId;
  alias?: string;
  address?: string;
  name?: string;
  outlet_type?: string;
  record_keeping?: string;
  money_transfer?: string;
  currency_exchange?: string;
  average_transactions_per_week: string;
  key?: string;
}

export interface IBdcDocument extends Document, IBdc {}
