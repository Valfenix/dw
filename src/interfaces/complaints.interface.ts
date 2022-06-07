import { Document, ObjectId } from 'mongoose';

export interface IComplaints {
  account_currency?: string;
  amount_in_dispute?: number;
  branch_name?: string;
  city?: string;
  complaint_category?: ObjectId;
  complaint_description?: string;
  complaint_subject?: string;
  country?: string;
  date_closed?: Date;
  date_received?: string;
  tracking_reference_no?: string;
  financial_institution?: ObjectId;
  state?: string;
  status?: string;
}

export interface IComplaintsDocument extends Document, IComplaints {}
