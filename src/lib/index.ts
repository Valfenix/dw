import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import Logger from './logger';
import { GENERAL_NAMESPACE } from '../config/constants';

const logger: any = new Logger('server', GENERAL_NAMESPACE);

/** Generate and sign a user Token */
const generateToken = (data: any, timeToLive: any = config.server.token.expireTime) => {
  return new Promise((resolve, _reject) => {
    console.log(timeToLive);
    const signOptions: any = {
      issuer: `${config.server.token.issuer}`,
      subject: 'NFS-DATAWARE-HOUSE [Author: Valentine Offiah.]',
      algorithm: 'HS256',
      audience: ['The Universe'],
    };
    signOptions.expiresIn = timeToLive;

    console.log(data);

    jwt.sign(data, String(config.server.token.secret), signOptions, (err: any, token: any) => {
      if (err) {
        console.log(err.message);
      }
      resolve(token);
    });
  });
};

const errorResponse = (
  res: Response,
  code: number,
  message: string | Record<string, any>,
  extra?: any
) => {
  return res.status(code).json({
    success: false,
    code: code,
    message: message,
    extra,
  });
};

const successResponse = (
  res: Response,
  code: number,
  message: string | Record<string, any>,
  extra?: any
) => {
  return res.status(code).json({
    success: true,
    message: message,
    extra,
  });
};

export default {
  generateToken,
  errorResponse,
  successResponse,
};
