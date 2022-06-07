import mongoose, { Schema } from 'mongoose';
import { IDailyFraudDocument } from '../interfaces/daily_fraud.interface';

const DailyFraudSchema: Schema = new Schema(
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

export default mongoose.model<IDailyFraudDocument>('DailyFraudSummary', DailyFraudSchema);
