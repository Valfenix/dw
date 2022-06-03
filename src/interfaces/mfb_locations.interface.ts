import { ObjectId, Document } from 'mongoose';

export interface IMfbLocations {
  longitude?: number;
  latitude?: number;
  category?: string;
  category_code?: string;
  state?: ObjectId;
  lga?: ObjectId;
  alias?: string;
  address?: string;
  bank_name?: string;
  outlet_type?: string;
  record_keeping?: string;
  account_opening?: string;
  business_loan?: string;
  personal_loan?: string;
  savings?: string;
  transfers?: string;
  payment?: string;
  other_financial_services: string;
  key?: string;
}

export interface IMfbLocationsDocument extends Document, IMfbLocations {}
