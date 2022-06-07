import httpServer from '../../index';
import request from 'supertest';
import cron from 'node-cron';
import path from 'path';
import { getRepository } from 'typeorm';
import DocCount from '../../models/doc_count.model';
import DocumentStore from '../../Entities/document_store';
import MMOTransaction from '../../models/mmo_transactions.model';
import { DatabaseService } from '../../services/MysqlDBConnection';
import DocumentStoreController from '../../controllers/data_store.controller';
import { IDocCount, ICountCategory } from '../../interfaces/doc_count.interface';

let docStoreRepository: any;

beforeAll(async () => {
  await DatabaseService.getConnection();
  await DocCount.remove();
  docStoreRepository = getRepository(DocumentStore, 'POSTGRES');
});

afterAll(async () => {
  await docStoreRepository.delete({});
  await DocCount.remove();
  await httpServer.close();
});

describe('POST /doc_store', () => {
  it('returns status code 201 when bank is saved successfully', async () => {
    jest.setTimeout(10000);

    const res = await request(httpServer)
      .post('/api/v2/datastore/create')
      .send({
        file_content: {
          action: 'Borrow (Male)',
          state: 'Rivers',
          state_key: 'RIV',
          month: 'january',
          year: '2021',
          volume: 190592,
          value: 42142584,
        },
        business_process: 'mfb_transactions',
        creation_date: new Date(),
      });

    expect(res.statusCode).toEqual(201);
  });

  /************
   *
   *
   *
   * MMO TRANSACTIONS
   */
  it('should create Count Document for MMO TRANSACTIONS if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mmoTransactionPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move MMO Transaction to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      transaction_type: 'Funds Transfer',
      month: 'January',
      year: '2021',
      volume: 614286,
      value: 8448164500,
    };
    doc_store.business_process = 'mmo_transactions';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mmoTransactionPipeline();
    expect(logSpy).toBeCalledWith('MMO TRANSACTION SEEDED');
  });

  /************
   *
   *
   *
   * MFB TRANSACTIONS
   */

  it('should create Count Document for MFB TRANSACTIONS if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mfbTransactionPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move MFB Transaction to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      action: 'Borrow (Male)',
      state: 'Rivers',
      state_key: 'RIV',
      month: 'january',
      year: '2021',
      volume: 190592098,
      value: 42142584834,
    };
    doc_store.business_process = 'mfb_transactions';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mfbTransactionPipeline();
    expect(logSpy).toBeCalledWith('MFB TRANSACTION SEEDED');
  });

  /************
   *
   *
   *
   * ATM LOCATIONS
   */

  it('should create Count Document for ATM LOCATION if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.atmLocationsPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move MFB Transaction to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 4.99426,
      latitude: 8.34504,
      category: 'Off Site ATM',
      state: 'CROSS RIVER STATE',
      state_code: 'cross_river',
      lga: 'Calabar Municipality',
      address: '2 Paliamentary Road Calabar.',
      name: 'United Bank For Africa Plc',
      no_of_atm: 1,
      outlet_type: 'Branch',
      mastercard_accepted: 'Yes',
      visa_accepted: 'Yes',
      quickteller_accepted: 'No',
      verve_accepted: 'Yes',
      netcash_accepted: 'No',
      deposit_accepted: 'No',
    };
    doc_store.business_process = 'atm_locations';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.atmLocationsPipeline();
    expect(logSpy).toBeCalledWith('ATM LOCATION SEEDED');
  });

  /************
   *
   *
   *
   * BANK AGENTS LOCATIONS
   */

  it('should create Count Document for BANK AGENTS LOCATION if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.bankAgentsLocationsPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move BANK AGENTS LOCATION to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 4.55291,
      latitude: 7.76157,
      category: 'Bank Agent',
      state: 'OSUN STATE',
      state_code: 'osun',
      lga: 'Osogbo',
      address: 'No 55, Laro Street, Isale-Osun Osogbo',
      name_of_agent: 'Badmus Saheed Ajibola',
      type_of_outlet: 'Agent',
      record_keeping: 'Manually (log)',
      name_of_establishment: 'Alubarika Cyber Cafe',
      standalone_business: 'Conduct Other Business',
      other_business_conducted: 'Cafe',
      bank: 'Sterling Bank Plc',
      average_number_of_deposits_per_week: '0 - 25 Deposits',
      average_number_of_withdrawals_per_week: '0 - 25 Withdrawals',
    };
    doc_store.business_process = 'bank_agents_locations';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.bankAgentsLocationsPipeline();
    expect(logSpy).toBeCalledWith('BANK AGENTS LOCATION SEEDED');
  });

  /************
   *
   *
   *
   * Pension Fund Admin Locations
   */

  it('should create Count Document for PFA LOCATION if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.pfaLocationsPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move PFA LOCATION to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 4.55291,
      latitude: 7.76157,
      regulating_body: 'PENCOM',
      category: 'Pension Fund Administrator',
      state: 'LAGOS STATE',
      state_code: 'lagos',
      lga: 'Ikeja',
      address: 'The Infinite Plaza, Plot 4, Oyetubo Street, Off Obafemi Awolowo Way, Ikeja, Lagos',
      name_of_pfa: 'Crusader Sterling Pensions Ltd',
      type_of_outlet: 'Branch',
      record_keeping: 'On-line System to Head Office',
      group_pension: 'Yes',
      investment_product: 'Yes',
      other_financial_service: '',
    };
    doc_store.business_process = 'pension_fund_admin';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.pfaLocationsPipeline();
    expect(logSpy).toBeCalledWith('PFA LOCATION SEEDED');
  });

  // /************
  //  *
  //  *
  //  *
  //  * INSURANCE
  //  */

  it('should create Count Document for INSURANCE if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.insurancePipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move INSURANCE to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 5.03057,
      latitude: 7.93417,
      regulating_body: 'NAICOM',
      category: 'Insurance company',
      state: 'AKWA IBOM STATE',
      state_code: 'akwa_ibom',
      lga: 'Uyo',
      address: '12 Nwaniba Road, Uyo.',
      name: 'Nicon Insurance Limited',
      type_of_outlet: 'Branch',
      record_keeping: 'On-line System to Head Office',
      property: 'Yes',
      life: 'Yes',
      health: 'No',
      micro_insurance: 'No',
      re_insurance: 'No',
      other_financial_services: '',
    };
    doc_store.business_process = 'insurance';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.insurancePipeline();
    expect(logSpy).toBeCalledWith('INSURANCE SEEDED');
  });

  /************
   *
   *
   *
   * Microfinance Locations Pipeline
   */

  it('should create Count Document for MFB LOCATION if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mfbPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move MFB LOCATION to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 5.53408,
      latitude: 7.46504,
      category: 'Microfinance Institutions',
      state: 'ABIA STATE',
      state_code: 'abia',
      lga: 'Umuahia North',
      address: 'KILOMETER 3 UMUAHIA/OKIGWE ROAD',
      name_of_bank: 'ABIA ADP MULTI PURPOSE COOPERATIVE SOCIETY LIMITED',
      type_of_outlet: 'Head Office',
      record_keeping: 'Manually (log)',
      account_opening: 'Yes',
      personal_loans: 'Yes',
      business_loans: 'Yes',
      savings: 'Yes',
      transfers: 'No',
      payment: 'Yes',
      other_financial_services: 'FISHERY,POULTRY,EMPOWERMENT',
    };
    doc_store.business_process = 'mfb_locations';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mfbPipeline();
    expect(logSpy).toBeCalledWith('MFB LOCATION SEEDED');
  });

  /************
   *
   *
   *
   * CommercialBanks Locations Pipeline
   */

  it('should create Count Document for CMB LOCATION if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.cmbPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move CMB LOCATION to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 6.45484,
      latitude: 3.38633,
      category: 'Commercial Bank',
      state: 'LAGOS STATE',
      state_code: 'lagos',
      lga: 'Lagos Island',
      address: 'Broad Street, Lagos Island',
      name_of_bank: 'Enterprise Bank',
      no_of_atms: 2,
      type_of_outlet: 'Branch',
      account_opening: 'Yes',
      personal_loans: 'No',
      business_loans: 'No',
      savings: 'Yes',
      transfers: 'Yes',
      payment: 'No',
      other_financial_services: '',
    };
    doc_store.business_process = 'cmb_locations';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.cmbPipeline();
    expect(logSpy).toBeCalledWith('CMB LOCATION SEEDED');
  });

  /************
   *
   *
   *
   * MortgageBank Pipeline
   */

  it('should create Count Document for MortgageBank if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mortgagePipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move MortgageBank to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 7.25741,
      latitude: 5.18087,
      category: 'Primary Mortgage Banks',
      state: 'ONDO STATE',
      state_code: 'ondo',
      lga: 'Akure South',
      address: '85, Oyemekun Bye Pass Junction Akure.',
      name_of_bank: 'UNION HOMES SAVINGS AND LOAN.',
      record_keeping: 'Independant Computer',
      type_of_outlet: 'Branch',
      sme_finance: 'Yes',
      mortgage_finance: 'Yes',
      infrastructure_finance: 'Yes',
      savings: 'Yes',
      transfers: 'Yes',
      consumer_credit: 'Yes',
      other_financial_services: '',
    };
    doc_store.business_process = 'mortgage_banks';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mortgagePipeline();
    expect(logSpy).toBeCalledWith('MORTGAGE SEEDED');
  });

  /************
   *
   *
   *
   * DFI Pipeline
   */

  it('should create Count Document for DFI if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.dfiPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move DFI to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 5.53314,
      latitude: 7.48909,
      category: 'Development Finance Institution',
      state: 'ABIA STATE',
      state_code: 'abia',
      lga: 'Umuahia North',
      address: '5/7, Nsukka Street, Umuahia',
      name: 'Bank of Agriculture Limited',
      record_keeping: 'On-line System to Head Office',
      type_of_outlet: 'Branch',
      sme_finance: 'Yes',
      mortgage_finance: 'No',
      infrastructure_finance: 'No',
      agricultural_finance: 'Yes',
      export_import_finance: 'No',
      other_financial_services: '',
    };
    doc_store.business_process = 'development_finance_institution';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.dfiPipeline();
    expect(logSpy).toBeCalledWith('DFI SEEDED');
  });

  /************
   *
   *
   *
   * MMO Pipeline
   */

  it('should create Count Document for MMO if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mmoPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move MMO to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 6.59729,
      latitude: 3.34138,
      category: 'Mobile Money Agent',
      state: 'LAGOS STATE',
      state_code: 'lagos',
      lga: 'Ikeja',
      address: '33, Obafemi Awolowo Way Ikeja',
      name_of_agent: 'Lakemfa Technologies Limited',
      type_of_outlet: 'Agent',
      record_keeping: 'None',
      name_of_establishment: 'Firstmonie',
      standalone_business: 'Stand Alone',
      other_business_conducted: '',
      mmo: 'Ecobank Nigeria Plc - Ecobank Mobile Money',
      average_number_of_deposits_per_week: '0 - 25 Deposits',
      average_number_of_withdrawals_per_week: '0 - 25 Withdrawals',
    };
    doc_store.business_process = 'mmo';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.mmoPipeline();
    expect(logSpy).toBeCalledWith('MMO SEEDED');
  });

  /************
   *
   *
   *
   * BDC Pipeline
   */

  it('should create Count Document for BDC if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.bdcPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move BDC to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 7.03038,
      latitude: 5.48757,
      category: 'Bureau de Change',
      state: 'IMO STATE',
      state_code: 'imo',
      lga: 'Owerri-Urban (Owerri)',
      address: '7 Douglas Road Owerri',
      name: 'Africom Nigeria',
      type_of_outlet: 'Head Office',
      record_keeping: 'Manually (log)',
      average_number_of_transactions_per_week: '0 - 25',
      money_transfer: 'No',
      currency_exchange: 'Yes',
    };
    doc_store.business_process = 'bdc';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.bdcPipeline();
    expect(logSpy).toBeCalledWith('BDC SEEDED');
  });

  /************
   *
   *
   *
   * SEC Pipeline
   */

  it('should create Count Document for SEC if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.secPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move SEC to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      longitude: 4.53556,
      latitude: 7.76311,
      category: 'Issuing Houses',
      state: 'OSUN STATE',
      state_code: 'osun',
      lga: 'Osogbo',
      address: 'Ground Floor Suite, No 60 Km 5, Gbongan Ibadan Road Osogbo.',
      regulating_body: 'Securities Exchange Commission',
      name: 'Unicapital Plc',
      type_of_outlet: 'Branch',
      stock_brokering: 'No',
      investment_banking: 'Yes',
      investment_advising: 'Yes',
      fund_managing: 'Yes',
      collective_investment_schemes: 'Yes',
      rating_agencies: 'No',
      custodians: 'Yes',
      record_keeping: 'On-line System to Head Office',
      other_services: '',
    };
    doc_store.business_process = 'sec';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.secPipeline();
    expect(logSpy).toBeCalledWith('SEC SEEDED');
  });

  /************
   *
   *
   *
   * COMPLAINT CATEGORY Pipeline
   */

  it('should create Count Document for COMPLAINT Category if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.complaintCategory();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move COMPLAINT Category to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      category: 'NEFT',
      description: 'NEFT (NEFT)',
    };
    doc_store.business_process = 'complaint_category';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.complaintCategory();
    expect(logSpy).toBeCalledWith('COMPLAINT CATEGORY SEEDED');
  });

  /************
   *
   *
   *
   * COMPLAINT Pipeline
   */

  it('should create Count Document for COMPLAINT if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.complaintPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move COMPLAINT to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      account_currency: 'NGN',
      amount_in_dispute: 2100,
      branch_name: '',
      city: '',
      complaint_category: 'POS',
      complaint_description: 'CUSTOMER CALLD FOR FEEDBACK ON EXISTING SR AND CALL DROPPED',
      complaint_subject: 'POS WRONG DEBIT',
      country: 'NG',
      date_closed: '2018-12-17T00:00:00.000Z',
      date_received: '2018-12-17T00:00:00.000Z',
      tracking_reference_no: '1-2033696318541',
      state: 'LA',
      status: 'Ongoing',
    };
    doc_store.business_process = 'complaint';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.complaintPipeline();
    expect(logSpy).toBeCalledWith('COMPLAINT SEEDED!!!');
  });

  /************
   *
   *
   *
   * FRAUD Pipeline
   */

  it('should create Count Document for FRAUD if missing', async () => {
    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.fraudPipeline();
    expect(logSpy).toBeCalledWith('COUNT CREATED');
  });

  it('it should move FRAUD to MongoDB print a success message on the console', async () => {
    jest.setTimeout(10000);
    const doc_store = new DocumentStore();

    doc_store.file_content = {
      amount_involved: 5400,
      complaint_category: 'POS',
      date_created: '2018-12-17T00:00:00.000Z',
      date_reported: '2018-12-17T00:00:00.000Z',
      desc_of_transaction: 'The agent is suspected to have committed fraud',
      agent_code: 'AA094563782',
      status: 'Ongoing',
      comment: '',
    };
    doc_store.business_process = 'fraud';
    doc_store.creation_date = new Date();

    await docStoreRepository.save(doc_store);

    const check = { schedule: jest.fn() };
    const logSpy = jest.spyOn(console, 'log');
    check.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    await DocumentStoreController.fraudPipeline();
    expect(logSpy).toBeCalledWith('FRAUD SEEDED!!!');
  });
});
