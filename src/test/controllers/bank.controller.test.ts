import httpServer from '../../index';
import request from 'supertest';
import { getRepository } from 'typeorm';
import DocCount from '../../models/doc_count.model';
import nfs_pos_bank_list from '../../Entities/nfs_pos_bank_list';
import BankController from '../../controllers/bank.controller';
import { DatabaseService } from '../../services/MysqlDBConnection';

let bankRepository: any;

beforeAll(async () => {
  await DatabaseService.getConnection();
  bankRepository = getRepository(nfs_pos_bank_list, 'MYSQL');
});

afterEach(async () => {
  await DocCount.remove({});
});

afterAll(async () => {
  await bankRepository.delete({});
  await httpServer.close();
});

describe('POST /bank', () => {
  it('returns status code 400 when a field is missing', async () => {
    const res = await request(httpServer).post('/api/v2/bank/create').send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns status code 409 when bank exists already', async () => {
    jest.setTimeout(10000);
    const bank = new nfs_pos_bank_list();
    bank.bankname = 'Zenith Bank';
    bank.bank_code = 190884;
    bank.bank_category = 'DMB';

    await bankRepository.save(bank);

    const res = await request(httpServer).post('/api/v2/bank/create').send({
      bankname: 'Zenith Bank',
      bank_code: 190884,
      bank_category: 'DMB',
    });

    expect(res.statusCode).toEqual(409);
  });

  it('returns status code 201 when bank is saved successfully', async () => {
    jest.setTimeout(10000);

    await bankRepository.delete({});

    const res = await request(httpServer).post('/api/v2/bank/create').send({
      bankname: 'Zenith Bank',
      bank_code: 134884,
      bank_category: 'DMB',
    });

    expect(res.statusCode).toEqual(201);
  });

  it('it should pass the bank cron job, return and create a source bank payload', async () => {
    jest.setTimeout(10000);
    const bank = new nfs_pos_bank_list();
    bank.bankname = 'Zenith Bank';
    bank.bank_code = 190884;
    bank.bank_category = 'DMB';

    await bankRepository.save(bank);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await BankController.bankListPipeline();
    expect(logSpy).toBeCalledWith('BANK CREATED');
  });
});
