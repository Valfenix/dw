import { Document } from 'mongoose';

export interface IState {
  name?: string;
  alias?: string;
  longitude?: number;
  latitude?: number;
}

export interface IStateDocument extends Document, IState {}
