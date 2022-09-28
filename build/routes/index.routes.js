"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var bank_routes_1 = __importDefault(require("./bank.routes"));
var transaction_routes_1 = __importDefault(require("./transaction.routes"));
var data_store_routes_1 = __importDefault(require("./data_store.routes"));
var router = express_1.default.Router();
/** Routes go here */
router.use('/bank', bank_routes_1.default);
router.use('/transaction', transaction_routes_1.default);
router.use('/datastore', data_store_routes_1.default);
module.exports = router;
//# sourceMappingURL=index.routes.js.map