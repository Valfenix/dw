import mongoose, { Schema } from 'mongoose';
import { IDailyCompalintsDocument } from '../interfaces/daily_complaints.interface';

const DailyComplaintSchema: Schema = new Schema(
  {
    amount_in_dispute: {
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

export default mongoose.model<IDailyCompalintsDocument>(
  'DailyComplaintSummary',
  DailyComplaintSchema
);
