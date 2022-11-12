import httpServer from '../../index';
import request from 'supertest';
import { getRepository } from 'typeorm';
import DocCount from '../../models/doc_count.model';
import CollectionType from '../../models/collection_type.model';
import cron from 'node-cron';
import nfs_pos from '../../Entities/nfs_pos';
import { DatabaseService } from '../../services/MysqlDBConnection';
import TransactionController from '../../controllers/transaction.controller';
import nfs_nip from '../../Entities/nfs_nip_trans';

let collectionTypeRepository: any;
let transactionPosRepository: any;
let transactionNipRepository: any;

beforeAll(async () => {
  await DatabaseService.getConnection();
  transactionPosRepository = getRepository(nfs_pos, 'MYSQL');
  transactionNipRepository = getRepository(nfs_nip, 'MYSQL');
  await DocCount.remove();
});

afterEach(async () => {
  await DocCount.remove({});
});

afterAll(async () => {
  await collectionTypeRepository.delete({});
  await transactionPosRepository.delete({});
  await transactionNipRepository.delete({});
  await DocCount.remove({});
  await httpServer.close();
});

describe('POST /Transactions', () => {
  it('returns status code 201 when collection type is inserted', async () => {
    jest.setTimeout(10000);

    const res = await request(httpServer).post('/api/v2/transaction/create-collection').send({
      description: 'mCASH Unsuccessful',
      category: 'mCASH',
      success: true,
      code: 3001,
    });

    expect(res.statusCode).toEqual(201);
  });

  it('returns status code 400 when a field is missing while creating a POS transaction', async () => {
    const res = await request(httpServer)
      .post('/api/v2/transaction/create-pos-transaction')
      .send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns status code 201 when POS transaction saves successfully', async () => {
    jest.setTimeout(10000);

    const res = await request(httpServer)
      .post('/api/v2/transaction/create-pos-transaction')
      .send({
        CollectionType: '100021',
        TransactionDate: new Date('2022-05-30 18:54:50.346047'),
        SourceBank: '7',
        DestinationBank: '9',
        Volumn: 4098,
        value_: 2314568.63,
      });

    expect(res.statusCode).toEqual(201);
  });

  it('returns status code 400 when a field is missing while creating a NIP transaction', async () => {
    const res = await request(httpServer)
      .post('/api/v2/transaction/create-nip-transaction')
      .send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns status code 201 when NIP transaction saves successfully', async () => {
    jest.setTimeout(10000);

    const res = await request(httpServer)
      .post('/api/v2/transaction/create-nip-transaction')
      .send({
        CollectionType: '1003301',
        TransactionDate: new Date('2022-05-22 18:54:50.346047'),
        SourceBank: '7',
        DestinationBank: '9',
        Volumn: 4300,
        value_: 234568.63,
      });

    expect(res.statusCode).toEqual(201);
  });

  it('should create Count Document for POS Transaction if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await TransactionController.posTransactionPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('should create Count Document for NIP Transaction if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await TransactionController.nipTransactionPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });
});
