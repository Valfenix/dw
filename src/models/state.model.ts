import mongoose, { Schema } from 'mongoose';
import { IStateDocument } from '../interfaces/state.interface';

const StateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    longitude: Number,
    latitude: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IStateDocument>('State', StateSchema);
