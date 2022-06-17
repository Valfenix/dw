import { Request, Response } from 'express';
import cron from 'node-cron';
import { getRepository, MoreThan, LessThan } from 'typeorm';
// import mongoose from 'mongoose';
import MMOTransaction from '../models/mmo_transactions.model';
import MFBTransaction from '../models/mfb_transactions.model';
import { IMMOTransaction, IMmoTransactionType } from '../interfaces/mmo_transactions.interface';
import { IMFBTransaction } from '../interfaces/mfb_transactions.interface';
import { IATM } from '../interfaces/atm.interface';
import DocCount from '../models/doc_count.model';
import { IDocCount, ICountCategory } from '../interfaces/doc_count.interface';
import { BUSINESS_PROCESSES } from '../lib/constants';
import DocumentStore from '../Entities/document_store';
import State from '../models/state.model';
import Lga from '../models/lga.model';
import ATM from '../models/atm.model';
import PensionFundAdmin from '../models/pension_fund_admin.model';
import BankAgent from '../models/bank_agents.model';
import InsuranceBank from '../models/insurance.model';
import MicrofinanceBank from '../models/mfb_locations.model';
import CommercialBank from '../models/cmb_locations.model';
import MortgageBank from '../models/mortgage.model';
import DevelopmentFinanceInstitution from '../models/development_finance_institution.model';
import MobileMoneyOperator from '../models/mmo.model';
import BureauDeChange from '../models/bureau_de_change.model';
import SecuritiesExchangeComm from '../models/sec.model';
import ComplaintCategory from '../models/complaint_category.model';
import Complaints from '../models/complaints.model';
import DailyComplaintSummary from '../models/daily_complaint_summary.model';
import MonthlyComplaintSummary from '../models/monthly_complaint_summary.model';
import YearlyComplaintSummary from '../models/yearly_complaint_summary.model';
import FraudTheftRobberies from '../models/fraud_theft_robbery.model';
import DailyFraudSummary from '../models/daily_fraud_summary.model';
import MonthlyFraudSummary from '../models/monthly_fraud_summary.model';
import YearlyFraudSummary from '../models/yearly_fraud_summary.model';
import { states } from './states_lga';
import utils from '../lib';
import { IBankAgents } from '../interfaces/bank_agents.interface';
import { IPFA } from '../interfaces/pension_fund_admin.interface';
import { IInsurance } from '../interfaces/insurance.interface';
import { IMfbLocations } from '../interfaces/mfb_locations.interface';
import { ICmbLocations } from '../interfaces/cmb_locations.interface';
import { IMortgageLocations } from '../interfaces/mortgage.interface';
import { IDfi } from '../interfaces/development_financial_institution.interface';
import { IMmo } from '../interfaces/mmo.interface';
import { IBdc } from '../interfaces/bureau_de_change.interface';
import { ISec } from '../interfaces/sec.interface';
import { IComplaintCategory } from '../interfaces/complaint_category.interface';
import { IComplaints } from '../interfaces/complaints.interface';
import { IDailyComplaints } from '../interfaces/daily_complaints.interface';
import { IMonthlyComplaints } from '../interfaces/monthly_complaints.interface';
import { IYearlyComplaints } from '../interfaces/yearly_complaints.interface';
import { IDailyFraud } from '../interfaces/daily_fraud.interface';
import { IFraud } from '../interfaces/fraud.interface';
import { IMonthlyFraud } from '../interfaces/monthly_fraud.interface';

