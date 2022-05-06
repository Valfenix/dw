import mongoose, { Schema } from 'mongoose';
import { ILgaDocument } from '../interfaces/lga.interface';

const LgaSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
    },
    longitude: Number,
    latitude: Number,
  },
  { timestamps: true }
);

export default mongoose.model<ILgaDocument>('State', LgaSchema);
