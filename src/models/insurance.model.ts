import mongoose, { Schema } from 'mongoose';
import { IInsuranceDocument } from '../interfaces/insurance.interface';

const InsuranceSchema: Schema = new Schema(
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
    name: String,
    address: String,
    regulating_body: String,
    outlet_type: String,
    record_keeping: String,
    property: { type: String, default: 'false' },
    life: { type: String, default: 'false' },
    health: { type: String, default: 'false' },
    micro_insurance: { type: String, default: 'false' },
    re_insurance: { type: String, default: 'false' },
    other_financial_services: { type: String, default: 'false' },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInsuranceDocument>('InsuranceBank', InsuranceSchema);
