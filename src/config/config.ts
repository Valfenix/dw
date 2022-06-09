import dotenv from 'dotenv';
dotenv.config();

function getEnv(variable: string, optional: boolean = false) {
  if (process.env[variable] === undefined) {
    if (optional) {
      console.warn(
        `[@env]: Environmental variable for ${variable} is not supplied. \n So a default value will be generated for you.`
      );
    } else {
      throw new Error(`You must create an environment variable for ${variable}`);
    }
  }

  return process.env[variable]?.replace(/\\n/gm, '\n');
}

// environment
export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes('dev'),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes('test'),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes('prod'),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes('staging'),
  env: process.env.NODE_ENV,
};

// MONGODB CONNECTION CONFIGURATIONS
export const MONGO_DB_URL = getEnv('MONGO_DB_URL')!;
export const MONGO_DB_URL_TEST = getEnv('MONGO_DB_URL_TEST')!;
export const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 90000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

/******
 *
 *
 * 

 * SERVER CONFIGURATIONS
 */
const SERVER_HOSTNAME = env.isProd ? process.env.SERVER_HOSTNAME : 'localhost';
const SERVER_PORT = env.isProd ? process.env.PORT : 1228;

const SERVER_TOKEN_EXPIRETIME = '12h';
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'NFS-DATAWAREHOUSE';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'codedragon';

type IServerConfig = {
  hostname?: string;
  port?: number;
  token: {
    expireTime?: string;
    issuer?: string;
    secret?: string;
    thirdSecret?: string;
  };
};
const SERVER: IServerConfig = {
  hostname: String(SERVER_HOSTNAME),
  port: Number(SERVER_PORT),
  token: {
    expireTime: String(SERVER_TOKEN_EXPIRETIME),
    issuer: String(SERVER_TOKEN_ISSUER),
    secret: String(SERVER_TOKEN_SECRET),
  },
};

/***
 *
 *
 *
 *  DATABASE CONFIGURATIONS
 */

// MYSQL DB CONFIG
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_TYPE = process.env.DB_TYPE;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

type IDBConfigType = {
  username: string;
  password: string;
  database: string;
  port?: number;
  type: string;
  host: string;
};

const DATABASE: IDBConfigType = {
  username: String(DB_USERNAME),
  password: String(DB_PASSWORD),
  database: String(DB_DATABASE),
  port: Number(DB_PORT),
  type: String(DB_TYPE),
  host: String(DB_HOST),
};

// POSTGRES DB CONFIG
const POSTGRES_DB_USERNAME = process.env.POSTGRES_DB_USERNAME;
const POSTGRES_DB_PASSWORD = process.env.POSTGRES_DB_PASSWORD;
const POSTGRES_DB_DATABASE = process.env.POSTGRES_DB_DATABASE;
const POSTGRES_DB_TYPE = process.env.POSTGRES_DB_TYPE;
const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST;
const POSTGRES_DB_PORT = process.env.POSTGRES_DB_PORT;

type IPOSTGRESDBConfigType = {
  username: string;
  password: string;
  database: string;
  port?: number;
  type: string;
  host: string;
};

const POSTGRES_DATABASE: IPOSTGRESDBConfigType = {
  username: String(POSTGRES_DB_USERNAME),
  password: String(POSTGRES_DB_PASSWORD),
  database: String(POSTGRES_DB_DATABASE),
  port: Number(POSTGRES_DB_PORT),
  type: String(POSTGRES_DB_TYPE),
  host: String(POSTGRES_DB_HOST),
};

/**
 *
 * EXPORTS
 */

const config = {
  database: DATABASE,
  postgres_db: POSTGRES_DATABASE,
  server: SERVER,
};

export default config;
