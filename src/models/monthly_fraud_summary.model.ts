import mongoose, { Schema } from 'mongoose';
import { IMonthlyFraudDocument } from '../interfaces/monthly_fraud.interface';

const MonthlyFraudSchema: Schema = new Schema(
  {
    amount_involved: {
      type: Number,
    },

    complaint_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplaintCategory',
    },
    month: {
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

export default mongoose.model<IMonthlyFraudDocument>('MonthlyFraudSummary', MonthlyFraudSchema);
