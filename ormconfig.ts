import Account from "./src/Entities/Account";
import User from "./src/Entities/User";
import Token from "./src/Entities/Token";
import UserToken from "./src/Entities/UserToken";
import Otp from "./src/Entities/Otp";
import Roles from "./src/Entities/Roles";
import config, { env } from "./src/config/config";

module.exports = {
  // type: "mysql",
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,

  // type: "mysql",
  // database: "yaraadb",
  // username: "root",
  // password: "Rasengan_123",
  synchronize: true,
  logging: false,
  entities: [Account, User, Roles, Permissions, Token, UserToken, Otp],

  // type: "mysql",
  // // database: "heroku_5d26481c01069d6",
  // // username: "b89489e301790a",
  // // password: "f4ec1fd4",
  // // host: "us-cdbr-east-05.cleardb.net",
  // url: process.env.CLEARDB_DATABASE_URL,
  // synchronize: true,
  // logging: false,
  // entities: [Account, User, Permissions, Token, UserToken, Otp],
  // migrations: ["src/migrations/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
};

// CLEARDB_DATABASE_URL: mysql://b89489e301790a:f4ec1fd4@us-cdbr-east-05.cleardb.net/heroku_5d26481c01069d6?reconnect=true
