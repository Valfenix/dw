import mongoose, { Schema } from 'mongoose';
import { IDfiDocument } from '../interfaces/development_financial_institution.interface';

const dfiSchema: Schema = new Schema(
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
    name: String,
    outlet_type: String,
    record_keeping: String,
    agricultural_finance: { type: String, default: 'false' },
    sme_finance: { type: String, default: 'false' },
    export_import_finance: { type: String, default: 'false' },
    mortgage_finance: { type: String, default: 'false' },
    infrastructure_finance: { type: String, default: 'false' },
    other_financial_services: String,
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDfiDocument>('DevelopmentFinanceInstitution', dfiSchema);
