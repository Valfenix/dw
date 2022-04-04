import mongoose, { Schema } from 'mongoose';
import { IDocCountDocument, ICountCategory } from '../interfaces/doc_count.interface';

const DocCountSchema: Schema = new Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ICountCategory,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDocCountDocument>('DocCount', DocCountSchema);
