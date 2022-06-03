import { ObjectId, Document } from 'mongoose';

export interface ICmbLocations {
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
  account_opening?: string;
  business_loan?: string;
  personal_loan?: string;
  no_of_atm?: number;
  savings?: string;
  transfers?: string;
  payment?: string;
  other_financial_services: string;
  key?: string;
}

export interface ICmbLocationsDocument extends Document, ICmbLocations {}
