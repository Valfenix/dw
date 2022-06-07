import mongoose, { Schema } from 'mongoose';
import { IComplaintCategoryDocument } from '../interfaces/complaint_category.interface';

const complaintCategorySchema: Schema = new Schema(
  {
    description: String,
    category: String,
    success: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model<IComplaintCategoryDocument>(
  'ComplaintCategory',
  complaintCategorySchema
);
