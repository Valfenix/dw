import mongoose, { Schema } from 'mongoose';
import { IDocCountDocument } from '../interfaces/doc_count.interface';

const DocCountSchema: Schema = new Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDocCountDocument>('DocCount', DocCountSchema);
