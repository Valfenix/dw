import { Document } from 'mongoose';

export enum ICountCategory {
  BANK_POS = 'bank_pos',
  BANK_NIP = 'bank_nip',
  COLLECTION_TYPE = 'collection_type',
  DAILY_SUMMARY = 'daily_summary',
  MONTHLY_SUMMARY = 'monthly_summary',
  YEARLY_SUMMARY = 'yearly_summary',
  TRANSACTIONS = 'transactions',
  MMO_TRANSACTIONS = 'mmo_transactions',
  MFB_TRANSACTIONS = 'mfb_transactions',
  ATM_LOCATIONS = 'atm_locations',
  BANK_AGENTS_LOCATIONS = 'bank_agents_locations',
  PENSION_FUND_ADMIN = 'pension_fund_admin',
  INSURANCE = 'insurance',
  MFB_LOCATIONS = 'mfb_locations',
  CMB_LOCATIONS = 'cmb_locations',
  MORTGAGE_BANKS = 'mortgage_banks',
  DEVELOPMENT_FINANCE_INSTITUTION = 'development_finance_institution',
  MMO = 'mmo',
  BDC = 'bdc',
  SEC = 'sec',
  POS_TRANSACTION = 'pos_transaction',
  NIP_TRANSACTION = 'nip_transaction',
}

export interface IDocCount {
  count?: number;
  category?: string;
}

export interface IDocCountDocument extends Document, IDocCount {}
