"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_OPTIONS = exports.MONGO_DB_URL_TEST = exports.MONGO_DB_URL = exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnv(variable, optional) {
    var _a;
    if (optional === void 0) { optional = false; }
    if (process.env[variable] === undefined) {
        if (optional) {
            console.warn("[@env]: Environmental variable for ".concat(variable, " is not supplied. \n So a default value will be generated for you."));
        }
        else {
            throw new Error("You must create an environment variable for ".concat(variable));
        }
    }
    return (_a = process.env[variable]) === null || _a === void 0 ? void 0 : _a.replace(/\\n/gm, '\n');
}
// environment
exports.env = {
    isDev: String(process.env.NODE_ENV).toLowerCase().includes('dev'),
    isTest: String(process.env.NODE_ENV).toLowerCase().includes('test'),
    isProd: String(process.env.NODE_ENV).toLowerCase().includes('prod'),
    isStaging: String(process.env.NODE_ENV).toLowerCase().includes('staging'),
    env: process.env.NODE_ENV,
};
// MONGODB CONNECTION CONFIGURATIONS
exports.MONGO_DB_URL = getEnv('MONGO_DB_URL');
exports.MONGO_DB_URL_TEST = getEnv('MONGO_DB_URL_TEST');
exports.MONGO_OPTIONS = {
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
var SERVER_HOSTNAME = exports.env.isProd ? process.env.SERVER_HOSTNAME : 'localhost';
var SERVER_PORT = exports.env.isProd ? process.env.PORT : 1228;
var SERVER_TOKEN_EXPIRETIME = '12h';
var SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'NFS-DATAWAREHOUSE';
var SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'codedragon';
var SERVER = {
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
var DB_USERNAME = process.env.DB_USERNAME;
var DB_PASSWORD = process.env.MYSQL_PASSWORD;
var DB_DATABASE = process.env.MYSQL_DATABASE;
var DB_TYPE = process.env.DB_TYPE;
var DB_HOST = process.env.DB_HOST;
var DB_PORT = process.env.DB_PORT;
var DATABASE = {
    username: String(DB_USERNAME),
    password: String(DB_PASSWORD),
    database: String(DB_DATABASE),
    port: Number(DB_PORT),
    type: String(DB_TYPE),
    host: String(DB_HOST),
};
// POSTGRES DB CONFIG
var POSTGRES_DB_USERNAME = process.env.POSTGRES_USER;
var POSTGRES_DB_PASSWORD = process.env.POSTGRES_PASSWORD;
var POSTGRES_DB_DATABASE = process.env.POSTGRES_DB;
var POSTGRES_DB_TYPE = process.env.POSTGRES_DB_TYPE;
var POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST;
var POSTGRES_DB_PORT = process.env.POSTGRES_DB_PORT;
var POSTGRES_DATABASE = {
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
var config = {
    database: DATABASE,
    postgres_db: POSTGRES_DATABASE,
    server: SERVER,
};
exports.default = config;
//# sourceMappingURL=config.js.map