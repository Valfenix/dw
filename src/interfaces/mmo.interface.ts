import { Document } from 'mongoose';

export interface IMmo {
  longitude?: number;
  latitude?: number;
  category?: string;
  category_code?: string;
  state?: string;
  lga?: string;
  alias?: string;
  address?: string;
  name?: string;
  outlet_type?: string;
  record_keeping?: string;
  establishment_name?: string;
  standalone_business?: string;
  other_business?: string;
  mmo_name?: string;
  average_weekly_deposit?: string;
  average_weekly_withdrawal?: string;
  other_financial_services?: string;
  key?: string;
}

export interface IMmoDocument extends Document, IMmo {}
