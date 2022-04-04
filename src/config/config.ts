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

// DB CONFIG
const DB_USERNAME = env.isProd ? process.env.DB_USERNAME : 'root';
const DB_PASSWORD = env.isProd ? process.env.DB_PASSWORD : 'Rasengan_123';
const DB_DATABASE = env.isProd ? process.env.DB_DATABASE : 'utilityappdb';
const DB_TYPE = env.isProd ? process.env.DB_TYPE : 'mysql';
const DB_HOST = env.isProd ? process.env.DB_HOST : 'localhost';
const DB_PORT = env.isProd ? process.env.DB_PORT : 3306;

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

/**
 *
 * EXPORTS
 */

const config = {
  database: DATABASE,
  server: SERVER,
};

export default config;
