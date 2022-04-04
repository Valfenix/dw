import express from 'express';
import BankController from '../controllers/bank.controller';

const router = express.Router();

router.post('/create', BankController.createBank);

export = router;
