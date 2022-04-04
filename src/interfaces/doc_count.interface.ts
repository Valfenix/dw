import { Document } from 'mongoose';

export interface IDocCount {
  count?: number;
  category?: string;
}

export interface IDocCountDocument extends Document, IDocCount {}
