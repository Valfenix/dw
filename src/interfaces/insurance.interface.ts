import { ObjectId, Document } from 'mongoose';

export interface IInsurance {
  longitude?: number;
  latitude?: number;
  category?: string;
  state?: ObjectId;
  lga?: ObjectId;
  alias?: string;
  regulating_body?: string;
  address?: string;
  name?: string;
  outlet_type?: string;
  record_keeping?: string;
  property?: string;
  life?: string;
  health?: string;
  micro_insurance?: string;
  re_insurance?: string;
  other_financial_services: string;
  key?: string;
}

export interface IInsuranceDocument extends Document, IInsurance {}
