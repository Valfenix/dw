import mongoose, { Schema } from 'mongoose';
import { IYearlySummaryDocument } from '../interfaces/yearly_summary.interface';

const yearlySummarySchema = new Schema(
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
    year: {
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
  },
  {
    timestamps: true,
    bufferTimeoutMS: 30000,
  }
);

export default mongoose.model<IYearlySummaryDocument>('YearlySummary', yearlySummarySchema);
