import mongoose, { Schema } from 'mongoose';
import { IYearlyCompalintsDocument } from '../interfaces/yearly_complaints.interface';

const YearlyComplaintSchema: Schema = new Schema(
  {
    amount_in_dispute: {
      type: Number,
    },

    complaint_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplaintCategory',
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

export default mongoose.model<IYearlyCompalintsDocument>(
  'YearlyComplaintSummary',
  YearlyComplaintSchema
);
