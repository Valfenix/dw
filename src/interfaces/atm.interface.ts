import { Document, ObjectId } from 'mongoose';

export interface IATM {
  longitude?: number;
  category?: string;
  state?: ObjectId;
  lga?: ObjectId;
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
}

export interface IATMDocument extends Document, IATM {}
