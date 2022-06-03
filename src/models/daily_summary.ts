import mongoose, { Schema } from 'mongoose';
import { IDailySummaryDocument } from '../interfaces/daily_summary.interface';

const dailySummarySchema = new Schema(
  {
    collectionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollectionType',
    },
    source_bank: {
      type: Number,
    },
    destination_bank: {
      type: Number,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    day: {
      type: String,
    },
    transactionDate: {
      type: Date,
    },
    value: {
      type: Number,
    },
    volume: {
      type: Number,
    },

    key: {
      type: String,
    },
  },
  {
    timestamps: true,
    bufferTimeoutMS: 30000,
  }
);

export default mongoose.model<IDailySummaryDocument>('DailySummary', dailySummarySchema);
