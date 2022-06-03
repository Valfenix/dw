import mongoose, { Schema } from 'mongoose';
import { ISecDocument } from '../interfaces/sec.interface';

const secSchema: Schema = new Schema(
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
    name: String,
    outlet_type: String,
    address: String,
    record_keeping: String,
    stock_brokering: { type: String, default: 'false' },
    investment_banking: { type: String, default: 'false' },
    investment_advising: { type: String, default: 'false' },
    collective_investment_schemes: { type: String, default: 'false' },
    rating_agencies: { type: String, default: 'false' },
    custodians: { type: String, default: 'false' },
    fund_managing: { type: String, default: 'false' },
    other_financial_services: { type: String },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISecDocument>('SecuritiesExchangeComm', secSchema);
