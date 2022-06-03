import express from 'express';
import DataStoreController from '../controllers/data_store.controller';

const router = express.Router();

router.post('/create', DataStoreController.createData);
router.get('/mmo-trans-cron', DataStoreController.mmoTransactionPipeline);

export = router;
