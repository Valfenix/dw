import mongoose, { Schema } from 'mongoose';
import {
  IMMOTransactionDocument,
  IMmoTransactionTypeList,
} from '../interfaces/mmo_transactions.interface';

const MMOTransactionSchema: Schema = new Schema(
  {
    transaction_type: {
      type: String,
      enum: IMmoTransactionTypeList,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    value: {
      type: Number,
    },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMMOTransactionDocument>('MMOTransaction', MMOTransactionSchema);
