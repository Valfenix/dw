import { ObjectId, Document } from 'mongoose';

export interface IDfi {
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
  agricultural_finance?: string;
  export_import_finance?: string;
  infrastructure_finance?: string;
  mortgage_finance?: string;
  other_financial_services: string;
  key?: string;
}

export interface IDfiDocument extends Document, IDfi {}
