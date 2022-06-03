import mongoose, { Schema } from 'mongoose';
import { IBankAgentsDocument } from '../interfaces/bank_agents.interface';

const BankAgentsSchema: Schema = new Schema(
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
    alias: {
      type: String,
    },
    no_of_atm: {
      type: Number,
      default: 0,
    },
    address: String,
    record_keeping: String,
    outlet_type: String,
    establishment_name: String,
    name: String,
    standalone_business: String,
    other_business: String,
    bank: String,
    average_weekly_deposit: String,
    average_weekly_withdrawal: String,
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBankAgentsDocument>('BankAgent', BankAgentsSchema);
