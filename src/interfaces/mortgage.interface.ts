import { ObjectId, Document } from 'mongoose';

export interface IMortgageLocations {
  longitude?: number;
  latitude?: number;
  category?: string;
  state?: ObjectId;
  lga?: ObjectId;
  alias?: string;
  address?: string;
  name?: string;
  outlet_type?: string;
  record_keeping?: string;
  sme_finance?: string;
  savings?: string;
  deposits?: string;
  transfers?: string;
  consumer_credit?: string;
  infrastructure_finance?: string;
  mortgage_finance?: string;
  other_financial_services: string;
  key?: string;
}

export interface IMortgageLocationsDocument extends Document, IMortgageLocations {}