class DocumentStoreController {
  public static createData = async (req: Request, res: Response) => {
    const { file_content, business_process } = req.body;

    const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

    const doc_store = new DocumentStore();

    doc_store.file_content = file_content;
    doc_store.business_process = business_process;
    doc_store.creation_date = new Date();

    let result = await docStoreRepository.save(doc_store);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `Doc store for ${business_process} created successfully`,
      data: result,
    });
  };

  public static statesLga = async () => {
    try {
      Promise.all(
        states.map(async (x: any) => {
          try {
            let state = await State.findOne({ alias: x.alias });
            if (!state) {
              state = await State.create({ name: x.state, alias: x.alias });
              let lgas = x.lgas.map((s: any) => ({
                name: s,
                state: state?._id,
              }));
              await Lga.create(...lgas);
              console.log(`Lgas for ${x.state} created`);
            } else {
              console.log("States and LGA's seeded already");
            }
          } catch (err: any) {
            console.log(err.message);
          }
        })
      );
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static mmoTransactionPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.MMO_TRANSACTIONS,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: ICountCategory.MMO_TRANSACTIONS });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.MMO_TRANSACTIONS,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      } else {
        if (getCount) {
          // Compare last count to current document count
          if (getCount.count < checkStore.length) {
            let result;
            checkStore.forEach(async (e: any) => {
              let key = `${e.file_content.transaction_type}/${e.file_content.month}/${e.file_content.year}/${e.file_content.value}/${e.file_content.volume}`;
              let getMMO: any = await MMOTransaction.findOne({ key: key });
              if (!getMMO) {
                let transactionType;
                if (e.file_content.transaction_type == 'Cardless Withdrawal') {
                  transactionType = IMmoTransactionType.CARDLESS_WITHDRAWAL;
                  console.log('Cardless Withdrawal');
                }
                if (e.file_content.transaction_type == 'Airtime Payment') {
                  transactionType = IMmoTransactionType.AIRTIME_PAYMENT;
                  console.log('Airtime Payment');
                }
                if (e.file_content.transaction_type == 'Funds Transfer') {
                  transactionType = IMmoTransactionType.FUNDS_TRANSFER;
                  console.log('Funds Transfer');
                }

                let month = await utils.convertMonthToNumber(e.file_content.month);

                const mmoTransactionPayload: IMMOTransaction = {
                  transaction_type: transactionType,
                  month: month,
                  year: e.file_content.year,
                  volume: e.file_content.volume,
                  value: e.file_content.value,
                  key: key,
                };
                await MMOTransaction.create(mmoTransactionPayload);
              }
            });
            console.log('MMO TRANSACTION SEEDED');
            // Update count
            await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
          }
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static mfbTransactionPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.MFB_TRANSACTIONS,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: ICountCategory.MFB_TRANSACTIONS });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.MFB_TRANSACTIONS,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.action}/${e.file_content.month}/${e.file_content.year}/${e.file_content.value}/${e.file_content.volume}/${e.file_content.state_key}`;
            let getMFB: any = await MFBTransaction.findOne({ key: key });
            if (!getMFB) {
              let month = await utils.convertMonthToNumber(e.file_content.month);

              const mfbTransactionPayload: IMFBTransaction = {
                action: e.file_content.action,
                month: month,
                year: e.file_content.year,
                volume: e.file_content.volume,
                value: e.file_content.value,
                state_key: e.file_content.state_key,
                state: e.file_content.state,
                key: key,
              };
              await MFBTransaction.create(mfbTransactionPayload);
            }
          });

          console.log('MFB TRANSACTION SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static atmLocationsPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.ATM_LOCATIONS,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: ICountCategory.ATM_LOCATIONS });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.ATM_LOCATIONS,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}`;
            let getATM: any = await ATM.findOne({ key: key });
            if (!getATM) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const atmPayload: IATM = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name,
                no_of_atm: e.file_content.no_of_atm,
                outlet_type: e.file_content.outlet_type,
                mastercard_accepted:
                  e.file_content.mastercard_accepted === 'Yes' ? 'true' : 'false',
                visa_accepted: e.file_content.visa_accepted === 'Yes' ? 'true' : 'false',
                quickteller_accepted:
                  e.file_content.quickteller_accepted === 'Yes' ? 'true' : 'false',
                verve_accepted: e.file_content.verve_accepted === 'Yes' ? 'true' : 'false',
                netcash_accepted: e.file_content.netcash_accepted === 'Yes' ? 'true' : 'false',
                deposit_accepted: e.file_content.deposit_accepted === 'Yes' ? 'true' : 'false',
                key: key,
              };
              await ATM.create(atmPayload);
            }
          });

          console.log('ATM LOCATION SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static bankAgentsLocationsPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.BANK_AGENTS_LOCATION,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.BANK_AGENTS_LOCATIONS,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.BANK_AGENTS_LOCATIONS,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name_of_agent}/${e.file_content.name_of_establishment}`;
            let getBankAgents: any = await BankAgent.findOne({ key: key });
            if (!getBankAgents) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const bankAgentPayload: IBankAgents = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_agent,
                no_of_atm: e.file_content.no_of_atm,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                establishment_name: e.file_content.name_of_establishment,
                standalone_business: e.file_content.standalone_business,
                other_business: e.file_content.other_business_conducted,
                bank: e.file_content.bank,
                average_weekly_deposit: e.file_content.average_number_of_deposits_per_week,
                average_weekly_withdrawal: e.file_content.average_number_of_withdrawals_per_week,
                key: key,
              };
              await BankAgent.create(bankAgentPayload);
            }
          });

          console.log('BANK AGENTS LOCATION SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static pfaLocationsPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.PENSION_FUND_ADMIN,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.PENSION_FUND_ADMIN,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.PENSION_FUND_ADMIN,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name_of_pfa}`;
            let getPfa: any = await PensionFundAdmin.findOne({ key: key });
            if (!getPfa) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const pfaPayload: IPFA = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                regulating_body: e.file_content.regulating_body,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_pfa,
                no_of_atm: e.file_content.no_of_atm,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                group_pension: e.file_content.group_pension === 'Yes' ? 'true' : 'false',
                investment_products:
                  e.file_content.investment_products === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await PensionFundAdmin.create(pfaPayload);
            }
          });

          console.log('PFA LOCATION SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static insurancePipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.INSURANCE,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.INSURANCE,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.INSURANCE,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name}`;
            let getInsurance: any = await InsuranceBank.findOne({ key: key });
            if (!getInsurance) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const insurancePayload: IInsurance = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                regulating_body: e.file_content.regulating_body,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_pfa,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                property: e.file_content.property === 'Yes' ? 'true' : 'false',
                life: e.file_content.life === 'Yes' ? 'true' : 'false',
                health: e.file_content.health === 'Yes' ? 'true' : 'false',
                micro_insurance: e.file_content.micro_insurance === 'Yes' ? 'true' : 'false',
                re_insurance: e.file_content.re_insurance === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await InsuranceBank.create(insurancePayload);
            }
          });

          console.log('INSURANCE SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static mfbPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.MFB_LOCATIONS,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.MFB_LOCATIONS,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.MFB_LOCATIONS,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name_of_bank}`;
            let getMFBLocations: any = await MicrofinanceBank.findOne({ key: key });
            if (!getMFBLocations) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const mfbPayload: IMfbLocations = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                category_code: 'MFB',
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                bank_name: e.file_content.name_of_bank,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                account_opening: e.file_content.account_opening === 'Yes' ? 'true' : 'false',
                personal_loan: e.file_content.personal_loans === 'Yes' ? 'true' : 'false',
                business_loan: e.file_content.business_loans === 'Yes' ? 'true' : 'false',
                savings: e.file_content.savings === 'Yes' ? 'true' : 'false',
                transfers: e.file_content.transfers === 'Yes' ? 'true' : 'false',
                payment: e.file_content.payment === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await MicrofinanceBank.create(mfbPayload);
            }
          });

          console.log('MFB LOCATION SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static cmbPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.CMB_LOCATIONS,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.CMB_LOCATIONS,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.CMB_LOCATIONS,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name_of_bank}`;
            let getMFBLocations: any = await CommercialBank.findOne({ key: key });
            if (!getMFBLocations) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const cmbPayload: ICmbLocations = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                category_code: 'DMB',
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_bank,
                no_of_atm: e.file_content.no_of_atms,
                outlet_type: e.file_content.type_of_outlet,
                account_opening: e.file_content.account_opening === 'Yes' ? 'true' : 'false',
                personal_loan: e.file_content.personal_loans === 'Yes' ? 'true' : 'false',
                business_loan: e.file_content.business_loans === 'Yes' ? 'true' : 'false',
                savings: e.file_content.savings === 'Yes' ? 'true' : 'false',
                transfers: e.file_content.transfers === 'Yes' ? 'true' : 'false',
                payment: e.file_content.payment === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await CommercialBank.create(cmbPayload);
            }
          });

          console.log('CMB LOCATION SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static mortgagePipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.MORTGAGE_BANKS,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.MORTGAGE_BANKS,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.MORTGAGE_BANKS,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name_of_bank}`;
            let getMortgageLocations: any = await MortgageBank.findOne({ key: key });
            if (!getMortgageLocations) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const cmbPayload: IMortgageLocations = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_bank,
                record_keeping: e.file_content.record_keeping,
                outlet_type: e.file_content.type_of_outlet,
                sme_finance: e.file_content.sme_finance === 'Yes' ? 'true' : 'false',
                deposits: e.file_content.deposits === 'Yes' ? 'true' : 'false',
                savings: e.file_content.savings === 'Yes' ? 'true' : 'false',
                transfers: e.file_content.transfers === 'Yes' ? 'true' : 'false',
                consumer_credit: e.file_content.consumer_credit === 'Yes' ? 'true' : 'false',
                infrastructure_finance:
                  e.file_content.infrastructure_finance === 'Yes' ? 'true' : 'false',
                mortgage_finance: e.file_content.mortgage_finance === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await MortgageBank.create(cmbPayload);
            }
          });

          console.log('MORTGAGE SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static dfiPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.DEVELOPMENT_FINANCE_INSTITUTION,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.DEVELOPMENT_FINANCE_INSTITUTION,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.DEVELOPMENT_FINANCE_INSTITUTION,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name}`;
            let getDfi: any = await DevelopmentFinanceInstitution.findOne({ key: key });
            if (!getDfi) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const cmbPayload: IDfi = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_bank,
                record_keeping: e.file_content.record_keeping,
                outlet_type: e.file_content.type_of_outlet,
                agricultural_finance:
                  e.file_content.agricultural_finance === 'Yes' ? 'true' : 'false',
                export_import_finance:
                  e.file_content.export_import_finance === 'Yes' ? 'true' : 'false',
                sme_finance: e.file_content.sme_finance === 'Yes' ? 'true' : 'false',
                infrastructure_finance:
                  e.file_content.infrastructure_finance === 'Yes' ? 'true' : 'false',
                mortgage_finance: e.file_content.mortgage_finance === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await DevelopmentFinanceInstitution.create(cmbPayload);
            }
          });

          console.log('DFI SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static mmoPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.MMO,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.MMO,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.MMO,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name_of_agent}/${e.file_content.name_of_establishment}`;
            let getMmo: any = await MobileMoneyOperator.findOne({ key: key });
            if (!getMmo) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const mmoPayload: IMmo = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name_of_agent,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                establishment_name: e.file_content.name_of_establishment,
                standalone_business: e.file_content.standalone_business,
                other_business: e.file_content.other_business_conducted,
                mmo_name: e.file_content.mmo,
                average_weekly_deposit: e.file_content.average_number_of_deposits_per_week,
                average_weekly_withdrawal: e.file_content.average_number_of_withdrawals_per_week,
                other_financial_services: e.file_content.other_financial_services,
                key: key,
              };
              await MobileMoneyOperator.create(mmoPayload);
            }
          });

          console.log('MMO SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static bdcPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.BDC,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.BDC,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.BDC,
        };
        await DocCount.create(countPayload);

        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name}`;
            let getBdc: any = await BureauDeChange.findOne({ key: key });
            if (!getBdc) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const bdcPayload: IBdc = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                money_transfer: e.file_content.money_transfer === 'Yes' ? 'true' : 'false',
                currency_exchange: e.file_content.currency_exchange === 'Yes' ? 'true' : 'false',
                average_transactions_per_week:
                  e.file_content.average_number_of_transactions_per_week,
                key: key,
              };
              await BureauDeChange.create(bdcPayload);
            }
          });

          console.log('BDC SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static secPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.SEC,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.SEC,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.SEC,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.longitude}/${e.file_content.latitude}/${e.file_content.state_code}/${e.file_content.lga}/${e.file_content.name}`;
            let getSec: any = await SecuritiesExchangeComm.findOne({ key: key });
            if (!getSec) {
              let st = await State.findOne({ alias: e.file_content.state_code });
              let lg = await Lga.findOne({ name: new RegExp(e.file_content.lga, 'i') });

              const secPayload: ISec = {
                longitude: e.file_content.longitude,
                latitude: e.file_content.latitude,
                category: e.file_content.category,
                state: st?._id!,
                alias: e.file_content.state_code,
                lga: lg?._id!,
                address: e.file_content.address,
                name: e.file_content.name,
                outlet_type: e.file_content.type_of_outlet,
                record_keeping: e.file_content.record_keeping,
                regulating_body: e.file_content.regulating_body,
                stock_brokering: e.file_content.stock_brokering === 'Yes' ? 'true' : 'false',
                investment_banking: e.file_content.investment_banking === 'Yes' ? 'true' : 'false',
                investment_advising:
                  e.file_content.investment_advising === 'Yes' ? 'true' : 'false',
                fund_managing: e.file_content.fund_managing === 'Yes' ? 'true' : 'false',
                collective_investment_schemes:
                  e.file_content.collective_investment_schemes === 'Yes' ? 'true' : 'false',
                rating_agencies: e.file_content.rating_agencies === 'Yes' ? 'true' : 'false',
                custodians: e.file_content.custodians === 'Yes' ? 'true' : 'false',
                other_financial_services: e.file_content.other_services,
                key: key,
              };
              await SecuritiesExchangeComm.create(secPayload);
            }
          });

          console.log('SEC SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static complaintCategory = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.COMPLAINT_CATEGORY,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.COMPLAINT_CATEGORY,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.COMPLAINT_CATEGORY,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let getCategory: any = await ComplaintCategory.findOne({
              category: e.file_content.category,
            });
            if (!getCategory) {
              const complaintCategoryPayload: IComplaintCategory = {
                category: e.file_content.category,
                description: e.file_content.description,
              };
              await ComplaintCategory.create(complaintCategoryPayload);
            }
          });

          console.log('COMPLAINT CATEGORY SEEDED');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static complaintPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore: any = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.COMPLAINT,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.COMPLAINT,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.COMPLAINT,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let complaintCategory = await ComplaintCategory.findOne({
              category: e.file_content.complaint_category,
            });

            const complaintPayload: IComplaints = {
              account_currency: e.file_content.account_currency,
              amount_in_dispute: e.file_content.amount_in_dispute,
              branch_name: e.file_content.branch_name,
              city: e.file_content.city,
              complaint_category: complaintCategory ? complaintCategory._id : null,
              complaint_description: e.file_content.complaint_description,
              complaint_subject: e.file_content.complaint_subject,
              country: e.file_content.country,
              date_closed: e.file_content.date_closed,
              date_received: e.file_content.date_received,
              tracking_reference_no: e.file_content.tracking_reference_no,
              state: e.file_content.state,
              status: e.file_content.status,
            };
            await Complaints.create(complaintPayload);
          });

          console.log('COMPLAINT SEEDED!');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });

          // Get data based on the time created
          // If the time created is higher than the count doc, we proceed
          let checkStoreLoop: any = await docStoreRepository.find({
            business_process: BUSINESS_PROCESSES.COMPLAINT,
            creation_date: MoreThan(getCount.updatedAt),
          });
          for (let i = 0; i < checkStoreLoop.length; i++) {
            let getCategory = await ComplaintCategory.findOne({
              category: checkStoreLoop[i].file_content.complaint_category,
            });

            let complaintCategory = getCategory ? getCategory._id : null;

            let date_received = new Date(checkStoreLoop[i].file_content.date_received);
            let amount_in_dispute = Number(checkStoreLoop[i].file_content.amount_in_dispute);

            // Daily Aggregate
            let getDailyMatch = await DailyComplaintSummary.find({
              $and: [
                { day: date_received?.getDate() },
                { month: date_received?.getMonth() + 1 },
                { year: date_received?.getFullYear() },
                { complaint_category: complaintCategory },
                { status: checkStoreLoop[i].file_content.status },
              ],
            });

            if (getDailyMatch.length == 0) {
              const dailyComplaintPayload: IDailyComplaints = {
                amount_in_dispute: amount_in_dispute,
                complaint_category: complaintCategory,
                day: String(date_received?.getDate()),
                month: String(date_received?.getMonth() + 1),
                year: String(date_received?.getFullYear()),
                date_received: date_received,
                status: checkStoreLoop[i].file_content.status,
              };
              await DailyComplaintSummary.create(dailyComplaintPayload);
            } else if (getDailyMatch.length == 1) {
              await DailyComplaintSummary.findOneAndUpdate(
                { _id: getDailyMatch[0]._id },
                {
                  $set: {
                    day: String(date_received?.getDate()),
                    month: String(date_received?.getMonth() + 1),
                    year: String(date_received?.getFullYear()),
                    date_received: date_received,
                    status: checkStoreLoop[i].file_content.status,
                  },
                  $inc: {
                    amount_in_dispute: amount_in_dispute,
                    count: 1,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Monthly Aggregate
            let getMonthlyMatch = await MonthlyComplaintSummary.find({
              $and: [
                { month: date_received?.getMonth() + 1 },
                { year: date_received?.getFullYear() },
                { complaint_category: complaintCategory },
                { status: checkStoreLoop[i].file_content.status },
              ],
            });

            if (getMonthlyMatch.length == 0) {
              const monthlyComplaintPayload: IMonthlyComplaints = {
                amount_in_dispute: amount_in_dispute,
                complaint_category: complaintCategory,
                month: String(date_received?.getMonth() + 1),
                year: String(date_received?.getFullYear()),
                date_received: date_received,
                status: checkStoreLoop[i].file_content.status,
              };
              await MonthlyComplaintSummary.create(monthlyComplaintPayload);
            } else if (getMonthlyMatch.length == 1) {
              await MonthlyComplaintSummary.findOneAndUpdate(
                { _id: getMonthlyMatch[0]._id },
                {
                  $set: {
                    month: String(date_received?.getMonth() + 1),
                    year: String(date_received?.getFullYear()),
                    date_received: date_received,
                    status: checkStoreLoop[i].file_content.status,
                  },
                  $inc: {
                    amount_in_dispute: amount_in_dispute,
                    count: 1,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Yearly Aggregate
            let getYearlyMatch = await YearlyComplaintSummary.find({
              $and: [
                { year: date_received?.getFullYear() },
                { complaint_category: complaintCategory },
                { status: checkStoreLoop[i].file_content.status },
              ],
            });

            if (getYearlyMatch.length == 0) {
              const yearlyComplaintPayload: IYearlyComplaints = {
                amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                complaint_category: complaintCategory,
                year: String(date_received?.getFullYear()),
                date_received: date_received,
                status: checkStoreLoop[i].file_content.status,
              };
              await YearlyComplaintSummary.create(yearlyComplaintPayload);
            } else if (getYearlyMatch.length == 1) {
              await YearlyComplaintSummary.findOneAndUpdate(
                { _id: getYearlyMatch[0]._id },
                {
                  $set: {
                    year: String(date_received?.getFullYear()),
                    date_received: date_received,
                    status: checkStoreLoop[i].file_content.status,
                  },
                  $inc: {
                    amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                    count: 1,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            if (checkStoreLoop.length - 1 === i) {
              console.log('COMPLAINT SEEDED!!!');

              // Update count
              await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
            }
          }
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static fraudPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore, 'POSTGRES');

      // Check count of documents in CBN MYSQL Database
      let checkStore: any = await docStoreRepository.find({
        business_process: BUSINESS_PROCESSES.FRAUD,
      });

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.FRAUD,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.FRAUD,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let complaintCategory = await ComplaintCategory.findOne({
              category: e.file_content.complaint_category,
            });

            const fraudPayload: IFraud = {
              amount_involved: e.file_content.amount_involved,
              complaint_category: complaintCategory ? complaintCategory._id : null,
              comment: e.file_content.comment,
              date_created: e.file_content.date_created,
              date_reported: e.file_content.date_reported,
              desc_of_transaction: e.file_content.desc_of_transaction,
              agent_code: e.file_content.agent_code,
              status: e.file_content.status,
            };
            await FraudTheftRobberies.create(fraudPayload);
          });

          console.log('FRAUD SEEDED!');
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });

          // Get data based on the time created
          // If the time created is higher than the count doc, we proceed
          let checkStoreLoop: any = await docStoreRepository.find({
            business_process: BUSINESS_PROCESSES.FRAUD,
            creation_date: MoreThan(getCount.updatedAt),
          });
          for (let i = 0; i < checkStoreLoop.length; i++) {
            let getCategory = await ComplaintCategory.findOne({
              category: checkStoreLoop[i].file_content.complaint_category,
            });

            let complaintCategory = getCategory ? getCategory._id : null;

            let date_reported = new Date(checkStoreLoop[i].file_content.date_reported);
            let amount_involved = Number(checkStoreLoop[i].file_content.amount_involved);

            // Daily Aggregate
            let getDailyMatch = await DailyFraudSummary.find({
              $and: [
                { day: date_reported?.getDate() },
                { month: date_reported?.getMonth() + 1 },
                { year: date_reported?.getFullYear() },
                { complaint_category: complaintCategory },
                { status: checkStoreLoop[i].file_content.status },
              ],
            });

            if (getDailyMatch.length == 0) {
              const dailyFraudPayload: IDailyFraud = {
                amount_involved: amount_involved,
                complaint_category: complaintCategory,
                day: String(date_reported?.getDate()),
                month: String(date_reported?.getMonth() + 1),
                year: String(date_reported?.getFullYear()),
                date_reported: date_reported,
                status: checkStoreLoop[i].file_content.status,
              };
              await DailyFraudSummary.create(dailyFraudPayload);
            } else if (getDailyMatch.length == 1) {
              await DailyComplaintSummary.findOneAndUpdate(
                { _id: getDailyMatch[0]._id },
                {
                  $set: {
                    day: String(date_reported?.getDate()),
                    month: String(date_reported?.getMonth() + 1),
                    year: String(date_reported?.getFullYear()),
                    date_received: date_reported,
                    status: checkStoreLoop[i].file_content.status,
                  },
                  $inc: {
                    amount_involved: amount_involved,
                    count: 1,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Monthly Aggregate
            let getMonthlyMatch = await MonthlyFraudSummary.find({
              $and: [
                { month: date_reported?.getMonth() + 1 },
                { year: date_reported?.getFullYear() },
                { complaint_category: complaintCategory },
                { status: checkStoreLoop[i].file_content.status },
              ],
            });

            if (getMonthlyMatch.length == 0) {
              const monthlyFraudPayload: IMonthlyFraud = {
                amount_involved: amount_involved,
                complaint_category: complaintCategory,
                month: String(date_reported?.getMonth() + 1),
                year: String(date_reported?.getFullYear()),
                date_reported: date_reported,
                status: checkStoreLoop[i].file_content.status,
              };
              await MonthlyComplaintSummary.create(monthlyFraudPayload);
            } else if (getMonthlyMatch.length == 1) {
              await MonthlyComplaintSummary.findOneAndUpdate(
                { _id: getMonthlyMatch[0]._id },
                {
                  $set: {
                    day: String(date_reported?.getDate()),
                    month: String(date_reported?.getMonth() + 1),
                    year: String(date_reported?.getFullYear()),
                    date_received: date_reported,
                    status: checkStoreLoop[i].file_content.status,
                  },
                  $inc: {
                    amount_involved: amount_involved,
                    count: 1,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Yearly Aggregate
            let getYearlyMatch = await YearlyComplaintSummary.find({
              $and: [
                { year: date_reported?.getFullYear() },
                { complaint_category: complaintCategory },
                { status: checkStoreLoop[i].file_content.status },
              ],
            });

            if (getYearlyMatch.length == 0) {
              const yearlyFraudPayload: IYearlyComplaints = {
                amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                complaint_category: complaintCategory,
                year: String(date_reported?.getFullYear()),
                date_received: date_reported,
                status: checkStoreLoop[i].file_content.status,
              };
              await YearlyComplaintSummary.create(yearlyFraudPayload);
            } else if (getYearlyMatch.length == 1) {
              await YearlyFraudSummary.findOneAndUpdate(
                { _id: getYearlyMatch[0]._id },
                {
                  $set: {
                    year: String(date_reported?.getFullYear()),
                    date_received: date_reported,
                    status: checkStoreLoop[i].file_content.status,
                  },
                  $inc: {
                    amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                    count: 1,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            if (checkStoreLoop.length - 1 === i) {
              console.log('FRAUD SEEDED!!!');

              // Update count
              await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
            }
          }
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
}

export default DocumentStoreController;

cron.schedule(String(process.env.CRON), async () => {
  DocumentStoreController.statesLga();
  DocumentStoreController.mmoTransactionPipeline();
  DocumentStoreController.mfbTransactionPipeline();
  DocumentStoreController.atmLocationsPipeline();
  DocumentStoreController.bankAgentsLocationsPipeline();
  DocumentStoreController.pfaLocationsPipeline();
  DocumentStoreController.insurancePipeline();
  DocumentStoreController.mfbPipeline();
  DocumentStoreController.cmbPipeline();
  DocumentStoreController.mortgagePipeline();
  DocumentStoreController.dfiPipeline();
  DocumentStoreController.mmoPipeline();
  DocumentStoreController.bdcPipeline();
  DocumentStoreController.secPipeline();
  DocumentStoreController.complaintCategory();
  DocumentStoreController.complaintPipeline();
  DocumentStoreController.fraudPipeline();
});
