import mongoose, { Schema } from 'mongoose';
import { IMonthlyCompalintsDocument } from '../interfaces/monthly_complaints.interface';

const MonthlyComplaintSchema: Schema = new Schema(
  {
    amount_in_dispute: {
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
    date_received: {
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

export default mongoose.model<IMonthlyCompalintsDocument>(
  'MonthlyComplaintSummary',
  MonthlyComplaintSchema
);
