import { Request, Response } from 'express';
import Joi from 'joi';
import { getRepository, getConnection } from 'typeorm';

import Bank from '../models/bank.model';
import { IBank } from '../interfaces/bank.interface';
import DocCount from '../models/doc_count.model';
import { IDocCount, ICountCategory } from '../interfaces/doc_count.interface';

import nfs_pos_bank_list from '../Entities/nfs_pos_bank_list';
import nfs_nip_bank_list from '../Entities/nfs_nip_bank_list';

class BankController {
  // public static createPosBank = async (req: Request, res: Response) => {
  //   const { bankname } = req.body;

  //   const bankSchema = Joi.object({
  //     bankname: Joi.string().required(),
  //   }).unknown();

  //   const { error } = bankSchema.validate({ ...req.body });

  //   if (error) {
  //     return res.status(400).json({
  //       success: false,
  //       statusCode: 400,
  //       message: error.details[0].message,
  //     });
  //   }

  //   const bankPosRepository = getRepository(nfs_pos_bank_list, 'UTILITYAPPDB');
  //   const bankNipRepository = getRepository(nfs_nip_bank_list, 'NIPDB');

  //   let checkPosBank = await bankPosRepository.findOne({
  //     where: { bank_code },
  //   });

  //   let checkNipBank = await bankNipRepository.findOne({
  //     where: { bank_code },
  //   });

  //   if (checkPosBank || checkNipBank) {
  //     return res.status(409).json({
  //       success: false,
  //       statusCode: 409,
  //       message: 'Bank exists already',
  //     });
  //   }

  //   const bank = new nfs_pos_bank_list();

  //   bank.bankname = bankname;

  //   let result = await bankPosRepository.save(bank);

  //   res.status(201).json({
  //     success: true,
  //     statusCode: 201,
  //     message: `Bank created successfully`,
  //     data: result,
  //   });
  // };

  // public static createNipBank = async (req: Request, res: Response) => {
  //   const { bankname, bank_code } = req.body;

  //   const bankSchema = Joi.object({
  //     bankname: Joi.string().required(),
  //     bank_code: Joi.number().required(),
  //     bank_category: Joi.string().required(),
  //   }).unknown();

  //   const { error } = bankSchema.validate({ ...req.body });

  //   if (error) {
  //     return res.status(400).json({
  //       success: false,
  //       statusCode: 400,
  //       message: error.details[0].message,
  //     });
  //   }

  //   const bankNipRepository = getRepository(nfs_nip_bank_list, 'NIPDB');
  //   const bankPosRepository = getRepository(nfs_pos_bank_list, 'UTILITYAPPDB');

  //   let checkNipBank = await bankNipRepository.findOne({
  //     where: { bank_code },
  //   });

  //   let checkPosBank = await bankPosRepository.findOne({
  //     where: { bank_code },
  //   });

  //   if (checkNipBank || checkPosBank) {
  //     return res.status(409).json({
  //       success: false,
  //       statusCode: 409,
  //       message: 'Bank exists already',
  //     });
  //   }

  //   const bank = new nfs_nip_bank_list();

  //   bank.bankname = bankname;
  //   // bank.bank_code = bank_code;
  //   // bank.bank_category = bank_category;

  //   let result = await bankNipRepository.save(bank);

  //   res.status(201).json({
  //     success: true,
  //     statusCode: 201,
  //     message: `Bank created successfully`,
  //     data: result,
  //   });
  // };

  public static bankListPipelinePos = async () => {
    try {
      const bankRepository = getRepository(nfs_pos_bank_list, 'UTILITYAPPDB');

      // Check count of documents in NIBSS MYSQL Database
      let checkBank = await bankRepository.find();

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: ICountCategory.BANK_POS });

      // If count is not null
      if (getCount !== null) {
        // If NIBSS data is more than the previous count, update

        if (checkBank.length > getCount.count) {
          checkBank.forEach(async (e: any) => {
            let result = await Bank.updateMany(
              { name: e.bankname },
              {
                $setOnInsert: {
                  name: e.bankname,
                  bank_code: e.id,
                  bank_category: 'DMB',
                },
              },
              { upsert: true }
            );

            if (result.upsertedCount > 0) {
              await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkBank.length });
            }
          });
          console.log('BANK UPDATED');
        }
      } else {
        checkBank.forEach(async (e: any) => {
          const bankPayload: IBank = {
            name: e.bankname,
            bank_code: e.id,
            bank_category: 'DMB',
          };
          await Bank.create(bankPayload);
        });

        const countPayload: IDocCount = {
          count: checkBank.length,
          category: ICountCategory.BANK_POS,
        };
        await DocCount.create(countPayload);

        console.log('POS BANK CREATED');
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  public static bankListPipelineNip = async () => {
    try {
      const bankRepository = getRepository(nfs_nip_bank_list, 'NIPDB');

      // Check count of documents in NIBSS MYSQL Database
      let checkBank = await bankRepository.find();

      // Get previous count data from MONGO Database
      let getCount: any = await DocCount.findOne({ category: ICountCategory.BANK_NIP });

      // If count is not null
      if (getCount !== null) {
        // If NIBSS data is more than the previous count, update

        if (checkBank.length > getCount.count) {
          checkBank.forEach(async (e: any) => {
            let result = await Bank.updateMany(
              { name: e.bankname },
              {
                $setOnInsert: {
                  name: e.bankname,
                  bank_code: e.id,
                  bank_category: 'DMB',
                },
              },
              { upsert: true }
            );

            if (result.upsertedCount > 0) {
              await DocCount.findByIdAndUpdate({ _id: getCount._id }, { count: checkBank.length });
            }
          });
          console.log('NIP BANK UPDATED');
        }
        console.log('Banks');
      } else {
        checkBank.forEach(async (e: any) => {
          const bankPayload: IBank = {
            name: e.bankname,
            bank_code: e.id,
            bank_category: 'DMB',
          };
          await Bank.create(bankPayload);
        });

        const countPayload: IDocCount = {
          count: checkBank.length,
          category: ICountCategory.BANK_NIP,
        };
        await DocCount.create(countPayload);

        console.log('NIP BANK CREATED');
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
}

export default BankController;
