import { Document } from 'mongoose';

export interface IATM {
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
  mastercard_accepted?: string;
  visa_accepted?: string;
  quickteller_accepted?: string;
  verve_accepted?: string;
  netcash_accepted?: string;
  deposit_accepted?: string;
  key?: string;
}

export interface IATMDocument extends Document, IATM {}
