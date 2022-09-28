"use strict";
// import { createConnection } from 'typeorm';
// import { EventEmitter } from 'events';
// import DocumentStore from '../Entities/document_store';
// // import collection_type from '../Entities/collection_type';
// import Logger from '../lib/logger';
// import { DATABASE_NAMESPACE } from '../config/constants';
// class PostgresDatabaseService {
//   public static Emitter: EventEmitter = new EventEmitter();
//   public static logger: any = new Logger('db', DATABASE_NAMESPACE);
//   public static async getConnection() {
//     PostgresDatabaseService.registerEvent();
//     return await PostgresDatabaseService.createConnection();
//   }
//   static async registerEvent() {
//     PostgresDatabaseService.Emitter.on('DB_CONN_ERROR', async () => {
//       PostgresDatabaseService.logger.error('Database connection error... Retrying...');
//       setTimeout(async () => {
//         await PostgresDatabaseService.createConnection();
//       }, 500000);
//     });
//   }
//   static async createConnection() {
//     return await createConnection({
//       name: 'POSTGRES',
//       type: 'postgres',
//       host: 'localhost',
//       username: 'postgres',
//       password: 'Rasengan_123',
//       port: 5432,
//       database: 'cbn',
//       synchronize: true,
//       logging: false,
//       entities: [DocumentStore],
//     })
//       .then(() => {
//         PostgresDatabaseService.logger.info('Connected to POSTGRES');
//       })
//       .catch((_err: Error) => {
//         // now do retry //
//         PostgresDatabaseService.logger.error('Postgres Database connection error... Retrying...');
//         PostgresDatabaseService.Emitter.emit('DB_CONN_ERROR');
//       });
//   }
// }
// export { PostgresDatabaseService };
//# sourceMappingURL=PostgreDBConnection.js.map