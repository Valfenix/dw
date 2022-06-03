import mongoose, { Schema } from 'mongoose';
import { IMonthlySummaryDocument } from '../interfaces/monthly_summary.interface';

const monthlySummarySchema = new Schema(
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

export default mongoose.model<IMonthlySummaryDocument>('MonthlySummary', monthlySummarySchema);
