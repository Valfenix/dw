import { Document } from 'mongoose';

export interface ISec {
  longitude?: number;
  latitude?: number;
  category?: string;
  category_code?: string;
  state?: string;
  lga?: string;
  alias?: string;
  address?: string;
  regulating_body?: string;
  name?: string;
  outlet_type?: string;
  record_keeping?: string;
  stock_brokering?: string;
  investment_banking?: string;
  investment_advising?: string;
  collective_investment_schemes?: string;
  rating_agencies?: string;
  custodians?: string;
  fund_managing?: string;
  other_financial_services?: string;
  key?: string;
}

export interface ISecDocument extends Document, ISec {}
