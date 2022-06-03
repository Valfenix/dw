import mongoose, { Schema } from 'mongoose';
import { IMmoDocument } from '../interfaces/mmo.interface';

const mmoSchema: Schema = new Schema(
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
    establishment_name: String,
    name: String,
    standalone_business: String,
    record_keeping: String,
    other_business: String,
    mmo_name: String,
    average_weekly_deposit: String,
    average_weekly_withdrawal: String,
    other_financial_services: { type: String },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMmoDocument>('MobileMoneyOperator', mmoSchema);
