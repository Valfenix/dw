import { Request, Response } from 'express';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import DocCount from '../models/doc_count.model';
import { IDocCount, ICountCategory } from '../interfaces/doc_count.interface';
import { ICollectionType } from '../interfaces/collection_type.interface';
import CollectionType from '../models/collection_type.model';
import cron from 'node-cron';
import collection_type from '../Entities/collection_type';

class TransactionController {
  public static createCollectionType = async (req: Request, res: Response) => {
    const { description, category, success } = req.body;

    const collectionTypeSchema = Joi.object({
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

    const collectionTypeRepository = getRepository(collection_type);
    let checkCollectionType = await collectionTypeRepository.findOne({
      where: { category: category, success: success },
    });

    if (checkCollectionType) {
      return res.status(400).json({
        success: false,
        statusCode: 409,
        message: 'Collection type exists already',
      });
    }

    const collection = new collection_type();

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

  /*********************
   * *******************
   * *******************
   * *******************
   *
   * CollectionType Pipeline
   *
   *
   */

  public static collectionTypePipeline = async () => {
    try {
      const collectionTypeRepository = getRepository(collection_type);

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
              { category: e.category, success: e.success },
              {
                $setOnInsert: {
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
        }
      } else {
        checkCollectionType.forEach(async (e: any) => {
          const collectionTypePayload: ICollectionType = {
            category: e.category,
            success: e.success,
            description: e.description,
          };
          await CollectionType.create(collectionTypePayload);
        });
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
}

export default TransactionController;

// Collection Type Cron Job
cron.schedule('*/10 * * * * *', async () => {
  TransactionController.collectionTypePipeline();
});
