import { createConnections } from 'typeorm';
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
      }, 10000);
    });
  }

  static async createConnection() {
    return await createConnections([
      {
        name: 'MYSQL',
        type: 'mysql',
        host: String(process.env.DB_HOST),
        username: String(process.env.DB_USERNAME),
        password: String(process.env.DB_PASSWORD),
        port: Number(process.env.DB_PORT),
        database: String(process.env.DB_DATABASE),
        synchronize: false,
        logging: false,
        entities: [nfs_pos_bank_list, nfs_nip_bank_list, collection_type, nfs_pos, nfs_nip],
      },
      {
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
      },
      // {
      //   name: 'MYSQL',
      //   type: 'mysql',
      //   host: String('localhost'),
      //   username: String('root'),
      //   password: String('Rasengan_123'),
      //   port: Number(3306),
      //   database: String('utilityappdb'),
      //   synchronize: true,
      //   logging: true,
      //   entities: [nfs_pos_bank_list, nfs_nip_bank_list, collection_type, nfs_pos, nfs_nip],
      // },
      // {
      //   name: 'POSTGRES',
      //   type: 'postgres',
      //   host: String('localhost'),
      //   username: String('postgres'),
      //   password: String('Rasengan_123'),
      //   port: Number(5432),
      //   database: String('cbn'),
      //   synchronize: true,
      //   logging: true,
      //   entities: [DocumentStore],
      // },
    ])
      .then(() => {
        DatabaseService.logger.info('Connected to MYSQL & POSTGRES');
      })
      .catch((_err: Error) => {
        console.log(_err);
        // now do retry //
        DatabaseService.logger.error('Database connection error... Retrying...');
        DatabaseService.Emitter.emit('DB_CONN_ERROR');
      });
  }
}

export { DatabaseService };
