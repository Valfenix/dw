import mongoose, { Schema } from 'mongoose';
import { ICollectionTypeDocument } from '../interfaces/collection_type.interface';

const CollectionTypeSchema: Schema = new Schema(
  {
    old_id: Number,
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    success: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICollectionTypeDocument>('CollectionType', CollectionTypeSchema);
