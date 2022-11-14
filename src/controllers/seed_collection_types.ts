import cron from 'node-cron';
import CollectionType from '../models/collection_type.model';

// Collection Type List to be seeded
const CollectionList = [
  {
    old_id: 60,
    description: 'NIP Successful',
    category: 'NIP',
    success: true,
  },
  {
    old_id: 61,
    description: 'NIP Unsuccessful',
    category: 'NIP',
    success: false,
  },
  {
    old_id: 62,
    description: 'POS Successful',
    category: 'POS',
    success: true,
  },

  {
    old_id: 63,
    description: 'POS Unsuccessful',
    category: 'POS',
    success: false,
  },
];

const seedCollection = () => {
  try {
    CollectionList.forEach(async (collection) => {
      let checkCollectionType = await CollectionType.findOne({
        old_id: collection.old_id,
      });

      if (checkCollectionType) {
        console.log(
          `${checkCollectionType.category} ${checkCollectionType.success} already exists.`
        );
      } else {
        let savedCollectionType = await CollectionType.create(collection);
        console.log(`${savedCollectionType.category} ${savedCollectionType.success} created.`);
      }
    });
  } catch (err: any | Error | unknown) {
    console.log(err.message);
  }
};

export default seedCollection;
