/**
 *  DO NOT DELETE THIS FILE OR THE DATABASE SERVICE IS LOST == Author = Valentine Offiah
 */

import mongoose from 'mongoose';
import { EventEmitter } from 'events';
import { MONGO_DB_URL, MONGO_DB_URL_TEST, MONGO_OPTIONS } from '../config/config';
import DocumentStoreController from '../controllers/data_store.controller';
import Logger from '../lib/logger';
import { DATABASE_NAMESPACE } from '../config/constants';

class DatabaseMongoService {
  public static Emitter: EventEmitter = new EventEmitter();
  public static logger: any = new Logger('db', DATABASE_NAMESPACE);

  static async MongooseService() {
    mongoose
      .connect(MONGO_DB_URL_TEST, MONGO_OPTIONS)
      .then(async () => {
        DatabaseMongoService.logger.info(`Connected to MongoDB`);
        // DocumentStoreController.statesLga();
      })
      .catch((_err: Error) => {
        // now do retry //
        DatabaseMongoService.logger.error('Database connection error... Retrying...');
        DatabaseMongoService.Emitter.emit('DB_CONN_ERROR');
      });
  }
}

export default DatabaseMongoService;
