import mongoose, { Schema } from 'mongoose';
import { IBdcDocument } from '../interfaces/bureau_de_change.interface';

const bdcSchema: Schema = new Schema(
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
    alias: String,
    outlet_type: String,
    record_keeping: String,
    name: String,
    money_transfer: { type: String, default: 'false' },
    currency_exchange: { type: String, default: 'false' },
    average_transactions_per_week: {
      type: String,
    },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBdcDocument>('BureauDeChange', bdcSchema);
