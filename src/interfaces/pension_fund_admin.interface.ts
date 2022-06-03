import { ObjectId, Document } from 'mongoose';

export interface IPFA {
  longitude?: number;
  latitude?: number;
  category?: string;
  state?: ObjectId;
  lga?: ObjectId;
  alias?: string;
  regulating_body?: string;
  address?: string;
  name?: string;
  no_of_atm?: number;
  outlet_type?: string;
  record_keeping?: string;
  personal_pension?: string;
  group_pension?: string;
  account_opening?: string;
  investment_products?: string;
  other_financial_services?: string;
  key?: string;
}

export interface IPFADocument extends Document, IPFA {}
