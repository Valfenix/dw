import mongoose, { Schema } from 'mongoose';
import { IComplaintsDocument } from '../interfaces/complaints.interface';

const complaintsSchema: Schema = new Schema(
  {
    id: {
      type: Number,
    },
    account_currency: {
      type: String,
    },

    amount_in_dispute: {
      type: Number,
      default: 0,
    },

    branch_name: {
      type: String,
    },
    city: {
      type: String,
    },

    complaint_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplaintCategory',
    },
    complaint_description: {
      type: String,
    },
    complaint_subject: {
      type: String,
    },

    country: {
      type: String,
    },

    date_closed: {
      type: Date,
    },
    date_received: {
      type: Date,
    },
    tracking_reference_no: {
      type: String,
    },
    financial_institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FinancialInstitution',
    },
    state: {
      type: String,
    },
    status: {
      type: String,
      // enum: ["Ongoing, Resolved, Pending"]
    },
  },
  { timestamps: true }
);

export default mongoose.model<IComplaintsDocument>('Complaints', complaintsSchema);
