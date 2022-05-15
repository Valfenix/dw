import express from 'express';
import DataStoreController from '../controllers/data_store.controller';

const router = express.Router();

router.post('/create', DataStoreController.createData);

export = router;
