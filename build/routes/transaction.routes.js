"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
var router = express_1.default.Router();
router.post('/create-collection', transaction_controller_1.default.createCollectionType);
router.post('/create-pos-transaction', transaction_controller_1.default.createPosTransaction);
router.post('/create-nip-transaction', transaction_controller_1.default.createNipTransaction);
module.exports = router;
//# sourceMappingURL=transaction.routes.js.map