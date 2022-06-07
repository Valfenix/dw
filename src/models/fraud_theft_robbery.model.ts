import mongoose, { Schema } from 'mongoose';
import { IFraudDocument } from '../interfaces/fraud.interface';

const fraudSchema: Schema = new Schema(
  {
    amount_involved: {
      type: Number,
      default: 0,
    },
    comment: {
      type: Number,
      default: 0,
    },
    complaint_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplaintCategory',
    },

    date_created: {
      type: Date,
    },
    date_reported: {
      type: Date,
    },
    desc_of_transaction: {
      type: String,
    },
    status: {
      type: String,
    },
    financial_institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FinancialInstitution',
    },
    agent_code: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFraudDocument>('FraudTheftRobberies', fraudSchema);
