import mongoose, { Schema } from 'mongoose';
import { IPFADocument } from '../interfaces/pension_fund_admin.interface';

const PFAsSchema: Schema = new Schema(
  {
    longitude: Number,
    latitude: Number,
    category: String,
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
    },
    lga: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LGA',
    },
    alias: String,
    regulating_body: String,
    no_of_atm: { type: Number, default: 0 },
    name: String,
    outlet_type: String,
    address: String,
    record_keeping: String,
    personal_pension: { type: String, default: 'false' },
    group_pension: { type: String, default: 'false' },
    account_opening: { type: String, default: 'false' },
    investment_products: { type: String, default: 'false' },
    other_financial_services: { type: String, default: 'false' },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPFADocument>('PensionFundAdmin', PFAsSchema);
