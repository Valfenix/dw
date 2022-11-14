"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var bank_model_1 = __importDefault(require("../models/bank.model"));
var doc_count_model_1 = __importDefault(require("../models/doc_count.model"));
var doc_count_interface_1 = require("../interfaces/doc_count.interface");
var node_cron_1 = __importDefault(require("node-cron"));
var nfs_pos_bank_list_1 = __importDefault(require("../Entities/nfs_pos_bank_list"));
var nfs_nip_bank_list_1 = __importDefault(require("../Entities/nfs_nip_bank_list"));
var BankController = /** @class */ (function () {
    function BankController() {
    }
    var _a;
    _a = BankController;
    // public static createPosBank = async (req: Request, res: Response) => {
    //   const { bankname } = req.body;
    //   const bankSchema = Joi.object({
    //     bankname: Joi.string().required(),
    //   }).unknown();
    //   const { error } = bankSchema.validate({ ...req.body });
    //   if (error) {
    //     return res.status(400).json({
    //       success: false,
    //       statusCode: 400,
    //       message: error.details[0].message,
    //     });
    //   }
    //   const bankPosRepository = getRepository(nfs_pos_bank_list, 'UTILITYAPPDB');
    //   const bankNipRepository = getRepository(nfs_nip_bank_list, 'NIPDB');
    //   let checkPosBank = await bankPosRepository.findOne({
    //     where: { bank_code },
    //   });
    //   let checkNipBank = await bankNipRepository.findOne({
    //     where: { bank_code },
    //   });
    //   if (checkPosBank || checkNipBank) {
    //     return res.status(409).json({
    //       success: false,
    //       statusCode: 409,
    //       message: 'Bank exists already',
    //     });
    //   }
    //   const bank = new nfs_pos_bank_list();
    //   bank.bankname = bankname;
    //   let result = await bankPosRepository.save(bank);
    //   res.status(201).json({
    //     success: true,
    //     statusCode: 201,
    //     message: `Bank created successfully`,
    //     data: result,
    //   });
    // };
    // public static createNipBank = async (req: Request, res: Response) => {
    //   const { bankname, bank_code } = req.body;
    //   const bankSchema = Joi.object({
    //     bankname: Joi.string().required(),
    //     bank_code: Joi.number().required(),
    //     bank_category: Joi.string().required(),
    //   }).unknown();
    //   const { error } = bankSchema.validate({ ...req.body });
    //   if (error) {
    //     return res.status(400).json({
    //       success: false,
    //       statusCode: 400,
    //       message: error.details[0].message,
    //     });
    //   }
    //   const bankNipRepository = getRepository(nfs_nip_bank_list, 'NIPDB');
    //   const bankPosRepository = getRepository(nfs_pos_bank_list, 'UTILITYAPPDB');
    //   let checkNipBank = await bankNipRepository.findOne({
    //     where: { bank_code },
    //   });
    //   let checkPosBank = await bankPosRepository.findOne({
    //     where: { bank_code },
    //   });
    //   if (checkNipBank || checkPosBank) {
    //     return res.status(409).json({
    //       success: false,
    //       statusCode: 409,
    //       message: 'Bank exists already',
    //     });
    //   }
    //   const bank = new nfs_nip_bank_list();
    //   bank.bankname = bankname;
    //   // bank.bank_code = bank_code;
    //   // bank.bank_category = bank_category;
    //   let result = await bankNipRepository.save(bank);
    //   res.status(201).json({
    //     success: true,
    //     statusCode: 201,
    //     message: `Bank created successfully`,
    //     data: result,
    //   });
    // };
    BankController.bankListPipelinePos = function () { return __awaiter(void 0, void 0, void 0, function () {
        var bankRepository, checkBank_1, getCount_1, countPayload, err_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    bankRepository = (0, typeorm_1.getRepository)(nfs_pos_bank_list_1.default, 'UTILITYAPPDB');
                    return [4 /*yield*/, bankRepository.find()];
                case 1:
                    checkBank_1 = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({ category: doc_count_interface_1.ICountCategory.BANK_POS })];
                case 2:
                    getCount_1 = _b.sent();
                    if (!(getCount_1 !== null)) return [3 /*break*/, 3];
                    // If NIBSS data is more than the previous count, update
                    if (checkBank_1.length > getCount_1.count) {
                        checkBank_1.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, bank_model_1.default.updateMany({ name: e.bankname }, {
                                            $setOnInsert: {
                                                name: e.bankname,
                                                bank_code: e.id,
                                                bank_category: 'DMB',
                                            },
                                        }, { upsert: true })];
                                    case 1:
                                        result = _b.sent();
                                        if (!(result.upsertedCount > 0)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount_1._id }, { count: checkBank_1.length })];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        console.log('BANK UPDATED');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    checkBank_1.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var bankPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    bankPayload = {
                                        name: e.bankname,
                                        bank_code: e.id,
                                        bank_category: 'DMB',
                                    };
                                    return [4 /*yield*/, bank_model_1.default.create(bankPayload)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    countPayload = {
                        count: checkBank_1.length,
                        category: doc_count_interface_1.ICountCategory.BANK_POS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 4:
                    _b.sent();
                    console.log('POS BANK CREATED');
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.log(err_1.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    BankController.bankListPipelineNip = function () { return __awaiter(void 0, void 0, void 0, function () {
        var bankRepository, checkBank_2, getCount_2, countPayload, err_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    bankRepository = (0, typeorm_1.getRepository)(nfs_nip_bank_list_1.default, 'NIPDB');
                    return [4 /*yield*/, bankRepository.find()];
                case 1:
                    checkBank_2 = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({ category: doc_count_interface_1.ICountCategory.BANK_NIP })];
                case 2:
                    getCount_2 = _b.sent();
                    if (!(getCount_2 !== null)) return [3 /*break*/, 3];
                    // If NIBSS data is more than the previous count, update
                    if (checkBank_2.length > getCount_2.count) {
                        checkBank_2.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, bank_model_1.default.updateMany({ name: e.bankname }, {
                                            $setOnInsert: {
                                                name: e.bankname,
                                                bank_code: e.id,
                                                bank_category: 'DMB',
                                            },
                                        }, { upsert: true })];
                                    case 1:
                                        result = _b.sent();
                                        if (!(result.upsertedCount > 0)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount_2._id }, { count: checkBank_2.length })];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        console.log('NIP BANK UPDATED');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    checkBank_2.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var bankPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    bankPayload = {
                                        name: e.bankname,
                                        bank_code: e.id,
                                        bank_category: 'DMB',
                                    };
                                    return [4 /*yield*/, bank_model_1.default.create(bankPayload)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    countPayload = {
                        count: checkBank_2.length,
                        category: doc_count_interface_1.ICountCategory.BANK_NIP,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 4:
                    _b.sent();
                    console.log('NIP BANK CREATED');
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_2 = _b.sent();
                    console.log(err_2.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return BankController;
}());
exports.default = BankController;
// Bank Cron Job
node_cron_1.default.schedule(String(process.env.NIBSS_CRON), function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        BankController.bankListPipelinePos();
        BankController.bankListPipelineNip();
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=bank.controller.js.map