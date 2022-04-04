import express from 'express';
import TransactionController from '../controllers/transaction.controller';

const router = express.Router();

router.post('/create-collection', TransactionController.createCollectionType);

export = router;
