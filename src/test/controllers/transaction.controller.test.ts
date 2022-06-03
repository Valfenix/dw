import httpServer from '../../index';
import request from 'supertest';
import { getRepository } from 'typeorm';
import DocCount from '../../models/doc_count.model';
import CollectionType from '../../models/collection_type.model';
import cron from 'node-cron';
import collection_type from '../../Entities/collection_type';
import { DatabaseService } from '../../services/MysqlDBConnection';
import TransactionController from '../../controllers/transaction.controller';

let collectionTypeRepository: any;

beforeAll(async () => {
  await DatabaseService.getConnection();
  collectionTypeRepository = getRepository(collection_type, 'MYSQL');
});

afterEach(async () => {
  await DocCount.remove({});
});

afterAll(async () => {
  await collectionTypeRepository.delete({});
  await httpServer.close();
});

describe('POST /Transactions', () => {
  it('returns status code 400 when a field is missing', async () => {
    const res = await request(httpServer).post('/api/v2/transaction/create-collection').send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns status code 409 when collection type exists already', async () => {
    jest.setTimeout(10000);
    const cat = new collection_type();
    cat.description = 'mCASH Unsuccessful';
    cat.category = 'mCASH';
    cat.success = false;

    await collectionTypeRepository.save(cat);

    const res = await request(httpServer).post('/api/v2/transaction/create-collection').send({
      description: 'mCASH Unsuccessful',
      category: 'mCASH',
      success: false,
    });

    expect(res.statusCode).toEqual(409);
  });

  it('returns status code 201 when collection type is inserted', async () => {
    jest.setTimeout(10000);

    const res = await request(httpServer).post('/api/v2/transaction/create-collection').send({
      description: 'mCASH Unsuccessful',
      category: 'mCASH',
      success: true,
    });

    expect(res.statusCode).toEqual(201);
  });

  it('it should pass the collectionType cron job, return and create a collection type payload', async () => {
    jest.setTimeout(10000);
    const cat = new collection_type();
    cat.description = 'POS Unsuccessful';
    cat.category = 'POS';
    cat.success = false;

    await collectionTypeRepository.save(cat);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await TransactionController.collectionTypePipeline();
    expect(logSpy).toBeCalledWith('COLLECTION CREATED');
  });
});
