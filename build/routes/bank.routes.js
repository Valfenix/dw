"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var bank_controller_1 = __importDefault(require("../controllers/bank.controller"));
var router = express_1.default.Router();
router.post('/create-pos', bank_controller_1.default.createPosBank);
router.post('/create-nip', bank_controller_1.default.createNipBank);
module.exports = router;
//# sourceMappingURL=bank.routes.js.map