import { Request, Response } from 'express';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import DocCount from '../models/doc_count.model';
import DailySummary from '../models/daily_summary';
import MonthlySummary from '../models/monthly_summary';
import YearlySummary from '../models/yearly_summary';
import { IDocCount, ICountCategory } from '../interfaces/doc_count.interface';
import { ICollectionType } from '../interfaces/collection_type.interface';
import CollectionType from '../models/collection_type.model';
import cron from 'node-cron';
import collection_type from '../Entities/collection_type';
import nfs_pos from '../Entities/nfs_pos';
import nfs_nip from '../Entities/nfs_nip';
import { IDailySummary } from '../interfaces/daily_summary.interface';
import { IMonthlySummary } from '../interfaces/monthly_summary.interface';
import { IYearlySummary } from '../interfaces/yearly_summary.interface';

class TransactionController {
  public static createCollectionType = async (req: Request, res: Response) => {
    const { code, description, category, success } = req.body;

    const collectionTypeSchema = Joi.object({
      code: Joi.number().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
    }).unknown();

    const { error } = collectionTypeSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const collectionTypeRepository = getRepository(collection_type, 'MYSQL');
    let checkCollectionType = await collectionTypeRepository.findOne({
      where: { code: code },
    });

    if (checkCollectionType) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: 'Collection type exists already',
      });
    }

    const collection = new collection_type();
    collection.code = code;
    collection.description = description;
    collection.category = category;
    collection.success = success;

    let result = await collectionTypeRepository.save(collection);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `Collection type created successfully`,
      data: result,
    });
  };

  public static createPosTransaction = async (req: Request, res: Response) => {
    const { CollectionType, TransactionDate, SourceBank, DestinationBank, Volumn, value_ } =
      req.body;

    const collectionTypeSchema = Joi.object({
      CollectionType: Joi.string().required(),
      SourceBank: Joi.string().required(),
      DestinationBank: Joi.string().required(),
      Volumn: Joi.number().required(),
      value_: Joi.number().required(),
    }).unknown();

    const { error } = collectionTypeSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const transactionPosRepository = getRepository(nfs_pos, 'MYSQL');
    let checkTransaction = await transactionPosRepository.findOne({
      where: { CollectionType: CollectionType, TransactionDate: TransactionDate },
    });

    if (checkTransaction) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: 'POS Transaction exists already',
      });
    }

    const transaction = new nfs_pos();

    transaction.CollectionType = CollectionType;
    transaction.TransactionDate = TransactionDate;
    transaction.SourceBank = SourceBank;
    transaction.DestinationBank = DestinationBank;
    transaction.Volumn = Volumn;
    transaction.value_ = value_;

    let result = await transactionPosRepository.save(transaction);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `POS Transaction created successfully`,
      data: result,
    });
  };

  public static createNipTransaction = async (req: Request, res: Response) => {
    const { CollectionType, TransactionDate, SourceBank, DestinationBank, Volumn, value_ } =
      req.body;

    const collectionTypeSchema = Joi.object({
      CollectionType: Joi.string().required(),
      SourceBank: Joi.string().required(),
      DestinationBank: Joi.string().required(),
      Volumn: Joi.number().required(),
      value_: Joi.number().required(),
    }).unknown();

    const { error } = collectionTypeSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const transactionNipRepository = getRepository(nfs_nip, 'MYSQL');
    let checkTransaction = await transactionNipRepository.findOne({
      where: { CollectionType: CollectionType, TransactionDate: TransactionDate },
    });

    if (checkTransaction) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: 'NIP Transaction exists already',
      });
    }

    const transaction = new nfs_nip();

    transaction.CollectionType = CollectionType;
    transaction.TransactionDate = TransactionDate;
    transaction.SourceBank = SourceBank;
    transaction.DestinationBank = DestinationBank;
    transaction.Volumn = Volumn;
    transaction.value_ = value_;

    let result = await transactionNipRepository.save(transaction);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `NIP Transaction created successfully`,
      data: result,
    });
  };

  public static collectionTypePipeline = async () => {
    try {
      const collectionTypeRepository = getRepository(collection_type, 'MYSQL');

      // Check count of documents in NIBSS MYSQL Database
      let checkCollectionType = await collectionTypeRepository.find();

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: ICountCategory.COLLECTION_TYPE });

      // If count is not null

      if (getCount !== null) {
        // If NIBSS data is more than the previous count, update

        if (checkCollectionType.length > getCount.count) {
          checkCollectionType.forEach(async (e: any) => {
            let result = await CollectionType.updateMany(
              { old_id: e.code },
              {
                $setOnInsert: {
                  old_id: e.code,
                  category: e.category,
                  success: e.success,
                  description: e.description,
                },
              },
              { upsert: true }
            );

            if (result.upsertedCount > 0) {
              await DocCount.findByIdAndUpdate(
                { _id: getCount._id },
                { count: checkCollectionType.length }
              );
            }
          });
          console.log('COLLECTION UPDATED');
        }
      } else {
        checkCollectionType.forEach(async (e: any) => {
          const collectionTypePayload: ICollectionType = {
            old_id: e.code,
            category: e.category,
            success: e.success,
            description: e.description,
          };
          await CollectionType.create(collectionTypePayload);
        });
        console.log('COLLECTION CREATED');
        const countPayload: IDocCount = {
          count: checkCollectionType.length,
          category: ICountCategory.COLLECTION_TYPE,
        };
        await DocCount.create(countPayload);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static posTransactionPipeline = async () => {
    try {
      const transactionPosRepository = getRepository(nfs_pos, 'MYSQL');

      // Check count of documents in CBN MYSQL Database
      let checkTransaction = await transactionPosRepository.find();

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.POS_TRANSACTION,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.POS_TRANSACTION,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkTransaction.length) {
          for (let i = 0; i < checkTransaction.length; i++) {
            let getCollectionType = await CollectionType.findOne({
              code: checkTransaction[i].CollectionType,
            });
            let collection_id = getCollectionType ? getCollectionType._id : null;

            // Daily Aggregate
            let getDailyMatch = await DailySummary.find({
              $and: [
                { day: checkTransaction[i].TransactionDate?.getDate() },
                { month: checkTransaction[i].TransactionDate?.getMonth() + 1 },
                { year: checkTransaction[i].TransactionDate?.getFullYear() },
                { collectionType: collection_id },
                { destination_bank: checkTransaction[i].DestinationBank },
              ],
            });

            if (getDailyMatch.length == 0) {
              const dailyTransactionPayload: IDailySummary = {
                collectionType: collection_id,
                source_bank: Number(checkTransaction[i].SourceBank),
                destination_bank: Number(checkTransaction[i].DestinationBank),
                transactionDate: checkTransaction[i].TransactionDate,
                day: String(checkTransaction[i].TransactionDate?.getDate()),
                month: String(checkTransaction[i].TransactionDate?.getMonth() + 1),
                year: String(checkTransaction[i].TransactionDate?.getFullYear()),
                value: checkTransaction[i].value_,
                volume: checkTransaction[i].Volumn,
              };
              await DailySummary.create(dailyTransactionPayload);
            } else if (getDailyMatch.length == 1) {
              await DailySummary.findOneAndUpdate(
                { _id: getDailyMatch[0]._id },
                {
                  $set: {
                    source_bank: checkTransaction[i].SourceBank,
                    destination_bank: getDailyMatch[0].destination_bank,
                    collectionType: getDailyMatch[0].collectionType,
                    day: getDailyMatch[0].day,
                    month: getDailyMatch[0].month,
                    year: getDailyMatch[0].year,
                    transactionDate: checkTransaction[i].TransactionDate,
                  },
                  $inc: {
                    volume: checkTransaction[i].Volumn,
                    value: checkTransaction[i].value_,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Monthly Aggregate
            let getMonthlyMatch = await MonthlySummary.find({
              $and: [
                { month: checkTransaction[i].TransactionDate?.getMonth() + 1 },
                { year: checkTransaction[i].TransactionDate?.getFullYear() },
                { collectionType: collection_id },
                { destination_bank: checkTransaction[i].DestinationBank },
              ],
            });

            if (getMonthlyMatch.length == 0) {
              const monthlyTransactionPayload: IMonthlySummary = {
                collectionType: collection_id,
                source_bank: Number(checkTransaction[i].SourceBank),
                destination_bank: Number(checkTransaction[i].DestinationBank),
                transactionDate: checkTransaction[i].TransactionDate,
                month: String(checkTransaction[i].TransactionDate?.getMonth() + 1),
                year: String(checkTransaction[i].TransactionDate?.getFullYear()),
                value: checkTransaction[i].value_,
                volume: checkTransaction[i].Volumn,
              };
              await MonthlySummary.create(monthlyTransactionPayload);
            } else if (getMonthlyMatch.length == 1) {
              await MonthlySummary.findOneAndUpdate(
                { _id: getMonthlyMatch[0]._id },
                {
                  $set: {
                    source_bank: checkTransaction[i].SourceBank,
                    destination_bank: getMonthlyMatch[0].destination_bank,
                    collectionType: getMonthlyMatch[0].collectionType,
                    month: getMonthlyMatch[0].month,
                    year: getMonthlyMatch[0].year,
                    transactionDate: checkTransaction[i].TransactionDate,
                  },
                  $inc: {
                    volume: checkTransaction[i].Volumn,
                    value: checkTransaction[i].value_,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Yearly Aggregate
            let getYearlyMatch = await YearlySummary.find({
              $and: [
                { year: checkTransaction[i].TransactionDate?.getFullYear() },
                { collectionType: collection_id },
                { destination_bank: checkTransaction[i].DestinationBank },
              ],
            });

            if (getYearlyMatch.length == 0) {
              const yearlyTransactionPayload: IYearlySummary = {
                collectionType: collection_id,
                source_bank: Number(checkTransaction[i].SourceBank),
                destination_bank: Number(checkTransaction[i].DestinationBank),
                transactionDate: checkTransaction[i].TransactionDate,
                year: String(checkTransaction[i].TransactionDate?.getFullYear()),
                value: checkTransaction[i].value_,
                volume: checkTransaction[i].Volumn,
              };
              await YearlySummary.create(yearlyTransactionPayload);
            } else if (getYearlyMatch.length == 1) {
              await YearlySummary.findOneAndUpdate(
                { _id: getYearlyMatch[0]._id },
                {
                  $set: {
                    source_bank: checkTransaction[i].SourceBank,
                    destination_bank: getYearlyMatch[0].destination_bank,
                    collectionType: getYearlyMatch[0].collectionType,
                    year: getYearlyMatch[0].year,
                    transactionDate: checkTransaction[i].TransactionDate,
                  },
                  $inc: {
                    volume: checkTransaction[i].Volumn,
                    value: checkTransaction[i].value_,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            if (checkTransaction.length - 1 === i) {
              console.log('POS SUMMARY SEEDED');

              // Update count
              await DocCount.findByIdAndUpdate(
                { _id: getCount._id },
                { count: checkTransaction.length }
              );
            }
          }
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static nipTransactionPipeline = async () => {
    try {
      const transactionNipRepository = getRepository(nfs_nip, 'MYSQL');

      // Check count of documents in CBN MYSQL Database
      let checkTransaction = await transactionNipRepository.find();

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({
        category: ICountCategory.NIP_TRANSACTION,
      });

      // Check if count document exist
      if (!getCount) {
        const countPayload: IDocCount = {
          count: 0,
          category: ICountCategory.NIP_TRANSACTION,
        };
        await DocCount.create(countPayload);
        console.log('COUNT CREATED');
      }

      if (getCount) {
        // Compare last count to current document count
        if (getCount.count < checkTransaction.length) {
          for (let i = 0; i < checkTransaction.length; i++) {
            let getCollectionType = await CollectionType.findOne({
              code: checkTransaction[i].CollectionType,
            });
            let collection_id = getCollectionType ? getCollectionType._id : null;

            // Daily Aggregate
            let getDailyMatch = await DailySummary.find({
              $and: [
                { day: checkTransaction[i].TransactionDate?.getDate() },
                { month: checkTransaction[i].TransactionDate?.getMonth() + 1 },
                { year: checkTransaction[i].TransactionDate?.getFullYear() },
                { collectionType: collection_id },
                { destination_bank: checkTransaction[i].DestinationBank },
              ],
            });

            if (getDailyMatch.length == 0) {
              const dailyTransactionPayload: IDailySummary = {
                collectionType: collection_id,
                source_bank: Number(checkTransaction[i].SourceBank),
                destination_bank: Number(checkTransaction[i].DestinationBank),
                transactionDate: checkTransaction[i].TransactionDate,
                day: String(checkTransaction[i].TransactionDate?.getDate()),
                month: String(checkTransaction[i].TransactionDate?.getMonth() + 1),
                year: String(checkTransaction[i].TransactionDate?.getFullYear()),
                value: checkTransaction[i].value_,
                volume: checkTransaction[i].Volumn,
              };
              await DailySummary.create(dailyTransactionPayload);
            } else if (getDailyMatch.length == 1) {
              await DailySummary.findOneAndUpdate(
                { _id: getDailyMatch[0]._id },
                {
                  $set: {
                    source_bank: checkTransaction[i].SourceBank,
                    destination_bank: getDailyMatch[0].destination_bank,
                    collectionType: getDailyMatch[0].collectionType,
                    day: getDailyMatch[0].day,
                    month: getDailyMatch[0].month,
                    year: getDailyMatch[0].year,
                    transactionDate: checkTransaction[i].TransactionDate,
                  },
                  $inc: {
                    volume: checkTransaction[i].Volumn,
                    value: checkTransaction[i].value_,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Monthly Aggregate
            let getMonthlyMatch = await MonthlySummary.find({
              $and: [
                { month: checkTransaction[i].TransactionDate?.getMonth() + 1 },
                { year: checkTransaction[i].TransactionDate?.getFullYear() },
                { collectionType: collection_id },
                { destination_bank: checkTransaction[i].DestinationBank },
              ],
            });

            if (getMonthlyMatch.length == 0) {
              const monthlyTransactionPayload: IMonthlySummary = {
                collectionType: collection_id,
                source_bank: Number(checkTransaction[i].SourceBank),
                destination_bank: Number(checkTransaction[i].DestinationBank),
                transactionDate: checkTransaction[i].TransactionDate,
                month: String(checkTransaction[i].TransactionDate?.getMonth() + 1),
                year: String(checkTransaction[i].TransactionDate?.getFullYear()),
                value: checkTransaction[i].value_,
                volume: checkTransaction[i].Volumn,
              };
              await MonthlySummary.create(monthlyTransactionPayload);
            } else if (getMonthlyMatch.length == 1) {
              await MonthlySummary.findOneAndUpdate(
                { _id: getMonthlyMatch[0]._id },
                {
                  $set: {
                    source_bank: checkTransaction[i].SourceBank,
                    destination_bank: getMonthlyMatch[0].destination_bank,
                    collectionType: getMonthlyMatch[0].collectionType,
                    month: getMonthlyMatch[0].month,
                    year: getMonthlyMatch[0].year,
                    transactionDate: checkTransaction[i].TransactionDate,
                  },
                  $inc: {
                    volume: checkTransaction[i].Volumn,
                    value: checkTransaction[i].value_,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            // Yearly Aggregate
            let getYearlyMatch = await YearlySummary.find({
              $and: [
                { year: checkTransaction[i].TransactionDate?.getFullYear() },
                { collectionType: collection_id },
                { destination_bank: checkTransaction[i].DestinationBank },
              ],
            });

            if (getYearlyMatch.length == 0) {
              const yearlyTransactionPayload: IYearlySummary = {
                collectionType: collection_id,
                source_bank: Number(checkTransaction[i].SourceBank),
                destination_bank: Number(checkTransaction[i].DestinationBank),
                transactionDate: checkTransaction[i].TransactionDate,
                year: String(checkTransaction[i].TransactionDate?.getFullYear()),
                value: checkTransaction[i].value_,
                volume: checkTransaction[i].Volumn,
              };
              await YearlySummary.create(yearlyTransactionPayload);
            } else if (getYearlyMatch.length == 1) {
              await YearlySummary.findOneAndUpdate(
                { _id: getYearlyMatch[0]._id },
                {
                  $set: {
                    source_bank: checkTransaction[i].SourceBank,
                    destination_bank: getYearlyMatch[0].destination_bank,
                    collectionType: getYearlyMatch[0].collectionType,
                    year: getYearlyMatch[0].year,
                    transactionDate: checkTransaction[i].TransactionDate,
                  },
                  $inc: {
                    volume: checkTransaction[i].Volumn,
                    value: checkTransaction[i].value_,
                  },
                },
                {
                  new: true,
                  upsert: true,
                }
              );
            }

            if (checkTransaction.length - 1 === i) {
              console.log('NIP SUMMARY SEEDED');

              // Update count
              await DocCount.findByIdAndUpdate(
                { _id: getCount._id },
                { count: checkTransaction.length }
              );
            }
          }
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
}

export default TransactionController;

// Collection Type Cron Job
cron.schedule('*/10 * * * * *', async () => {
  TransactionController.posTransactionPipeline();
  TransactionController.collectionTypePipeline();
});
