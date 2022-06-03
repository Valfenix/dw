import mongoose, { Schema } from 'mongoose';
import { ITransactionsDocument } from '../interfaces/transactions.interface';

const transactionSchema = new Schema(
  {
    source_bank: {
      type: Number,
    },
    destination_bank: {
      type: Number,
    },
    transactionDate: {
      type: Date,
    },
    type: {
      type: String,
    },
    collectionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollectionType',
    },

    volume: {
      type: Number,
    },

    value: {
      type: Number,
    },
    category: String,
    source_bank_name: String,
    destination_bank_name: String,
    success: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITransactionsDocument>('transactions', transactionSchema);
