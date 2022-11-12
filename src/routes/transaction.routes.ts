import express from 'express';
import TransactionController from '../controllers/transaction.controller';

const router = express.Router();

// router.post('/create-collection', TransactionController.createCollectionType);
router.post('/create-pos-transaction', TransactionController.createPosTransaction);
router.post('/create-nip-transaction', TransactionController.createNipTransaction);

export = router;
