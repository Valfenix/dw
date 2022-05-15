import { Document } from 'mongoose';

export enum IMmoTransactionType {
  CARDLESS_WITHDRAWAL = 'cardless_withdrawal',
  AIRTIME_PAYMENT = 'airtime_payment',
  FUNDS_TRANSFER = 'funds_transfer',
}

export const IMmoTransactionTypeList = [
  IMmoTransactionType.CARDLESS_WITHDRAWAL,
  IMmoTransactionType.AIRTIME_PAYMENT,
  IMmoTransactionType.FUNDS_TRANSFER,
];

export interface IMMOTransaction {
  transaction_type?: IMmoTransactionType;
  month?: number;
  year?: number;
  volume?: number;
  value?: number;
  key?: string;
}

export interface IMMOTransactionDocument extends Document, IMMOTransaction {}
