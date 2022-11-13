import { createConnection, createConnections } from 'typeorm';
import { EventEmitter } from 'events';

import DocumentStore from '../Entities/document_store';
import Logger from '../lib/logger';
import { DATABASE_NAMESPACE } from '../config/constants';

class PostGresDatabaseService {
  public static Emitter: EventEmitter = new EventEmitter();
  public static logger: any = new Logger('db', DATABASE_NAMESPACE);

  public static async getConnection() {
    PostGresDatabaseService.registerEvent();
    return await PostGresDatabaseService.createConnection();
  }

  static async registerEvent() {
    PostGresDatabaseService.Emitter.on('DB_CONN_ERROR', async () => {
      PostGresDatabaseService.logger.error('POSTGRES Database connection error... Retrying...');
      setTimeout(async () => {
        await PostGresDatabaseService.createConnection();
      }, 300000);
    });
  }

  static async createConnection() {
    await createConnection({
      name: 'POSTGRES',
      type: 'postgres',
      host: String(process.env.POSTGRES_DB_HOST),
      username: String(process.env.POSTGRES_DB_USERNAME),
      password: String(process.env.POSTGRES_DB_PASSWORD),
      port: Number(process.env.POSTGRES_DB_PORT),
      database: String(process.env.POSTGRES_DB_DATABASE),
      synchronize: false,
      logging: false,
      entities: [DocumentStore],
    })
      .then(() => {
        PostGresDatabaseService.logger.info('Connected to POSTGRES CBN');
      })
      .catch((_err: Error) => {
        // console.log(_err);
        // now do retry //
        PostGresDatabaseService.logger.error('POSTGRES Database connection error... Retrying...');
        PostGresDatabaseService.Emitter.emit('DB_CONN_ERROR');
      });
  }
}

export { PostGresDatabaseService };
