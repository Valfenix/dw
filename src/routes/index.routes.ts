import express from 'express';
import bank from './bank.routes';
import transaction from './transaction.routes';

const router = express.Router();

/** Routes go here */

router.use('/bank', bank);
router.use('/transaction', transaction);

export = router;
