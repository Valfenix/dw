import mongoose, { Schema } from 'mongoose';

import { IMFBTransactionDocument } from '../interfaces/mfb_transactions.interface';

const MFBTransactionSchema: Schema = new Schema(
  {
    action: {
      type: String,
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
    state: {
      type: String,
    },
    state_key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMFBTransactionDocument>('MFBTransaction', MFBTransactionSchema);
