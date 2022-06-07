import mongoose, { Schema } from 'mongoose';
import { IYearlyFraudDocument } from '../interfaces/yearly_fraud.interface';

const YearlyFraudSchema: Schema = new Schema(
  {
    amount_involved: {
      type: Number,
    },

    complaint_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplaintCategory',
    },
    day: {
      type: String,
    },
    year: {
      type: String,
    },
    date_reported: {
      type: Date,
    },

    status: {
      type: String,
      // enum: ["Ongoing, Resolved, Pending"]
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IYearlyFraudDocument>('YearlyFraudSummary', YearlyFraudSchema);
