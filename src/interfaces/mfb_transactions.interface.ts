import { Document } from 'mongoose';

export interface IMFBTransaction {
  action?: string;
  month?: number;
  year?: number;
  volume?: number;
  value?: number;
  state?: string;
  state_key?: string;
  key?: string;
}

export interface IMFBTransactionDocument extends Document, IMFBTransaction {}
