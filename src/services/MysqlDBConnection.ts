import { createConnection, createConnections } from 'typeorm';
import { EventEmitter } from 'events';
import nfs_pos_bank_list from '../Entities/nfs_pos_bank_list';
import nfs_nip_bank_list from '../Entities/nfs_nip_bank_list';
import nfs_pos from '../Entities/nfs_pos';
import nfs_nip from '../Entities/nfs_nip';
import DocumentStore from '../Entities/document_store';
import collection_type from '../Entities/collection_type';
import Logger from '../lib/logger';
import { DATABASE_NAMESPACE } from '../config/constants';
import config from '../config/config';

class DatabaseService {
  public static Emitter: EventEmitter = new EventEmitter();
  public static logger: any = new Logger('db', DATABASE_NAMESPACE);

  public static async getConnection() {
    DatabaseService.registerEvent();
    return await DatabaseService.createConnection();
  }

  static async registerEvent() {
    DatabaseService.Emitter.on('DB_CONN_ERROR', async () => {
      DatabaseService.logger.error('Database connection error... Retrying...');
      setTimeout(async () => {
        await DatabaseService.createConnection();
      }, 5000);
    });
  }

  static async createConnection() {
    return await createConnections([
      {
        name: 'MYSQL',
        type: 'mysql',
        host: config.database.host,
        username: config.database.username,
        password: config.database.password,
        port: config.database.port,
        database: config.database.database,
        synchronize: true,
        logging: false,
        entities: [nfs_pos_bank_list, nfs_nip_bank_list, collection_type, nfs_pos, nfs_nip],
      },
      {
        name: 'POSTGRES',
        type: 'postgres',
        host: config.postgres_db.host,
        username: config.postgres_db.username,
        password: config.postgres_db.password,
        port: config.postgres_db.port,
        database: config.postgres_db.database,
        synchronize: true,
        logging: false,
        entities: [DocumentStore],
      },
    ])
      .then(() => {
        DatabaseService.logger.info('Connected to MYSQL & POSTGRES');
      })
      .catch((_err: Error) => {
        // now do retry //
        DatabaseService.logger.error('Database connection error... Retrying...');
        DatabaseService.Emitter.emit('DB_CONN_ERROR');
      });
  }
}

export { DatabaseService };
