import { Request, Response } from 'express';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import Bank from '../models/bank.model';
import { IBank } from '../interfaces/bank.interface';
import DocCount from '../models/doc_count.model';
import { IDocCount } from '../interfaces/doc_count.interface';
import cron from 'node-cron';
import nfs_pos_bank_list from '../Entities/nfs_pos_bank_list';

class BankController {
  public static createBank = async (req: Request, res: Response) => {
    const { bankname, bank_code, bank_category } = req.body;

    const bankSchema = Joi.object({
      bankname: Joi.string().required(),
      bank_code: Joi.number().required(),
      bank_category: Joi.string().required(),
    }).unknown();

    const { error } = bankSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const bankRepository = getRepository(nfs_pos_bank_list);
    let checkBank = await bankRepository.findOne({
      where: { bank_code },
    });

    if (checkBank) {
      return res.status(400).json({
        success: false,
        statusCode: 409,
        message: 'Bank exists already',
      });
    }

    const bank = new nfs_pos_bank_list();

    bank.bankname = bankname;
    bank.bank_code = bank_code;
    bank.bank_category = bank_category;

    let result = await bankRepository.save(bank);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `Bank created successfully`,
      data: result,
    });
  };

  /*********************
   * *******************
   * *******************
   * *******************
   *
   * Bank Pipeline
   *
   *
   */

  public static bankListPipeline = async () => {
    try {
      const bankRepository = getRepository(nfs_pos_bank_list);

      // Check count of documents in NIBSS MYSQL Database
      let checkBank = await bankRepository.find();

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: 'bank' });

      // If count is not null

      if (getCount !== null) {
        // If NIBSS data is more than the previous count, update

        if (checkBank.length > getCount.count) {
          checkBank.forEach(async (e: any) => {
            let result = await Bank.updateMany(
              { bank_code: e.bank_code },
              {
                $setOnInsert: {
                  name: e.bankname,
                  bank_code: e.bank_code,
                  bank_category: e.bank_category,
                },
              },
              { upsert: true }
            );

            if (result.upsertedCount > 0) {
              await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkBank.length });
            }
          });
        }
      } else {
        checkBank.forEach(async (e: any) => {
          const bankPayload: IBank = {
            name: e.bankname,
            bank_code: e.bank_code,
            bank_category: e.bank_category,
          };
          await Bank.create(bankPayload);
        });
        const countPayload: IDocCount = {
          count: checkBank.length,
          category: 'bank',
        };
        await DocCount.create(countPayload);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
}

export default BankController;

// Bank Cron Job
cron.schedule('*/10 * * * * *', async () => {
  BankController.bankListPipeline();
});
