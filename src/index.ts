import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import config from './config/config';

import routes from './routes/index.routes';

import Logger from './lib/logger';
// import { PostgresDatabaseService } from './services/PostgreDBConnection';
import { PostGresDatabaseService } from './services/PostGresDBConnection';
import { DatabaseService } from './services/MysqlDBConnection';
import DatabaseMongoService from './services/MongoDBConnection';
import BankController from './controllers/bank.controller';
import DocumentStoreController from './controllers/data_store.controller';
import TransactionController from './controllers/transaction.controller';

declare global {
  namespace Express {
    interface User {
      email?: string;
      firstName?: string;
      lastName?: string;
      id?: string;
      _id?: string;
    }

    export interface Request {
      user?: User;
    }
  }
}

const NAMESPACE = 'SERVER';

const router = express();

const logger: any = new Logger('server', NAMESPACE);

router.use(cors());

DatabaseService.getConnection();

PostGresDatabaseService.getConnection();

DatabaseMongoService.MongooseService();

// Bank Cron Job
cron.schedule(String(process.env.NIBSS_CRON), async () => {
  BankController.bankListPipelinePos();
  BankController.bankListPipelineNip();
});

// Transactions Cron
cron.schedule(String(process.env.NIBSS_CRON), async () => {
  TransactionController.posTransactionPipeline();
  TransactionController.nipTransactionPipeline();
});

// CBN Cron Job
cron.schedule('*/10 * * * * *', async () => {
  if (
    String(process.env.CBN_CRON) !== undefined ||
    Object.keys(String(process.env.CBN_CRON)).length > 0
  ) {
    cron.schedule(String(process.env.CBN_CRON), async () => {
      // DocumentStoreController.statesLga();
      DocumentStoreController.mmoTransactionPipeline();
      DocumentStoreController.mfbTransactionPipeline();
      DocumentStoreController.atmLocationsPipeline();
      DocumentStoreController.bankAgentsLocationsPipeline();
      DocumentStoreController.pfaLocationsPipeline();
      DocumentStoreController.insurancePipeline();
      DocumentStoreController.mfbPipeline();
      DocumentStoreController.cmbPipeline();
      DocumentStoreController.mortgagePipeline();
      DocumentStoreController.dfiPipeline();
      DocumentStoreController.mmoPipeline();
      DocumentStoreController.bdcPipeline();
      DocumentStoreController.secPipeline();
      DocumentStoreController.complaintCategory();
      DocumentStoreController.complaintPipeline();
      DocumentStoreController.fraudPipeline();
    });
  }
});

/** Log the request */
router.use((req: Request, res: Response, next: NextFunction) => {
  /** Log the req */
  logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    /** Log the res */
    logger.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/**
 *  View engine setup
 */

router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'pug');

/** Parse the body of the request */
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(__dirname));

/** Rules of our API */
router.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

router.use('/api/v2', routes);

/** Error handling */
router.use((_req: Request, res: Response, _next: NextFunction) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
  logger.info(`Server is running on ${config.server.hostname}:${config.server.port}`);
});

export default httpServer;
