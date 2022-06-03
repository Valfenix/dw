import mongoose, { Schema } from 'mongoose';
import { IMfbLocationsDocument } from '../interfaces/mfb_locations.interface';

const mfbLocationsSchema: Schema = new Schema(
  {
    longitude: Number,
    latitude: Number,
    category: String,
    category_code: String,
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
    bank_name: String,
    record_keeping: String,
    account_opening: { type: String, default: 'false' },
    personal_loan: { type: String, default: 'false' },
    business_loan: { type: String, default: 'false' },
    savings: { type: String, default: 'false' },
    transfers: { type: String, default: 'false' },
    payment: { type: String, default: 'false' },
    other_financial_services: String,
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMfbLocationsDocument>('MicrofinanceBank', mfbLocationsSchema);
