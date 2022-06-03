import { Document } from 'mongoose';

export interface IBankAgents {
  longitude?: number;
  latitude?: number;
  category?: string;
  state?: string;
  lga?: string;
  alias?: string;
  address?: string;
  name?: string;
  no_of_atm?: number;
  outlet_type?: string;
  record_keeping?: string;
  establishment_name?: string;
  standalone_business?: string;
  other_business?: string;
  bank?: string;
  average_weekly_deposit?: string;
  average_weekly_withdrawal?: string;
  key?: string;
}

export interface IBankAgentsDocument extends Document, IBankAgents {}
