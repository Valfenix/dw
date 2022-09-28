"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var data_store_controller_1 = __importDefault(require("../controllers/data_store.controller"));
var router = express_1.default.Router();
router.post('/create', data_store_controller_1.default.createData);
router.get('/mmo-trans-cron', data_store_controller_1.default.mmoTransactionPipeline);
module.exports = router;
//# sourceMappingURL=data_store.routes.js.map