import mongoose, { Schema } from 'mongoose';
import { IATMDocument } from '../interfaces/atm.interface';

const ATMSchema: Schema = new Schema(
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
    address: String,
    name: String,
    no_of_atm: Number,
    outlet_type: String,
    mastercard_accepted: {
      type: String,
      default: 'false',
    },
    visa_accepted: {
      type: String,
      default: 'false',
    },
    quickteller_accepted: {
      type: String,
      default: 'false',
    },
    verve_accepted: {
      type: String,
      default: 'false',
    },
    netcash_accepted: {
      type: String,
      default: 'false',
    },
    deposit_accepted: {
      type: String,
      default: 'false',
    },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IATMDocument>('ATM', ATMSchema);
