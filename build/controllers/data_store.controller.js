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
var node_cron_1 = __importDefault(require("node-cron"));
var typeorm_1 = require("typeorm");
// import mongoose from 'mongoose';
var mmo_transactions_model_1 = __importDefault(require("../models/mmo_transactions.model"));
var mfb_transactions_model_1 = __importDefault(require("../models/mfb_transactions.model"));
var mmo_transactions_interface_1 = require("../interfaces/mmo_transactions.interface");
var doc_count_model_1 = __importDefault(require("../models/doc_count.model"));
var doc_count_interface_1 = require("../interfaces/doc_count.interface");
var constants_1 = require("../lib/constants");
var document_store_1 = __importDefault(require("../Entities/document_store"));
var state_model_1 = __importDefault(require("../models/state.model"));
var lga_model_1 = __importDefault(require("../models/lga.model"));
var atm_model_1 = __importDefault(require("../models/atm.model"));
var pension_fund_admin_model_1 = __importDefault(require("../models/pension_fund_admin.model"));
var bank_agents_model_1 = __importDefault(require("../models/bank_agents.model"));
var insurance_model_1 = __importDefault(require("../models/insurance.model"));
var mfb_locations_model_1 = __importDefault(require("../models/mfb_locations.model"));
var cmb_locations_model_1 = __importDefault(require("../models/cmb_locations.model"));
var mortgage_model_1 = __importDefault(require("../models/mortgage.model"));
var development_finance_institution_model_1 = __importDefault(require("../models/development_finance_institution.model"));
var mmo_model_1 = __importDefault(require("../models/mmo.model"));
var bureau_de_change_model_1 = __importDefault(require("../models/bureau_de_change.model"));
var sec_model_1 = __importDefault(require("../models/sec.model"));
var complaint_category_model_1 = __importDefault(require("../models/complaint_category.model"));
var complaints_model_1 = __importDefault(require("../models/complaints.model"));
var daily_complaint_summary_model_1 = __importDefault(require("../models/daily_complaint_summary.model"));
var monthly_complaint_summary_model_1 = __importDefault(require("../models/monthly_complaint_summary.model"));
var yearly_complaint_summary_model_1 = __importDefault(require("../models/yearly_complaint_summary.model"));
var fraud_theft_robbery_model_1 = __importDefault(require("../models/fraud_theft_robbery.model"));
var daily_fraud_summary_model_1 = __importDefault(require("../models/daily_fraud_summary.model"));
var monthly_fraud_summary_model_1 = __importDefault(require("../models/monthly_fraud_summary.model"));
var yearly_fraud_summary_model_1 = __importDefault(require("../models/yearly_fraud_summary.model"));
var states_lga_1 = require("./states_lga");
var lib_1 = __importDefault(require("../lib"));
var DocumentStoreController = /** @class */ (function () {
    function DocumentStoreController() {
    }
    var _a;
    _a = DocumentStoreController;
    DocumentStoreController.createData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, file_content, business_process, docStoreRepository, doc_store, result;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, file_content = _b.file_content, business_process = _b.business_process;
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    doc_store = new document_store_1.default();
                    doc_store.file_content = file_content;
                    doc_store.business_process = business_process;
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    result = _c.sent();
                    res.status(201).json({
                        success: true,
                        statusCode: 201,
                        message: "Doc store for ".concat(business_process, " created successfully"),
                        data: result,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.statesLga = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            try {
                Promise.all(states_lga_1.states.map(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                    var state_1, lgas, err_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 6, , 7]);
                                return [4 /*yield*/, state_model_1.default.findOne({ alias: x.alias })];
                            case 1:
                                state_1 = _b.sent();
                                if (!!state_1) return [3 /*break*/, 4];
                                return [4 /*yield*/, state_model_1.default.create({ name: x.state, alias: x.alias })];
                            case 2:
                                state_1 = _b.sent();
                                lgas = x.lgas.map(function (s) { return ({
                                    name: s,
                                    state: state_1 === null || state_1 === void 0 ? void 0 : state_1._id,
                                }); });
                                return [4 /*yield*/, lga_model_1.default.create.apply(lga_model_1.default, lgas)];
                            case 3:
                                _b.sent();
                                console.log("Lgas for ".concat(x.state, " created"));
                                return [3 /*break*/, 5];
                            case 4:
                                console.log("States and LGA's seeded already");
                                _b.label = 5;
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                err_1 = _b.sent();
                                console.log(err_1.message);
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); }));
            }
            catch (err) {
                console.log(err.message);
            }
            return [2 /*return*/];
        });
    }); };
    DocumentStoreController.mmoTransactionPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, result, err_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.MMO_TRANSACTIONS,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({ category: doc_count_interface_1.ICountCategory.MMO_TRANSACTIONS })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.MMO_TRANSACTIONS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    return [3 /*break*/, 6];
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    result = void 0;
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getMMO, transactionType, month, mmoTransactionPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.transaction_type, "/").concat(e.file_content.month, "/").concat(e.file_content.year, "/").concat(e.file_content.value, "/").concat(e.file_content.volume);
                                    return [4 /*yield*/, mmo_transactions_model_1.default.findOne({ key: key })];
                                case 1:
                                    getMMO = _b.sent();
                                    if (!!getMMO) return [3 /*break*/, 4];
                                    transactionType = void 0;
                                    if (e.file_content.transaction_type == 'Cardless Withdrawal') {
                                        transactionType = mmo_transactions_interface_1.IMmoTransactionType.CARDLESS_WITHDRAWAL;
                                        console.log('Cardless Withdrawal');
                                    }
                                    if (e.file_content.transaction_type == 'Airtime Payment') {
                                        transactionType = mmo_transactions_interface_1.IMmoTransactionType.AIRTIME_PAYMENT;
                                        console.log('Airtime Payment');
                                    }
                                    if (e.file_content.transaction_type == 'Funds Transfer') {
                                        transactionType = mmo_transactions_interface_1.IMmoTransactionType.FUNDS_TRANSFER;
                                        console.log('Funds Transfer');
                                    }
                                    return [4 /*yield*/, lib_1.default.convertMonthToNumber(e.file_content.month)];
                                case 2:
                                    month = _b.sent();
                                    mmoTransactionPayload = {
                                        transaction_type: transactionType,
                                        month: month,
                                        year: e.file_content.year,
                                        volume: e.file_content.volume,
                                        value: e.file_content.value,
                                        key: key,
                                    };
                                    return [4 /*yield*/, mmo_transactions_model_1.default.create(mmoTransactionPayload)];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('MMO TRANSACTION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_2 = _b.sent();
                    console.log(err_2.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.mfbTransactionPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.MFB_TRANSACTIONS,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({ category: doc_count_interface_1.ICountCategory.MFB_TRANSACTIONS })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.MFB_TRANSACTIONS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getMFB, month, mfbTransactionPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.action, "/").concat(e.file_content.month, "/").concat(e.file_content.year, "/").concat(e.file_content.value, "/").concat(e.file_content.volume, "/").concat(e.file_content.state_key);
                                    return [4 /*yield*/, mfb_transactions_model_1.default.findOne({ key: key })];
                                case 1:
                                    getMFB = _b.sent();
                                    if (!!getMFB) return [3 /*break*/, 4];
                                    return [4 /*yield*/, lib_1.default.convertMonthToNumber(e.file_content.month)];
                                case 2:
                                    month = _b.sent();
                                    mfbTransactionPayload = {
                                        action: e.file_content.action,
                                        month: month,
                                        year: e.file_content.year,
                                        volume: e.file_content.volume,
                                        value: e.file_content.value,
                                        state_key: e.file_content.state_key,
                                        state: e.file_content.state,
                                        key: key,
                                    };
                                    return [4 /*yield*/, mfb_transactions_model_1.default.create(mfbTransactionPayload)];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('MFB TRANSACTION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_3 = _b.sent();
                    console.log(err_3.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.atmLocationsPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.ATM_LOCATIONS,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({ category: doc_count_interface_1.ICountCategory.ATM_LOCATIONS })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.ATM_LOCATIONS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getATM, st, lg, atmPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga);
                                    return [4 /*yield*/, atm_model_1.default.findOne({ key: key })];
                                case 1:
                                    getATM = _b.sent();
                                    if (!!getATM) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    atmPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name,
                                        no_of_atm: e.file_content.no_of_atm,
                                        outlet_type: e.file_content.outlet_type,
                                        mastercard_accepted: e.file_content.mastercard_accepted === 'Yes' ? 'true' : 'false',
                                        visa_accepted: e.file_content.visa_accepted === 'Yes' ? 'true' : 'false',
                                        quickteller_accepted: e.file_content.quickteller_accepted === 'Yes' ? 'true' : 'false',
                                        verve_accepted: e.file_content.verve_accepted === 'Yes' ? 'true' : 'false',
                                        netcash_accepted: e.file_content.netcash_accepted === 'Yes' ? 'true' : 'false',
                                        deposit_accepted: e.file_content.deposit_accepted === 'Yes' ? 'true' : 'false',
                                        key: key,
                                    };
                                    return [4 /*yield*/, atm_model_1.default.create(atmPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('ATM LOCATION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_4 = _b.sent();
                    console.log(err_4.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.bankAgentsLocationsPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.BANK_AGENTS_LOCATION,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.BANK_AGENTS_LOCATIONS,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.BANK_AGENTS_LOCATIONS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getBankAgents, st, lg, bankAgentPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name_of_agent, "/").concat(e.file_content.name_of_establishment);
                                    return [4 /*yield*/, bank_agents_model_1.default.findOne({ key: key })];
                                case 1:
                                    getBankAgents = _b.sent();
                                    if (!!getBankAgents) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    bankAgentPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_agent,
                                        no_of_atm: e.file_content.no_of_atm,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        establishment_name: e.file_content.name_of_establishment,
                                        standalone_business: e.file_content.standalone_business,
                                        other_business: e.file_content.other_business_conducted,
                                        bank: e.file_content.bank,
                                        average_weekly_deposit: e.file_content.average_number_of_deposits_per_week,
                                        average_weekly_withdrawal: e.file_content.average_number_of_withdrawals_per_week,
                                        key: key,
                                    };
                                    return [4 /*yield*/, bank_agents_model_1.default.create(bankAgentPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('BANK AGENTS LOCATION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_5 = _b.sent();
                    console.log(err_5.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.pfaLocationsPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.PENSION_FUND_ADMIN,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.PENSION_FUND_ADMIN,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.PENSION_FUND_ADMIN,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getPfa, st, lg, pfaPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name_of_pfa);
                                    return [4 /*yield*/, pension_fund_admin_model_1.default.findOne({ key: key })];
                                case 1:
                                    getPfa = _b.sent();
                                    if (!!getPfa) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    pfaPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        regulating_body: e.file_content.regulating_body,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_pfa,
                                        no_of_atm: e.file_content.no_of_atm,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        group_pension: e.file_content.group_pension === 'Yes' ? 'true' : 'false',
                                        investment_products: e.file_content.investment_products === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, pension_fund_admin_model_1.default.create(pfaPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('PFA LOCATION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_6 = _b.sent();
                    console.log(err_6.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.insurancePipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_7;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.INSURANCE,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.INSURANCE,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.INSURANCE,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getInsurance, st, lg, insurancePayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name);
                                    return [4 /*yield*/, insurance_model_1.default.findOne({ key: key })];
                                case 1:
                                    getInsurance = _b.sent();
                                    if (!!getInsurance) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    insurancePayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        regulating_body: e.file_content.regulating_body,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_pfa,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        property: e.file_content.property === 'Yes' ? 'true' : 'false',
                                        life: e.file_content.life === 'Yes' ? 'true' : 'false',
                                        health: e.file_content.health === 'Yes' ? 'true' : 'false',
                                        micro_insurance: e.file_content.micro_insurance === 'Yes' ? 'true' : 'false',
                                        re_insurance: e.file_content.re_insurance === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, insurance_model_1.default.create(insurancePayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('INSURANCE SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_7 = _b.sent();
                    console.log(err_7.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.mfbPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_8;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.MFB_LOCATIONS,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.MFB_LOCATIONS,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.MFB_LOCATIONS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getMFBLocations, st, lg, mfbPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name_of_bank);
                                    return [4 /*yield*/, mfb_locations_model_1.default.findOne({ key: key })];
                                case 1:
                                    getMFBLocations = _b.sent();
                                    if (!!getMFBLocations) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    mfbPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        category_code: 'MFB',
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        bank_name: e.file_content.name_of_bank,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        account_opening: e.file_content.account_opening === 'Yes' ? 'true' : 'false',
                                        personal_loan: e.file_content.personal_loans === 'Yes' ? 'true' : 'false',
                                        business_loan: e.file_content.business_loans === 'Yes' ? 'true' : 'false',
                                        savings: e.file_content.savings === 'Yes' ? 'true' : 'false',
                                        transfers: e.file_content.transfers === 'Yes' ? 'true' : 'false',
                                        payment: e.file_content.payment === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, mfb_locations_model_1.default.create(mfbPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('MFB LOCATION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_8 = _b.sent();
                    console.log(err_8.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.cmbPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_9;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.CMB_LOCATIONS,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.CMB_LOCATIONS,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.CMB_LOCATIONS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getMFBLocations, st, lg, cmbPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name_of_bank);
                                    return [4 /*yield*/, cmb_locations_model_1.default.findOne({ key: key })];
                                case 1:
                                    getMFBLocations = _b.sent();
                                    if (!!getMFBLocations) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    cmbPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        category_code: 'DMB',
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_bank,
                                        no_of_atm: e.file_content.no_of_atms,
                                        outlet_type: e.file_content.type_of_outlet,
                                        account_opening: e.file_content.account_opening === 'Yes' ? 'true' : 'false',
                                        personal_loan: e.file_content.personal_loans === 'Yes' ? 'true' : 'false',
                                        business_loan: e.file_content.business_loans === 'Yes' ? 'true' : 'false',
                                        savings: e.file_content.savings === 'Yes' ? 'true' : 'false',
                                        transfers: e.file_content.transfers === 'Yes' ? 'true' : 'false',
                                        payment: e.file_content.payment === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, cmb_locations_model_1.default.create(cmbPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('CMB LOCATION SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_9 = _b.sent();
                    console.log(err_9.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.mortgagePipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_10;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.MORTGAGE_BANKS,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.MORTGAGE_BANKS,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.MORTGAGE_BANKS,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getMortgageLocations, st, lg, cmbPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name_of_bank);
                                    return [4 /*yield*/, mortgage_model_1.default.findOne({ key: key })];
                                case 1:
                                    getMortgageLocations = _b.sent();
                                    if (!!getMortgageLocations) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    cmbPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_bank,
                                        record_keeping: e.file_content.record_keeping,
                                        outlet_type: e.file_content.type_of_outlet,
                                        sme_finance: e.file_content.sme_finance === 'Yes' ? 'true' : 'false',
                                        deposits: e.file_content.deposits === 'Yes' ? 'true' : 'false',
                                        savings: e.file_content.savings === 'Yes' ? 'true' : 'false',
                                        transfers: e.file_content.transfers === 'Yes' ? 'true' : 'false',
                                        consumer_credit: e.file_content.consumer_credit === 'Yes' ? 'true' : 'false',
                                        infrastructure_finance: e.file_content.infrastructure_finance === 'Yes' ? 'true' : 'false',
                                        mortgage_finance: e.file_content.mortgage_finance === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, mortgage_model_1.default.create(cmbPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('MORTGAGE SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_10 = _b.sent();
                    console.log(err_10.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.dfiPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_11;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.DEVELOPMENT_FINANCE_INSTITUTION,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.DEVELOPMENT_FINANCE_INSTITUTION,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.DEVELOPMENT_FINANCE_INSTITUTION,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getDfi, st, lg, cmbPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name);
                                    return [4 /*yield*/, development_finance_institution_model_1.default.findOne({ key: key })];
                                case 1:
                                    getDfi = _b.sent();
                                    if (!!getDfi) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    cmbPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_bank,
                                        record_keeping: e.file_content.record_keeping,
                                        outlet_type: e.file_content.type_of_outlet,
                                        agricultural_finance: e.file_content.agricultural_finance === 'Yes' ? 'true' : 'false',
                                        export_import_finance: e.file_content.export_import_finance === 'Yes' ? 'true' : 'false',
                                        sme_finance: e.file_content.sme_finance === 'Yes' ? 'true' : 'false',
                                        infrastructure_finance: e.file_content.infrastructure_finance === 'Yes' ? 'true' : 'false',
                                        mortgage_finance: e.file_content.mortgage_finance === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, development_finance_institution_model_1.default.create(cmbPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('DFI SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_11 = _b.sent();
                    console.log(err_11.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.mmoPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_12;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.MMO,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.MMO,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.MMO,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getMmo, st, lg, mmoPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name_of_agent, "/").concat(e.file_content.name_of_establishment);
                                    return [4 /*yield*/, mmo_model_1.default.findOne({ key: key })];
                                case 1:
                                    getMmo = _b.sent();
                                    if (!!getMmo) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    mmoPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name_of_agent,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        establishment_name: e.file_content.name_of_establishment,
                                        standalone_business: e.file_content.standalone_business,
                                        other_business: e.file_content.other_business_conducted,
                                        mmo_name: e.file_content.mmo,
                                        average_weekly_deposit: e.file_content.average_number_of_deposits_per_week,
                                        average_weekly_withdrawal: e.file_content.average_number_of_withdrawals_per_week,
                                        other_financial_services: e.file_content.other_financial_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, mmo_model_1.default.create(mmoPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('MMO SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_12 = _b.sent();
                    console.log(err_12.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.bdcPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_13;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.BDC,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.BDC,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.BDC,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getBdc, st, lg, bdcPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name);
                                    return [4 /*yield*/, bureau_de_change_model_1.default.findOne({ key: key })];
                                case 1:
                                    getBdc = _b.sent();
                                    if (!!getBdc) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    bdcPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        money_transfer: e.file_content.money_transfer === 'Yes' ? 'true' : 'false',
                                        currency_exchange: e.file_content.currency_exchange === 'Yes' ? 'true' : 'false',
                                        average_transactions_per_week: e.file_content.average_number_of_transactions_per_week,
                                        key: key,
                                    };
                                    return [4 /*yield*/, bureau_de_change_model_1.default.create(bdcPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('BDC SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_13 = _b.sent();
                    console.log(err_13.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.secPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_14;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.SEC,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.SEC,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.SEC,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var key, getSec, st, lg, secPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    key = "".concat(e.file_content.longitude, "/").concat(e.file_content.latitude, "/").concat(e.file_content.state_code, "/").concat(e.file_content.lga, "/").concat(e.file_content.name);
                                    return [4 /*yield*/, sec_model_1.default.findOne({ key: key })];
                                case 1:
                                    getSec = _b.sent();
                                    if (!!getSec) return [3 /*break*/, 5];
                                    return [4 /*yield*/, state_model_1.default.findOne({ alias: e.file_content.state_code })];
                                case 2:
                                    st = _b.sent();
                                    return [4 /*yield*/, lga_model_1.default.findOne({ name: new RegExp(e.file_content.lga, 'i') })];
                                case 3:
                                    lg = _b.sent();
                                    secPayload = {
                                        longitude: e.file_content.longitude,
                                        latitude: e.file_content.latitude,
                                        category: e.file_content.category,
                                        state: st === null || st === void 0 ? void 0 : st._id,
                                        alias: e.file_content.state_code,
                                        lga: lg === null || lg === void 0 ? void 0 : lg._id,
                                        address: e.file_content.address,
                                        name: e.file_content.name,
                                        outlet_type: e.file_content.type_of_outlet,
                                        record_keeping: e.file_content.record_keeping,
                                        regulating_body: e.file_content.regulating_body,
                                        stock_brokering: e.file_content.stock_brokering === 'Yes' ? 'true' : 'false',
                                        investment_banking: e.file_content.investment_banking === 'Yes' ? 'true' : 'false',
                                        investment_advising: e.file_content.investment_advising === 'Yes' ? 'true' : 'false',
                                        fund_managing: e.file_content.fund_managing === 'Yes' ? 'true' : 'false',
                                        collective_investment_schemes: e.file_content.collective_investment_schemes === 'Yes' ? 'true' : 'false',
                                        rating_agencies: e.file_content.rating_agencies === 'Yes' ? 'true' : 'false',
                                        custodians: e.file_content.custodians === 'Yes' ? 'true' : 'false',
                                        other_financial_services: e.file_content.other_services,
                                        key: key,
                                    };
                                    return [4 /*yield*/, sec_model_1.default.create(secPayload)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('SEC SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_14 = _b.sent();
                    console.log(err_14.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.complaintCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, err_15;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.COMPLAINT_CATEGORY,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.COMPLAINT_CATEGORY,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.COMPLAINT_CATEGORY,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 6];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 6];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var getCategory, complaintCategoryPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, complaint_category_model_1.default.findOne({
                                        category: e.file_content.category,
                                    })];
                                case 1:
                                    getCategory = _b.sent();
                                    if (!!getCategory) return [3 /*break*/, 3];
                                    complaintCategoryPayload = {
                                        category: e.file_content.category,
                                        description: e.file_content.description,
                                    };
                                    return [4 /*yield*/, complaint_category_model_1.default.create(complaintCategoryPayload)];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('COMPLAINT CATEGORY SEEDED');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_15 = _b.sent();
                    console.log(err_15.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.complaintPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, checkStoreLoop, i, getCategory, complaintCategory, date_received, amount_in_dispute, getDailyMatch, dailyComplaintPayload, getMonthlyMatch, monthlyComplaintPayload, getYearlyMatch, yearlyComplaintPayload, err_16;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 27, , 28]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.COMPLAINT,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.COMPLAINT,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.COMPLAINT,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 26];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 26];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var complaintCategory, complaintPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, complaint_category_model_1.default.findOne({
                                        category: e.file_content.complaint_category,
                                    })];
                                case 1:
                                    complaintCategory = _b.sent();
                                    complaintPayload = {
                                        account_currency: e.file_content.account_currency,
                                        amount_in_dispute: e.file_content.amount_in_dispute,
                                        branch_name: e.file_content.branch_name,
                                        city: e.file_content.city,
                                        complaint_category: complaintCategory ? complaintCategory._id : null,
                                        complaint_description: e.file_content.complaint_description,
                                        complaint_subject: e.file_content.complaint_subject,
                                        country: e.file_content.country,
                                        date_closed: e.file_content.date_closed,
                                        date_received: e.file_content.date_received,
                                        tracking_reference_no: e.file_content.tracking_reference_no,
                                        state: e.file_content.state,
                                        status: e.file_content.status,
                                    };
                                    return [4 /*yield*/, complaints_model_1.default.create(complaintPayload)];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('COMPLAINT SEEDED!');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.COMPLAINT,
                            creation_date: (0, typeorm_1.MoreThan)(getCount.updatedAt),
                        })];
                case 6:
                    checkStoreLoop = _b.sent();
                    i = 0;
                    _b.label = 7;
                case 7:
                    if (!(i < checkStoreLoop.length)) return [3 /*break*/, 26];
                    return [4 /*yield*/, complaint_category_model_1.default.findOne({
                            category: checkStoreLoop[i].file_content.complaint_category,
                        })];
                case 8:
                    getCategory = _b.sent();
                    complaintCategory = getCategory ? getCategory._id : null;
                    date_received = new Date(checkStoreLoop[i].file_content.date_received);
                    amount_in_dispute = Number(checkStoreLoop[i].file_content.amount_in_dispute);
                    return [4 /*yield*/, daily_complaint_summary_model_1.default.find({
                            $and: [
                                { day: date_received === null || date_received === void 0 ? void 0 : date_received.getDate() },
                                { month: (date_received === null || date_received === void 0 ? void 0 : date_received.getMonth()) + 1 },
                                { year: date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear() },
                                { complaint_category: complaintCategory },
                                { status: checkStoreLoop[i].file_content.status },
                            ],
                        })];
                case 9:
                    getDailyMatch = _b.sent();
                    if (!(getDailyMatch.length == 0)) return [3 /*break*/, 11];
                    dailyComplaintPayload = {
                        amount_in_dispute: amount_in_dispute,
                        complaint_category: complaintCategory,
                        day: String(date_received === null || date_received === void 0 ? void 0 : date_received.getDate()),
                        month: String((date_received === null || date_received === void 0 ? void 0 : date_received.getMonth()) + 1),
                        year: String(date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear()),
                        date_received: date_received,
                        status: checkStoreLoop[i].file_content.status,
                    };
                    return [4 /*yield*/, daily_complaint_summary_model_1.default.create(dailyComplaintPayload)];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 11:
                    if (!(getDailyMatch.length == 1)) return [3 /*break*/, 13];
                    return [4 /*yield*/, daily_complaint_summary_model_1.default.findOneAndUpdate({ _id: getDailyMatch[0]._id }, {
                            $set: {
                                day: String(date_received === null || date_received === void 0 ? void 0 : date_received.getDate()),
                                month: String((date_received === null || date_received === void 0 ? void 0 : date_received.getMonth()) + 1),
                                year: String(date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear()),
                                date_received: date_received,
                                status: checkStoreLoop[i].file_content.status,
                            },
                            $inc: {
                                amount_in_dispute: amount_in_dispute,
                                count: 1,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [4 /*yield*/, monthly_complaint_summary_model_1.default.find({
                        $and: [
                            { month: (date_received === null || date_received === void 0 ? void 0 : date_received.getMonth()) + 1 },
                            { year: date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear() },
                            { complaint_category: complaintCategory },
                            { status: checkStoreLoop[i].file_content.status },
                        ],
                    })];
                case 14:
                    getMonthlyMatch = _b.sent();
                    if (!(getMonthlyMatch.length == 0)) return [3 /*break*/, 16];
                    monthlyComplaintPayload = {
                        amount_in_dispute: amount_in_dispute,
                        complaint_category: complaintCategory,
                        month: String((date_received === null || date_received === void 0 ? void 0 : date_received.getMonth()) + 1),
                        year: String(date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear()),
                        date_received: date_received,
                        status: checkStoreLoop[i].file_content.status,
                    };
                    return [4 /*yield*/, monthly_complaint_summary_model_1.default.create(monthlyComplaintPayload)];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 16:
                    if (!(getMonthlyMatch.length == 1)) return [3 /*break*/, 18];
                    return [4 /*yield*/, monthly_complaint_summary_model_1.default.findOneAndUpdate({ _id: getMonthlyMatch[0]._id }, {
                            $set: {
                                month: String((date_received === null || date_received === void 0 ? void 0 : date_received.getMonth()) + 1),
                                year: String(date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear()),
                                date_received: date_received,
                                status: checkStoreLoop[i].file_content.status,
                            },
                            $inc: {
                                amount_in_dispute: amount_in_dispute,
                                count: 1,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 17:
                    _b.sent();
                    _b.label = 18;
                case 18: return [4 /*yield*/, yearly_complaint_summary_model_1.default.find({
                        $and: [
                            { year: date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear() },
                            { complaint_category: complaintCategory },
                            { status: checkStoreLoop[i].file_content.status },
                        ],
                    })];
                case 19:
                    getYearlyMatch = _b.sent();
                    if (!(getYearlyMatch.length == 0)) return [3 /*break*/, 21];
                    yearlyComplaintPayload = {
                        amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                        complaint_category: complaintCategory,
                        year: String(date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear()),
                        date_received: date_received,
                        status: checkStoreLoop[i].file_content.status,
                    };
                    return [4 /*yield*/, yearly_complaint_summary_model_1.default.create(yearlyComplaintPayload)];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 21:
                    if (!(getYearlyMatch.length == 1)) return [3 /*break*/, 23];
                    return [4 /*yield*/, yearly_complaint_summary_model_1.default.findOneAndUpdate({ _id: getYearlyMatch[0]._id }, {
                            $set: {
                                year: String(date_received === null || date_received === void 0 ? void 0 : date_received.getFullYear()),
                                date_received: date_received,
                                status: checkStoreLoop[i].file_content.status,
                            },
                            $inc: {
                                amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                                count: 1,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 22:
                    _b.sent();
                    _b.label = 23;
                case 23:
                    if (!(checkStoreLoop.length - 1 === i)) return [3 /*break*/, 25];
                    console.log('COMPLAINT SEEDED!!!');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 24:
                    // Update count
                    _b.sent();
                    _b.label = 25;
                case 25:
                    i++;
                    return [3 /*break*/, 7];
                case 26: return [3 /*break*/, 28];
                case 27:
                    err_16 = _b.sent();
                    console.log(err_16.message);
                    return [3 /*break*/, 28];
                case 28: return [2 /*return*/];
            }
        });
    }); };
    DocumentStoreController.fraudPipeline = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docStoreRepository, checkStore, getCount, countPayload, checkStoreLoop, i, getCategory, complaintCategory, date_reported, amount_involved, getDailyMatch, dailyFraudPayload, getMonthlyMatch, monthlyFraudPayload, getYearlyMatch, yearlyFraudPayload, err_17;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 27, , 28]);
                    docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.FRAUD,
                        })];
                case 1:
                    checkStore = _b.sent();
                    return [4 /*yield*/, doc_count_model_1.default.findOne({
                            category: doc_count_interface_1.ICountCategory.FRAUD,
                        })];
                case 2:
                    getCount = _b.sent();
                    if (!!getCount) return [3 /*break*/, 4];
                    countPayload = {
                        count: 0,
                        category: doc_count_interface_1.ICountCategory.FRAUD,
                    };
                    return [4 /*yield*/, doc_count_model_1.default.create(countPayload)];
                case 3:
                    _b.sent();
                    console.log('COUNT CREATED');
                    _b.label = 4;
                case 4:
                    if (!getCount) return [3 /*break*/, 26];
                    if (!(getCount.count < checkStore.length)) return [3 /*break*/, 26];
                    checkStore.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        var complaintCategory, fraudPayload;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, complaint_category_model_1.default.findOne({
                                        category: e.file_content.complaint_category,
                                    })];
                                case 1:
                                    complaintCategory = _b.sent();
                                    fraudPayload = {
                                        amount_involved: e.file_content.amount_involved,
                                        complaint_category: complaintCategory ? complaintCategory._id : null,
                                        comment: e.file_content.comment,
                                        date_created: e.file_content.date_created,
                                        date_reported: e.file_content.date_reported,
                                        desc_of_transaction: e.file_content.desc_of_transaction,
                                        agent_code: e.file_content.agent_code,
                                        status: e.file_content.status,
                                    };
                                    return [4 /*yield*/, fraud_theft_robbery_model_1.default.create(fraudPayload)];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log('FRAUD SEEDED!');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 5:
                    // Update count
                    _b.sent();
                    return [4 /*yield*/, docStoreRepository.find({
                            business_process: constants_1.BUSINESS_PROCESSES.FRAUD,
                            creation_date: (0, typeorm_1.MoreThan)(getCount.updatedAt),
                        })];
                case 6:
                    checkStoreLoop = _b.sent();
                    i = 0;
                    _b.label = 7;
                case 7:
                    if (!(i < checkStoreLoop.length)) return [3 /*break*/, 26];
                    return [4 /*yield*/, complaint_category_model_1.default.findOne({
                            category: checkStoreLoop[i].file_content.complaint_category,
                        })];
                case 8:
                    getCategory = _b.sent();
                    complaintCategory = getCategory ? getCategory._id : null;
                    date_reported = new Date(checkStoreLoop[i].file_content.date_reported);
                    amount_involved = Number(checkStoreLoop[i].file_content.amount_involved);
                    return [4 /*yield*/, daily_fraud_summary_model_1.default.find({
                            $and: [
                                { day: date_reported === null || date_reported === void 0 ? void 0 : date_reported.getDate() },
                                { month: (date_reported === null || date_reported === void 0 ? void 0 : date_reported.getMonth()) + 1 },
                                { year: date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear() },
                                { complaint_category: complaintCategory },
                                { status: checkStoreLoop[i].file_content.status },
                            ],
                        })];
                case 9:
                    getDailyMatch = _b.sent();
                    if (!(getDailyMatch.length == 0)) return [3 /*break*/, 11];
                    dailyFraudPayload = {
                        amount_involved: amount_involved,
                        complaint_category: complaintCategory,
                        day: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getDate()),
                        month: String((date_reported === null || date_reported === void 0 ? void 0 : date_reported.getMonth()) + 1),
                        year: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear()),
                        date_reported: date_reported,
                        status: checkStoreLoop[i].file_content.status,
                    };
                    return [4 /*yield*/, daily_fraud_summary_model_1.default.create(dailyFraudPayload)];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 11:
                    if (!(getDailyMatch.length == 1)) return [3 /*break*/, 13];
                    return [4 /*yield*/, daily_complaint_summary_model_1.default.findOneAndUpdate({ _id: getDailyMatch[0]._id }, {
                            $set: {
                                day: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getDate()),
                                month: String((date_reported === null || date_reported === void 0 ? void 0 : date_reported.getMonth()) + 1),
                                year: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear()),
                                date_received: date_reported,
                                status: checkStoreLoop[i].file_content.status,
                            },
                            $inc: {
                                amount_involved: amount_involved,
                                count: 1,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [4 /*yield*/, monthly_fraud_summary_model_1.default.find({
                        $and: [
                            { month: (date_reported === null || date_reported === void 0 ? void 0 : date_reported.getMonth()) + 1 },
                            { year: date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear() },
                            { complaint_category: complaintCategory },
                            { status: checkStoreLoop[i].file_content.status },
                        ],
                    })];
                case 14:
                    getMonthlyMatch = _b.sent();
                    if (!(getMonthlyMatch.length == 0)) return [3 /*break*/, 16];
                    monthlyFraudPayload = {
                        amount_involved: amount_involved,
                        complaint_category: complaintCategory,
                        month: String((date_reported === null || date_reported === void 0 ? void 0 : date_reported.getMonth()) + 1),
                        year: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear()),
                        date_reported: date_reported,
                        status: checkStoreLoop[i].file_content.status,
                    };
                    return [4 /*yield*/, monthly_complaint_summary_model_1.default.create(monthlyFraudPayload)];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 16:
                    if (!(getMonthlyMatch.length == 1)) return [3 /*break*/, 18];
                    return [4 /*yield*/, monthly_complaint_summary_model_1.default.findOneAndUpdate({ _id: getMonthlyMatch[0]._id }, {
                            $set: {
                                day: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getDate()),
                                month: String((date_reported === null || date_reported === void 0 ? void 0 : date_reported.getMonth()) + 1),
                                year: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear()),
                                date_received: date_reported,
                                status: checkStoreLoop[i].file_content.status,
                            },
                            $inc: {
                                amount_involved: amount_involved,
                                count: 1,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 17:
                    _b.sent();
                    _b.label = 18;
                case 18: return [4 /*yield*/, yearly_complaint_summary_model_1.default.find({
                        $and: [
                            { year: date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear() },
                            { complaint_category: complaintCategory },
                            { status: checkStoreLoop[i].file_content.status },
                        ],
                    })];
                case 19:
                    getYearlyMatch = _b.sent();
                    if (!(getYearlyMatch.length == 0)) return [3 /*break*/, 21];
                    yearlyFraudPayload = {
                        amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                        complaint_category: complaintCategory,
                        year: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear()),
                        date_received: date_reported,
                        status: checkStoreLoop[i].file_content.status,
                    };
                    return [4 /*yield*/, yearly_complaint_summary_model_1.default.create(yearlyFraudPayload)];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 21:
                    if (!(getYearlyMatch.length == 1)) return [3 /*break*/, 23];
                    return [4 /*yield*/, yearly_fraud_summary_model_1.default.findOneAndUpdate({ _id: getYearlyMatch[0]._id }, {
                            $set: {
                                year: String(date_reported === null || date_reported === void 0 ? void 0 : date_reported.getFullYear()),
                                date_received: date_reported,
                                status: checkStoreLoop[i].file_content.status,
                            },
                            $inc: {
                                amount_in_dispute: Number(checkStoreLoop[i].file_content.amount_in_dispute),
                                count: 1,
                            },
                        }, {
                            new: true,
                            upsert: true,
                        })];
                case 22:
                    _b.sent();
                    _b.label = 23;
                case 23:
                    if (!(checkStoreLoop.length - 1 === i)) return [3 /*break*/, 25];
                    console.log('FRAUD SEEDED!!!');
                    // Update count
                    return [4 /*yield*/, doc_count_model_1.default.findByIdAndUpdate({ _id: getCount._id }, { count: checkStore.length })];
                case 24:
                    // Update count
                    _b.sent();
                    _b.label = 25;
                case 25:
                    i++;
                    return [3 /*break*/, 7];
                case 26: return [3 /*break*/, 28];
                case 27:
                    err_17 = _b.sent();
                    console.log(err_17.message);
                    return [3 /*break*/, 28];
                case 28: return [2 /*return*/];
            }
        });
    }); };
    return DocumentStoreController;
}());
exports.default = DocumentStoreController;
node_cron_1.default.schedule(String(process.env.CRON), function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        // DocumentStoreController.statesLga();
        DocumentStoreController.mmoTransactionPipeline();
        DocumentStoreController.mfbTransactionPipeline();
        DocumentStoreController.atmLocationsPipeline();
        DocumentStoreController.bankAgentsLocationsPipeline();
        DocumentStoreController.pfaLocationsPipeline();
        DocumentStoreController.insurancePipeline();
        DocumentStoreController.mfbPipeline();
        DocumentStoreController.cmbPipeline();
        DocumentStoreController.mortgagePipeline();
        DocumentStoreController.dfiPipeline();
        DocumentStoreController.mmoPipeline();
        DocumentStoreController.bdcPipeline();
        DocumentStoreController.secPipeline();
        DocumentStoreController.complaintCategory();
        DocumentStoreController.complaintPipeline();
        DocumentStoreController.fraudPipeline();
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data_store.controller.js.map