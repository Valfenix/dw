import mongoose, { Schema } from 'mongoose';
import { ICmbLocationsDocument } from '../interfaces/cmb_locations.interface';

const cmbLocationsSchema: Schema = new Schema(
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
    name: String,
    no_of_atm: {
      type: Number,
      default: 0,
    },
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

export default mongoose.model<ICmbLocationsDocument>('CommercialBank', cmbLocationsSchema);
