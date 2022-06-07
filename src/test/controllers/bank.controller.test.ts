import httpServer from '../../index';
import request from 'supertest';
import { getRepository } from 'typeorm';
import DocCount from '../../models/doc_count.model';
import nfs_pos_bank_list from '../../Entities/nfs_pos_bank_list';
import nfs_nip_bank_list from '../../Entities/nfs_nip_bank_list';
import BankController from '../../controllers/bank.controller';
import Bank from '../../models/bank.model';
import { DatabaseService } from '../../services/MysqlDBConnection';

let bankPosRepository: any;
let bankNipRepository: any;

beforeAll(async () => {
  await DatabaseService.getConnection();
  bankPosRepository = getRepository(nfs_pos_bank_list, 'MYSQL');
  bankNipRepository = getRepository(nfs_nip_bank_list, 'MYSQL');
});

afterEach(async () => {
  await DocCount.remove({});
});

afterAll(async () => {
  await Bank.remove({});
  await bankPosRepository.delete({});
  await bankNipRepository.delete({});
  await httpServer.close();
});

describe('POST /bank', () => {
  it('returns status code 400 when a field is missing for POS', async () => {
    const res = await request(httpServer).post('/api/v2/bank/create-pos').send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns status code 400 when a field is missing for NIP', async () => {
    const res = await request(httpServer).post('/api/v2/bank/create-nip').send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns status code 409 when bank exists already from POS', async () => {
    jest.setTimeout(10000);
    const bank = new nfs_pos_bank_list();
    bank.bankname = 'Zenith Bank';
    bank.bank_code = 190884;
    bank.bank_category = 'DMB';

    await bankPosRepository.save(bank);

    const res = await request(httpServer).post('/api/v2/bank/create-pos').send({
      bankname: 'Zenith Bank',
      bank_code: 190884,
      bank_category: 'DMB',
    });

    expect(res.statusCode).toEqual(409);
  });

  it('returns status code 409 when bank exists already for NIP', async () => {
    jest.setTimeout(10000);
    const bank = new nfs_pos_bank_list();
    bank.bankname = 'Zenith Bank';
    bank.bank_code = 190886;
    bank.bank_category = 'DMB';

    await bankNipRepository.save(bank);

    const res = await request(httpServer).post('/api/v2/bank/create-nip').send({
      bankname: 'Zenith Bank',
      bank_code: 190886,
      bank_category: 'DMB',
    });

    expect(res.statusCode).toEqual(409);
  });

  it('returns status code 201 when bank is saved successfully for POS', async () => {
    jest.setTimeout(10000);

    await bankPosRepository.delete({});

    const res = await request(httpServer).post('/api/v2/bank/create-pos').send({
      bankname: 'Zenith Bank',
      bank_code: 134884,
      bank_category: 'DMB',
    });

    expect(res.statusCode).toEqual(201);
  });

  it('returns status code 201 when bank is saved successfully for NIP', async () => {
    jest.setTimeout(10000);

    await bankNipRepository.delete({});

    const res = await request(httpServer).post('/api/v2/bank/create-nip').send({
      bankname: 'Access Bank',
      bank_code: 675,
      bank_category: 'DMB',
    });

    expect(res.statusCode).toEqual(201);
  });

  it('it should pass the bank cron job, return and create a source bank payload from POS', async () => {
    jest.setTimeout(10000);
    const bank = new nfs_pos_bank_list();
    bank.bankname = 'Zenith Bank';
    bank.bank_code = 190884;
    bank.bank_category = 'DMB';

    await bankPosRepository.save(bank);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await BankController.bankListPipelinePos();
    expect(logSpy).toBeCalledWith('POS BANK CREATED');
  });

  it('it should pass the bank cron job, return and create a source bank payload from NIP', async () => {
    jest.setTimeout(10000);
    const bank = new nfs_pos_bank_list();
    bank.bankname = 'Zenith Bank';
    bank.bank_code = 190884;
    bank.bank_category = 'DMB';

    await bankNipRepository.save(bank);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await BankController.bankListPipelineNip();
    expect(logSpy).toBeCalledWith('NIP BANK CREATED');
  });
});
