import mongoose, { Schema } from 'mongoose';
import { IBankDocument } from '../interfaces/bank.interface';

const BankSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bank_code: {
      type: Number,
    },
    bank_category: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBankDocument>('Bank', BankSchema);
