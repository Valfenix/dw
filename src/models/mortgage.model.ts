import mongoose, { Schema } from 'mongoose';
import { IMortgageLocationsDocument } from '../interfaces/mortgage.interface';

const mortgageSchema: Schema = new Schema(
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
    address: String,
    outlet_type: String,
    name: String,
    record_keeping: String,
    sme_finance: { type: String, default: 'false' },
    savings: { type: String, default: 'false' },
    deposits: { type: String, default: 'false' },
    transfers: { type: String, default: 'false' },
    consumer_credit: { type: String, default: 'false' },
    infrastructure_finance: { type: String, default: 'false' },
    mortgage_finance: { type: String, default: 'false' },
    other_financial_services: { type: String },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMortgageLocationsDocument>('MortgageBank', mortgageSchema);
