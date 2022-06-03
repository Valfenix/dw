import jwt from 'jsonwebtoken';
import util from '../../lib/index';
import mongoose from 'mongoose';
import config from '../../config/config';

describe('account.generateAuthToken', () => {
  it('should return a valid JWT', async () => {
    jest.setTimeout(40000);
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      firstName: 'Valentine',
      lastName: 'Offiah',
      email: 'voffiah@gmail.com',
    };
    const token: any = await util.generateToken(payload, '12h');
    const decoded = jwt.verify(token, String(config.server.token.secret));
    expect(decoded).toMatchObject(payload);
  });
});

describe('convertMonthToNumber', () => {
  it('should return a formatted date', async () => {
    jest.setTimeout(40000);

    const date: any = await util.convertMonthToNumber('January');
    expect(date).toEqual(1);
  });
});
