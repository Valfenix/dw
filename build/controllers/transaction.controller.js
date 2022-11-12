"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var joi_1 = __importDefault(require("joi"));
var typeorm_1 = require("typeorm");
var doc_count_model_1 = __importDefault(require("../models/doc_count.model"));
var daily_summary_1 = __importDefault(require("../models/daily_summary"));
var monthly_summary_1 = __importDefault(require("../models/monthly_summary"));
var yearly_summary_1 = __importDefault(require("../models/yearly_summary"));
var doc_count_interface_1 = require("../interfaces/doc_count.interface");
var collection_type_model_1 = __importDefault(require("../models/collection_type.model"));
var node_cron_1 = __importDefault(require("node-cron"));
// import collection_type from '../Entities/collection_type';
var nfs_pos_1 = __importDefault(require("../Entities/nfs_pos"));
var nfs_nip_trans_1 = __importDefault(require("../Entities/nfs_nip_trans"));
var TransactionController = /** @class */ (function () {
    function TransactionController() {
    }
    var _a;
    _a = TransactionController;
    // public static createCollectionType = async (req: Request, res: Response) => {
    //   const { code, description, category, success } = req.body;
    //   const collectionTypeSchema = Joi.object({
    //     code: Joi.number().required(),
    //     description: Joi.string().required(),
    //     category: Joi.string().required(),
    //   }).unknown();
    //   const { error } = collectionTypeSchema.validate({ ...req.body });
    //   if (error) {
    //     return res.status(400).json({
    //       success: false,
    //       statusCode: 400,
    //       message: error.details[0].message,
    //     });
    //   }
    //   const collectionTypeRepository = getRepository(collection_type, 'UTILITYAPPDB');
    //   let checkCollectionType = await collectionTypeRepository.findOne({
    //     where: { code: code },
    //   });
    //   if (checkCollectionType) {
    //     return res.status(409).json({
    //       success: false,
    //       statusCode: 409,
    //       message: 'Collection type exists already',
    //     });
    //   }
    //   const collection = new collection_type();
    //   collection.code = code;
    //   collection.description = description;
    //   collection.category = category;
    //   collection.success = success;
    //   let result = await collectionTypeRepository.save(collection);
    //   res.status(201).json({
    //     success: true,
    //     statusCode: 201,
    //     message: `Collection type created successfully`,
    //     data: result,
    //   });
    // };
    TransactionController.createPosTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, CollectionType, TransactionDate, SourceBank, DestinationBank, Volumn, value_, collectionTypeSchema, error, transactionPosRepository, transaction, result;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, CollectionType = _b.CollectionType, TransactionDate = _b.TransactionDate, SourceBank = _b.SourceBank, DestinationBank = _b.DestinationBank, Volumn = _b.Volumn, value_ = _b.value_;
                    console.log(req.body);
                    collectionTypeSchema = joi_1.default.object({
                        CollectionType: joi_1.default.string().required(),
                        SourceBank: joi_1.default.string().required(),
                        DestinationBank: joi_1.default.string().required(),
                        Volumn: joi_1.default.number().required(),
                        value_: joi_1.default.number().required(),
                    }).unknown();
                    error = collectionTypeSchema.validate(__assign({}, req.body)).error;
                    if (error) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                statusCode: 400,
                                message: error.details[0].message,
                            })];
                    }
                    transactionPosRepository = (0, typeorm_1.getRepository)(nfs_pos_1.default, 'UTILITYAPPDB');
                    transaction = new nfs_pos_1.default();
                    transaction.CollectionType = CollectionType;
                    transaction.TransactionDate = new Date(TransactionDate);
                    transaction.SourceBank = SourceBank;
                    transaction.DestinationBank = DestinationBank;
                    transaction.Volumn = Volumn;
                    transaction.value_ = value_;
                    return [4 /*yield*/, transactionPosRepository.save(transaction)];
                case 1:
                    result = _c.sent();
                    res.status(201).json({
                        success: true,
                        statusCode: 201,
                        message: "POS Transaction created successfully",
                        data: result,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    TransactionController.createNipTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, CollectionType, TransactionDate, SourceBank, DestinationBank, Volumn, value_, collectionTypeSchema, error, transactionNipRepository, transaction, result;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, CollectionType = _b.CollectionType, TransactionDate = _b.TransactionDate, SourceBank = _b.SourceBank, DestinationBank = _b.DestinationBank, Volumn = _b.Volumn, value_ = _b.value_;
                    collectionTypeSchema = joi_1.default.object({
                        CollectionType: joi_1.default.string().required(),
                        SourceBank: joi_1.default.string().required(),
                        DestinationBank: joi_1.default.string().required(),
                        Volumn: joi_1.default.number().required(),
                        value_: joi_1.default.number().required(),
                    }).unknown();
                    error = collectionTypeSchema.validate(__assign({}, req.body)).error;
                    if (error) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                statusCode: 400,
                                message: error.details[0].message,
                            })];
                    }
                    transactionNipRepository = (0, typeorm_1.getRepository)(nfs_nip_trans_1.default, 'NIPDB');
                    transaction = new nfs_nip_trans_1.default();
                    transaction.CollectionType = CollectionType;
                    transaction.TransactionDate = TransactionDate;
                    transaction.SourceBank = SourceBank;
                    transaction.DestinationBank = DestinationBank;
                    transaction.Volumn = Volumn;
                    transaction.value_ = value_;
                    return [4 /*yield*/, transactionNipRepository.save(transaction)];
                case 1:
                    result = _c.sent();
                    res.status(201).json({
                        success: true,
                        statusCode: 201,
                        message: "NIP Transaction created successfully",
                        data: result,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    // public static collectionTypePipeline = async () => {
    //   try {
    //     const collectionTypeRepository = getRepository(collection_type, 'UTILITYAPPDB');
    //     // Check count of documents in NIBSS MYSQL Database
    //     let checkCollectionType = await collectionTypeRepository.find();
    //     // Get previous count data from MONGO Database
    //     let getCount: any = await DocCount.findOne({ category: ICountCategory.COLLECTION_TYPE });
    //     // If count is not null
    //     if (getCount !== null) {
    //       // If NIBSS data is more than the previous count, update
    //       if (checkCollectionType.length > getCount.count) {
    //         checkCollectionType.forEach(async (e: any) => {
    //           let result = await CollectionType.updateMany(
    //             { old_id: e.code },
    //             {
    //               $setOnInsert: {
    //                 old_id: e.code,
    //                 category: e.category,
    //                 success: e.success,
    //                 description: e.description,
    //               },
    //             },
    //             { upsert: true }
    //           );
    //           if (result.upsertedCount > 0) {
    //             await DocCount.findByIdAndUpdate(
    //               { _id: getCount._id },
    //               { count: checkCollectionType.length }
    //             );
    //           }
    //         });
    //         console.log('COLLECTION UPDATED');
    //       }
    //     } else {
    //       checkCollectionType.forEach(async (e: any) => {
    //         const collectionTypePayload: ICollectionType = {
    //           old_id: e.code,
    //           category: e.category,
    //           success: e.success,
    //           description: e.description,
    //         };
    //         await CollectionType.create(collectionTypePayload);
    //       });
    //       console.log('COLLECTION CREATED');
    //       const countPayload: IDocCount = {
    //         count: checkCollectionType.length,
    //         category: ICountCategory.COLLECTION_TYPE,
    //       };
    //       await DocCount.create(countPayload);
    //     }
    //   } catch (err: any) {
    //     console.log(err.message);
    //   }
    // };
    TransactionController.posTransactionPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var transactionPosRepository, checkTransaction, getCount, countPayload, checkStoreLoop, i, getCollectionType, collection_id, getDailyMatch, dailyTransactionPayload, getMonthlyMatch, monthlyTransactionPayload, getYearlyMatch, yearlyTransactionPayload, err_1;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __generator(_a, function (_p) {
            switch (_p.label) {
                case 0:
                    _p.trys.push([0, 26, , 27]);
                    transactionPosRepository = (0, typeorm_1.getRepository)(nfs_pos_1.default, 'UTILITYAPPDB');
                    return [4 /*yield*/, transactionPosRepository.find()];
                case 1:
                    checkTransaction = _p.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.POS_TRANSACTION,
                        })];
                case 2:
                    getCount = _p.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.POS_TRANSACTION,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _p.sent();
                    console.log('COUNT CREATED');
                    _p.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 25];
                    if (!(getCount.count < checkTransaction.length)) return [3 /*break*/, 25];
                    return [4 /*yield*/, transactionPosRepository.find({
                            TransactionDate: (0, typeorm_1.MoreThan)(getCount.updatedAt),
                        })];
                case 5:
                    checkStoreLoop = _p.sent();
                    i = 0;
                    _p.label = 6;
                case 6:
                    if (!(i < checkStoreLoop.length)) return [3 /*break*/, 25];
                    return [4 /*yield*/, collection_type_model_1.default.findOne({
                            old_id: checkStoreLoop[i].CollectionType,
                        })];
                case 7:
                    getCollectionType = _p.sent();
                    collection_id = getCollectionType ? getCollectionType._id : null;
                    return [4 /*yield*/, daily_summary_1.default.find({
                            $and: [
                                { day: (_b = checkStoreLoop[i].TransactionDate) === null || _b === void 0 ? void 0 : _b.getDate() },
                                { month: ((_c = checkStoreLoop[i].TransactionDate) === null || _c === void 0 ? void 0 : _c.getMonth()) + 1 },
                                { year: (_d = checkStoreLoop[i].TransactionDate) === null || _d === void 0 ? void 0 : _d.getFullYear() },
                                { collectionType: collection_id },
                                { destination_bank: checkStoreLoop[i].DestinationBank },
                            ],
                        })];
                case 8:
                    getDailyMatch = _p.sent();
                    if (!(getDailyMatch.length == 0)) return [3 /*break*/, 10];
                    dailyTransactionPayload = {
                        collectionType: collection_id,
                        source_bank: Number(checkStoreLoop[i].SourceBank),
                        destination_bank: Number(checkStoreLoop[i].DestinationBank),
                        transactionDate: checkStoreLoop[i].TransactionDate,
                        day: String((_e = checkStoreLoop[i].TransactionDate) === null || _e === void 0 ? void 0 : _e.getDate()),
                        month: String(((_f = checkStoreLoop[i].TransactionDate) === null || _f === void 0 ? void 0 : _f.getMonth()) + 1),
                        year: String((_g = checkStoreLoop[i].TransactionDate) === null || _g === void 0 ? void 0 : _g.getFullYear()),
                        value: checkStoreLoop[i].value_,
                        volume: checkStoreLoop[i].Volumn,
                    };
                    return [4 /*yield*/, daily_summary_1.default.create(dailyTransactionPayload)];
                case 9:
                    _p.sent();
                    return [3 /*break*/, 12];
                case 10:
                    if (!(getDailyMatch.length == 1)) return [3 /*break*/, 12];
                    return [4 /*yield*/, daily_summary_1.default.findOneAndUpdate({ _id: getDailyMatch[0]._id }, {
                            $set: {
                                source_bank: checkStoreLoop[i].SourceBank,
                                destination_bank: getDailyMatch[0].destination_bank,
                                collectionType: getDailyMatch[0].collectionType,
                                day: getDailyMatch[0].day,
                                month: getDailyMatch[0].month,
                                year: getDailyMatch[0].year,
                                transactionDate: checkStoreLoop[i].TransactionDate,
                            },
                            $inc: {
                                volume: checkStoreLoop[i].Volumn,
                                value: checkStoreLoop[i].value_,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 11:
                    _p.sent();
                    _p.label = 12;
                case 12: return [4 /*yield*/, monthly_summary_1.default.find({
                        $and: [
                            { month: ((_h = checkStoreLoop[i].TransactionDate) === null || _h === void 0 ? void 0 : _h.getMonth()) + 1 },
                            { year: (_j = checkStoreLoop[i].TransactionDate) === null || _j === void 0 ? void 0 : _j.getFullYear() },
                            { collectionType: collection_id },
                            { destination_bank: checkStoreLoop[i].DestinationBank },
                        ],
                    })];
                case 13:
                    getMonthlyMatch = _p.sent();
                    if (!(getMonthlyMatch.length == 0)) return [3 /*break*/, 15];
                    monthlyTransactionPayload = {
                        collectionType: collection_id,
                        source_bank: Number(checkStoreLoop[i].SourceBank),
                        destination_bank: Number(checkStoreLoop[i].DestinationBank),
                        transactionDate: checkStoreLoop[i].TransactionDate,
                        month: String(((_k = checkStoreLoop[i].TransactionDate) === null || _k === void 0 ? void 0 : _k.getMonth()) + 1),
                        year: String((_l = checkStoreLoop[i].TransactionDate) === null || _l === void 0 ? void 0 : _l.getFullYear()),
                        value: checkStoreLoop[i].value_,
                        volume: checkStoreLoop[i].Volumn,
                    };
                    return [4 /*yield*/, monthly_summary_1.default.create(monthlyTransactionPayload)];
                case 14:
                    _p.sent();
                    return [3 /*break*/, 17];
                case 15:
                    if (!(getMonthlyMatch.length == 1)) return [3 /*break*/, 17];
                    return [4 /*yield*/, monthly_summary_1.default.findOneAndUpdate({ _id: getMonthlyMatch[0]._id }, {
                            $set: {
                                source_bank: checkStoreLoop[i].SourceBank,
                                destination_bank: getMonthlyMatch[0].destination_bank,
                                collectionType: getMonthlyMatch[0].collectionType,
                                month: getMonthlyMatch[0].month,
                                year: getMonthlyMatch[0].year,
                                transactionDate: checkStoreLoop[i].TransactionDate,
                            },
                            $inc: {
                                volume: checkStoreLoop[i].Volumn,
                                value: checkStoreLoop[i].value_,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 16:
                    _p.sent();
                    _p.label = 17;
                case 17: return [4 /*yield*/, yearly_summary_1.default.find({
                        $and: [
                            { year: (_m = checkStoreLoop[i].TransactionDate) === null || _m === void 0 ? void 0 : _m.getFullYear() },
                            { collectionType: collection_id },
                            { destination_bank: checkStoreLoop[i].DestinationBank },
                        ],
                    })];
                case 18:
                    getYearlyMatch = _p.sent();
                    if (!(getYearlyMatch.length == 0)) return [3 /*break*/, 20];
                    yearlyTransactionPayload = {
                        collectionType: collection_id,
                        source_bank: Number(checkStoreLoop[i].SourceBank),
                        destination_bank: Number(checkStoreLoop[i].DestinationBank),
                        transactionDate: checkStoreLoop[i].TransactionDate,
                        year: String((_o = checkStoreLoop[i].TransactionDate) === null || _o === void 0 ? void 0 : _o.getFullYear()),
                        value: checkStoreLoop[i].value_,
                        volume: checkStoreLoop[i].Volumn,
                    };
                    return [4 /*yield*/, yearly_summary_1.default.create(yearlyTransactionPayload)];
                case 19:
                    _p.sent();
                    return [3 /*break*/, 22];
                case 20:
                    if (!(getYearlyMatch.length == 1)) return [3 /*break*/, 22];
                    return [4 /*yield*/, yearly_summary_1.default.findOneAndUpdate({ _id: getYearlyMatch[0]._id }, {
                            $set: {
                                source_bank: checkStoreLoop[i].SourceBank,
                                destination_bank: getYearlyMatch[0].destination_bank,
                                collectionType: getYearlyMatch[0].collectionType,
                                year: getYearlyMatch[0].year,
                                transactionDate: checkStoreLoop[i].TransactionDate,
                            },
                            $inc: {
                                volume: checkStoreLoop[i].Volumn,
                                value: checkStoreLoop[i].value_,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 21:
                    _p.sent();
                    _p.label = 22;
                case 22:
                    if (!(checkStoreLoop.length - 1 === i)) return [3 /*break*/, 24];
                    console.log('POS SUMMARY SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkTransaction.length })];
                case 23:
                    // Update count
                    _p.sent();
                    _p.label = 24;
                case 24:
                    i++;
                    return [3 /*break*/, 6];
                case 25: return [3 /*break*/, 27];
                case 26:
                    err_1 = _p.sent();
                    console.log(err_1.message);
                    return [3 /*break*/, 27];
                case 27: return [2 /*return*/];
            }
        });
    }); };
    TransactionController.nipTransactionPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var transactionNipRepository, checkTransaction, getCount, countPayload, checkStoreLoop, i, getCollectionType, collection_id, getDailyMatch, dailyTransactionPayload, getMonthlyMatch, monthlyTransactionPayload, getYearlyMatch, yearlyTransactionPayload, err_2;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __generator(_a, function (_p) {
            switch (_p.label) {
                case 0:
                    _p.trys.push([0, 26, , 27]);
                    transactionNipRepository = (0, typeorm_1.getRepository)(nfs_nip_trans_1.default, 'NIPDB');
                    return [4 /*yield*/, transactionNipRepository.find()];
                case 1:
                    checkTransaction = _p.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.NIP_TRANSACTION,
                        })];
                case 2:
                    getCount = _p.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.NIP_TRANSACTION,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _p.sent();
                    console.log('COUNT CREATED');
                    _p.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 25];
                    if (!(getCount.count < checkTransaction.length)) return [3 /*break*/, 25];
                    return [4 /*yield*/, transactionNipRepository.find({
                            TransactionDate: (0, typeorm_1.MoreThan)(getCount.updatedAt),
                        })];
                case 5:
                    checkStoreLoop = _p.sent();
                    i = 0;
                    _p.label = 6;
                case 6:
                    if (!(i < checkStoreLoop.length)) return [3 /*break*/, 25];
                    return [4 /*yield*/, collection_type_model_1.default.findOne({
                            old_id: checkStoreLoop[i].CollectionType,
                        })];
                case 7:
                    getCollectionType = _p.sent();
                    collection_id = getCollectionType ? getCollectionType._id : null;
                    return [4 /*yield*/, daily_summary_1.default.find({
                            $and: [
                                { day: (_b = checkStoreLoop[i].TransactionDate) === null || _b === void 0 ? void 0 : _b.getDate() },
                                { month: ((_c = checkStoreLoop[i].TransactionDate) === null || _c === void 0 ? void 0 : _c.getMonth()) + 1 },
                                { year: (_d = checkStoreLoop[i].TransactionDate) === null || _d === void 0 ? void 0 : _d.getFullYear() },
                                { collectionType: collection_id },
                                { destination_bank: checkStoreLoop[i].DestinationBank },
                            ],
                        })];
                case 8:
                    getDailyMatch = _p.sent();
                    if (!(getDailyMatch.length == 0)) return [3 /*break*/, 10];
                    dailyTransactionPayload = {
                        collectionType: collection_id,
                        source_bank: Number(checkStoreLoop[i].SourceBank),
                        destination_bank: Number(checkStoreLoop[i].DestinationBank),
                        transactionDate: checkStoreLoop[i].TransactionDate,
                        day: String((_e = checkStoreLoop[i].TransactionDate) === null || _e === void 0 ? void 0 : _e.getDate()),
                        month: String(((_f = checkStoreLoop[i].TransactionDate) === null || _f === void 0 ? void 0 : _f.getMonth()) + 1),
                        year: String((_g = checkStoreLoop[i].TransactionDate) === null || _g === void 0 ? void 0 : _g.getFullYear()),
                        value: checkStoreLoop[i].value_,
                        volume: checkStoreLoop[i].Volumn,
                    };
                    return [4 /*yield*/, daily_summary_1.default.create(dailyTransactionPayload)];
                case 9:
                    _p.sent();
                    return [3 /*break*/, 12];
                case 10:
                    if (!(getDailyMatch.length == 1)) return [3 /*break*/, 12];
                    return [4 /*yield*/, daily_summary_1.default.findOneAndUpdate({ _id: getDailyMatch[0]._id }, {
                            $set: {
                                source_bank: checkStoreLoop[i].SourceBank,
                                destination_bank: getDailyMatch[0].destination_bank,
                                collectionType: getDailyMatch[0].collectionType,
                                day: getDailyMatch[0].day,
                                month: getDailyMatch[0].month,
                                year: getDailyMatch[0].year,
                                transactionDate: checkStoreLoop[i].TransactionDate,
                            },
                            $inc: {
                                volume: checkStoreLoop[i].Volumn,
                                value: checkStoreLoop[i].value_,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 11:
                    _p.sent();
                    _p.label = 12;
                case 12: return [4 /*yield*/, monthly_summary_1.default.find({
                        $and: [
                            { month: ((_h = checkStoreLoop[i].TransactionDate) === null || _h === void 0 ? void 0 : _h.getMonth()) + 1 },
                            { year: (_j = checkStoreLoop[i].TransactionDate) === null || _j === void 0 ? void 0 : _j.getFullYear() },
                            { collectionType: collection_id },
                            { destination_bank: checkStoreLoop[i].DestinationBank },
                        ],
                    })];
                case 13:
                    getMonthlyMatch = _p.sent();
                    if (!(getMonthlyMatch.length == 0)) return [3 /*break*/, 15];
                    monthlyTransactionPayload = {
                        collectionType: collection_id,
                        source_bank: Number(checkStoreLoop[i].SourceBank),
                        destination_bank: Number(checkStoreLoop[i].DestinationBank),
                        transactionDate: checkStoreLoop[i].TransactionDate,
                        month: String(((_k = checkStoreLoop[i].TransactionDate) === null || _k === void 0 ? void 0 : _k.getMonth()) + 1),
                        year: String((_l = checkStoreLoop[i].TransactionDate) === null || _l === void 0 ? void 0 : _l.getFullYear()),
                        value: checkStoreLoop[i].value_,
                        volume: checkStoreLoop[i].Volumn,
                    };
                    return [4 /*yield*/, monthly_summary_1.default.create(monthlyTransactionPayload)];
                case 14:
                    _p.sent();
                    return [3 /*break*/, 17];
                case 15:
                    if (!(getMonthlyMatch.length == 1)) return [3 /*break*/, 17];
                    return [4 /*yield*/, monthly_summary_1.default.findOneAndUpdate({ _id: getMonthlyMatch[0]._id }, {
                            $set: {
                                source_bank: checkStoreLoop[i].SourceBank,
                                destination_bank: getMonthlyMatch[0].destination_bank,
                                collectionType: getMonthlyMatch[0].collectionType,
                                month: getMonthlyMatch[0].month,
                                year: getMonthlyMatch[0].year,
                                transactionDate: checkStoreLoop[i].TransactionDate,
                            },
                            $inc: {
                                volume: checkStoreLoop[i].Volumn,
                                value: checkStoreLoop[i].value_,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 16:
                    _p.sent();
                    _p.label = 17;
                case 17: return [4 /*yield*/, yearly_summary_1.default.find({
                        $and: [
                            { year: (_m = checkStoreLoop[i].TransactionDate) === null || _m === void 0 ? void 0 : _m.getFullYear() },
                            { collectionType: collection_id },
                            { destination_bank: checkStoreLoop[i].DestinationBank },
                        ],
                    })];
                case 18:
                    getYearlyMatch = _p.sent();
                    if (!(getYearlyMatch.length == 0)) return [3 /*break*/, 20];
                    yearlyTransactionPayload = {
                        collectionType: collection_id,
                        source_bank: Number(checkStoreLoop[i].SourceBank),
                        destination_bank: Number(checkStoreLoop[i].DestinationBank),
                        transactionDate: checkStoreLoop[i].TransactionDate,
                        year: String((_o = checkStoreLoop[i].TransactionDate) === null || _o === void 0 ? void 0 : _o.getFullYear()),
                        value: checkStoreLoop[i].value_,
                        volume: checkStoreLoop[i].Volumn,
                    };
                    return [4 /*yield*/, yearly_summary_1.default.create(yearlyTransactionPayload)];
                case 19:
                    _p.sent();
                    return [3 /*break*/, 22];
                case 20:
                    if (!(getYearlyMatch.length == 1)) return [3 /*break*/, 22];
                    return [4 /*yield*/, yearly_summary_1.default.findOneAndUpdate({ _id: getYearlyMatch[0]._id }, {
                            $set: {
                                source_bank: checkStoreLoop[i].SourceBank,
                                destination_bank: getYearlyMatch[0].destination_bank,
                                collectionType: getYearlyMatch[0].collectionType,
                                year: getYearlyMatch[0].year,
                                transactionDate: checkStoreLoop[i].TransactionDate,
                            },
                            $inc: {
                                volume: checkStoreLoop[i].Volumn,
                                value: checkStoreLoop[i].value_,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 21:
                    _p.sent();
                    _p.label = 22;
                case 22:
                    if (!(checkStoreLoop.length - 1 === i)) return [3 /*break*/, 24];
                    console.log('NIP SUMMARY SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkTransaction.length })];
                case 23:
                    // Update count
                    _p.sent();
                    _p.label = 24;
                case 24:
                    i++;
                    return [3 /*break*/, 6];
                case 25: return [3 /*break*/, 27];
                case 26:
                    err_2 = _p.sent();
                    console.log(err_2.message);
                    return [3 /*break*/, 27];
                case 27: return [2 /*return*/];
            }
        });
    }); };
    return TransactionController;
}());
exports.default = TransactionController;
// Collection Type Cron Job
node_cron_1.default.schedule(String(process.env.CRON), function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        TransactionController.posTransactionPipeline();
        TransactionController.nipTransactionPipeline();
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=transaction.controller.js.map