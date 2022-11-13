import { createConnection, createConnections } from 'typeorm';
import { EventEmitter } from 'events';
import nfs_pos_bank_list from '../Entities/nfs_pos_bank_list';
import nfs_nip_bank_list from '../Entities/nfs_nip_bank_list';
import nfs_pos from '../Entities/nfs_pos';
import nfs_nip_trans from '../Entities/nfs_nip_trans';
import DocumentStore from '../Entities/document_store';
// import collection_type from '../Entities/collection_type';
import Logger from '../lib/logger';
import { DATABASE_NAMESPACE } from '../config/constants';
// import config from '../config/config';

class DatabaseService {
  public static Emitter: EventEmitter = new EventEmitter();
  public static logger: any = new Logger('db', DATABASE_NAMESPACE);

  public static async getConnection() {
    DatabaseService.registerEvent();
    return await DatabaseService.createConnection();
  }

  static async registerEvent() {
    DatabaseService.Emitter.on('DB_CONN_ERROR', async () => {
      DatabaseService.logger.error('MYSQL Database connection error... Retrying...');
      setTimeout(async () => {
        await DatabaseService.createConnection();
      }, 10000);
    });
  }

  static async createConnection() {
    Promise.all([
      await createConnection({
        name: 'UTILITYAPPDB',
        type: 'mysql',
        host: String(process.env.MYSQL_DB_HOST1),
        username: String(process.env.MYSQL_DB_USERNAME1),
        password: String(process.env.MYSQL_DB_PASSWORD1),
        port: Number(process.env.MYSQL_DB_PORT1),
        database: String(process.env.MYSQL_DB_DATABASE1),
        synchronize: false,
        logging: false,
        entities: [nfs_pos_bank_list, nfs_pos],
      }),

      await createConnection({
        name: 'NIPDB',
        type: 'mysql',
        host: String(process.env.MYSQL_DB_HOST2),
        username: String(process.env.MYSQL_DB_USERNAME2),
        password: String(process.env.MYSQL_DB_PASSWORD2),
        port: Number(process.env.MYSQL_DB_PORT2),
        database: String(process.env.MYSQL_DB_DATABASE2),
        synchronize: false,
        logging: false,
        entities: [nfs_nip_bank_list, nfs_nip_trans],
      }),
    ])

      .then(() => {
        DatabaseService.logger.info('Connected to MYSQL UTILITY_APP_DB AND MYSQL NIP_DB');
      })
      .catch((_err: Error) => {
        console.log(_err);
        // now do retry //
        DatabaseService.logger.error('MYSQL Database connection error... Retrying...');
        DatabaseService.Emitter.emit('DB_CONN_ERROR');
      });
  }
}

export { DatabaseService };
