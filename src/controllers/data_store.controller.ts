import { Request, Response } from 'express';
import cron from 'node-cron';
import { getRepository } from 'typeorm';
import MMOTransaction from '../models/mmo_transactions.model';
import MFBTransaction from '../models/mfb_transactions.model';
import { IMMOTransaction, IMmoTransactionType } from '../interfaces/mmo_transactions.interface';
import { IMFBTransaction } from '../interfaces/mfb_transactions.interface';
import DocCount from '../models/doc_count.model';
import { IDocCount, ICountCategory } from '../interfaces/doc_count.interface';
import { BUSINESS_PROCESSES } from '../lib/constants';
import DocumentStore from '../Entities/document_store';
import State from '../models/state.model';
import Lga from '../models/lga.model';
const states = require('../data/states_lga.json');
import utils from '../lib';

class DocumentStoreController {
  public static createData = async (req: Request, res: Response) => {
    const { file_content, business_process } = req.body;

    const docStoreRepository = getRepository(DocumentStore);

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

  /*********************
   * *******************
   * *******************
   * *******************
   *
   * Seed State / Lga
   *
   *
   */

  public static statesLga = async () => {
    try {
      Promise.all(
        states.map(async (x: any) => {
          try {
            let state = await State.findOne({ name: x.state });
            if (!state) {
              state = await State.create({ name: x.state });
              let lgas = x.lgas.map((s: any) => ({
                name: s,
                state: state?._id,
              }));
              await Lga.create(...lgas);
              console.log(`Lgas for ${x.state} created`);
            } else {
              console.log("States and LGA's seeded");
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

  /*********************
   * *******************
   * *******************
   * *******************
   *
   * MMO Transaction Pipeline
   *
   *
   */

  public static mmoTransactionPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore);

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
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkStore.length) {
          checkStore.forEach(async (e: any) => {
            let key = `${e.file_content.transaction_type}/${e.file_content.month}/${e.file_content.year}/${e.file_content.value}/${e.file_content.volume}`;
            let getMMO: any = await MMOTransaction.findOne({ key: key });
            if (!getMMO) {
              let transactionType;
              if (e.file_content.transaction_type == 'Cardless Withdrawal') {
                transactionType = IMmoTransactionType.CARDLESS_WITHDRAWAL;
              }
              if (e.file_content.transaction_type == 'Airtime Payment') {
                transactionType = IMmoTransactionType.AIRTIME_PAYMENT;
              }
              if (e.file_content.transaction_type == 'Funds Transfer') {
                transactionType = IMmoTransactionType.FUNDS_TRANSFER;
              }
              console.log(e.file_content);
              console.log(transactionType);

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
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  /*********************
   * *******************
   * *******************
   * *******************
   *
   * MFB Transaction Pipeline
   *
   *
   */

  public static mfbTransactionPipeline = async () => {
    try {
      const docStoreRepository = getRepository(DocumentStore);

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
          // Update count
          await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
}

export default DocumentStoreController;

// Bank Cron Job
cron.schedule('*/5 * * * * *', async () => {
  DocumentStoreController.mmoTransactionPipeline();
  DocumentStoreController.mfbTransactionPipeline();
});
