import express from 'express';
import BankController from '../controllers/bank.controller';

const router = express.Router();

router.post('/create-pos', BankController.createPosBank);
router.post('/create-nip', BankController.createNipBank);
// router.get('/bank-cron', BankController.bankListPipeline);

export = router;
