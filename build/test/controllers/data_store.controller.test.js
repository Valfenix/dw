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
var index_1 = __importDefault(require("../../index"));
var supertest_1 = __importDefault(require("supertest"));
var typeorm_1 = require("typeorm");
var doc_count_model_1 = __importDefault(require("../../models/doc_count.model"));
var document_store_1 = __importDefault(require("../../Entities/document_store"));
var MysqlDBConnection_1 = require("../../services/MysqlDBConnection");
var data_store_controller_1 = __importDefault(require("../../controllers/data_store.controller"));
var docStoreRepository;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MysqlDBConnection_1.DatabaseService.getConnection()];
            case 1:
                _a.sent();
                return [4 /*yield*/, doc_count_model_1.default.remove()];
            case 2:
                _a.sent();
                docStoreRepository = (0, typeorm_1.getRepository)(document_store_1.default, 'POSTGRES');
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, docStoreRepository.delete({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, doc_count_model_1.default.remove()];
            case 2:
                _a.sent();
                return [4 /*yield*/, index_1.default.close()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('POST /doc_store', function () {
    it('returns status code 201 when bank is saved successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/v2/datastore/create')
                            .send({
                            file_content: {
                                action: 'Borrow (Male)',
                                state: 'Rivers',
                                state_key: 'RIV',
                                month: 'january',
                                year: '2021',
                                volume: 190592,
                                value: 42142584,
                            },
                            business_process: 'mfb_transactions',
                            creation_date: new Date(),
                        })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * MMO TRANSACTIONS
     */
    it('should create Count Document for MMO TRANSACTIONS if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mmoTransactionPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move MMO Transaction to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        transaction_type: 'Funds Transfer',
                        month: 'January',
                        year: '2021',
                        volume: 614286,
                        value: 8448164500,
                    };
                    doc_store.business_process = 'mmo_transactions';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mmoTransactionPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('MMO TRANSACTION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * MFB TRANSACTIONS
     */
    it('should create Count Document for MFB TRANSACTIONS if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mfbTransactionPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move MFB Transaction to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        action: 'Borrow (Male)',
                        state: 'Rivers',
                        state_key: 'RIV',
                        month: 'january',
                        year: '2021',
                        volume: 190592098,
                        value: 42142584834,
                    };
                    doc_store.business_process = 'mfb_transactions';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mfbTransactionPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('MFB TRANSACTION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * ATM LOCATIONS
     */
    it('should create Count Document for ATM LOCATION if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.atmLocationsPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move MFB Transaction to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 4.99426,
                        latitude: 8.34504,
                        category: 'Off Site ATM',
                        state: 'CROSS RIVER STATE',
                        state_code: 'cross_river',
                        lga: 'Calabar Municipality',
                        address: '2 Paliamentary Road Calabar.',
                        name: 'United Bank For Africa Plc',
                        no_of_atm: 1,
                        outlet_type: 'Branch',
                        mastercard_accepted: 'Yes',
                        visa_accepted: 'Yes',
                        quickteller_accepted: 'No',
                        verve_accepted: 'Yes',
                        netcash_accepted: 'No',
                        deposit_accepted: 'No',
                    };
                    doc_store.business_process = 'atm_locations';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.atmLocationsPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('ATM LOCATION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * BANK AGENTS LOCATIONS
     */
    it('should create Count Document for BANK AGENTS LOCATION if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.bankAgentsLocationsPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move BANK AGENTS LOCATION to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 4.55291,
                        latitude: 7.76157,
                        category: 'Bank Agent',
                        state: 'OSUN STATE',
                        state_code: 'osun',
                        lga: 'Osogbo',
                        address: 'No 55, Laro Street, Isale-Osun Osogbo',
                        name_of_agent: 'Badmus Saheed Ajibola',
                        type_of_outlet: 'Agent',
                        record_keeping: 'Manually (log)',
                        name_of_establishment: 'Alubarika Cyber Cafe',
                        standalone_business: 'Conduct Other Business',
                        other_business_conducted: 'Cafe',
                        bank: 'Sterling Bank Plc',
                        average_number_of_deposits_per_week: '0 - 25 Deposits',
                        average_number_of_withdrawals_per_week: '0 - 25 Withdrawals',
                    };
                    doc_store.business_process = 'bank_agents_locations';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.bankAgentsLocationsPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('BANK AGENTS LOCATION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * Pension Fund Admin Locations
     */
    it('should create Count Document for PFA LOCATION if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.pfaLocationsPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move PFA LOCATION to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 4.55291,
                        latitude: 7.76157,
                        regulating_body: 'PENCOM',
                        category: 'Pension Fund Administrator',
                        state: 'LAGOS STATE',
                        state_code: 'lagos',
                        lga: 'Ikeja',
                        address: 'The Infinite Plaza, Plot 4, Oyetubo Street, Off Obafemi Awolowo Way, Ikeja, Lagos',
                        name_of_pfa: 'Crusader Sterling Pensions Ltd',
                        type_of_outlet: 'Branch',
                        record_keeping: 'On-line System to Head Office',
                        group_pension: 'Yes',
                        investment_product: 'Yes',
                        other_financial_service: '',
                    };
                    doc_store.business_process = 'pension_fund_admin';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.pfaLocationsPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('PFA LOCATION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    // /************
    //  *
    //  *
    //  *
    //  * INSURANCE
    //  */
    it('should create Count Document for INSURANCE if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.insurancePipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move INSURANCE to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 5.03057,
                        latitude: 7.93417,
                        regulating_body: 'NAICOM',
                        category: 'Insurance company',
                        state: 'AKWA IBOM STATE',
                        state_code: 'akwa_ibom',
                        lga: 'Uyo',
                        address: '12 Nwaniba Road, Uyo.',
                        name: 'Nicon Insurance Limited',
                        type_of_outlet: 'Branch',
                        record_keeping: 'On-line System to Head Office',
                        property: 'Yes',
                        life: 'Yes',
                        health: 'No',
                        micro_insurance: 'No',
                        re_insurance: 'No',
                        other_financial_services: '',
                    };
                    doc_store.business_process = 'insurance';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.insurancePipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('INSURANCE SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * Microfinance Locations Pipeline
     */
    it('should create Count Document for MFB LOCATION if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mfbPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move MFB LOCATION to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 5.53408,
                        latitude: 7.46504,
                        category: 'Microfinance Institutions',
                        state: 'ABIA STATE',
                        state_code: 'abia',
                        lga: 'Umuahia North',
                        address: 'KILOMETER 3 UMUAHIA/OKIGWE ROAD',
                        name_of_bank: 'ABIA ADP MULTI PURPOSE COOPERATIVE SOCIETY LIMITED',
                        type_of_outlet: 'Head Office',
                        record_keeping: 'Manually (log)',
                        account_opening: 'Yes',
                        personal_loans: 'Yes',
                        business_loans: 'Yes',
                        savings: 'Yes',
                        transfers: 'No',
                        payment: 'Yes',
                        other_financial_services: 'FISHERY,POULTRY,EMPOWERMENT',
                    };
                    doc_store.business_process = 'mfb_locations';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mfbPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('MFB LOCATION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * CommercialBanks Locations Pipeline
     */
    it('should create Count Document for CMB LOCATION if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.cmbPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move CMB LOCATION to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 6.45484,
                        latitude: 3.38633,
                        category: 'Commercial Bank',
                        state: 'LAGOS STATE',
                        state_code: 'lagos',
                        lga: 'Lagos Island',
                        address: 'Broad Street, Lagos Island',
                        name_of_bank: 'Enterprise Bank',
                        no_of_atms: 2,
                        type_of_outlet: 'Branch',
                        account_opening: 'Yes',
                        personal_loans: 'No',
                        business_loans: 'No',
                        savings: 'Yes',
                        transfers: 'Yes',
                        payment: 'No',
                        other_financial_services: '',
                    };
                    doc_store.business_process = 'cmb_locations';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.cmbPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('CMB LOCATION SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * MortgageBank Pipeline
     */
    it('should create Count Document for MortgageBank if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mortgagePipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move MortgageBank to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 7.25741,
                        latitude: 5.18087,
                        category: 'Primary Mortgage Banks',
                        state: 'ONDO STATE',
                        state_code: 'ondo',
                        lga: 'Akure South',
                        address: '85, Oyemekun Bye Pass Junction Akure.',
                        name_of_bank: 'UNION HOMES SAVINGS AND LOAN.',
                        record_keeping: 'Independant Computer',
                        type_of_outlet: 'Branch',
                        sme_finance: 'Yes',
                        mortgage_finance: 'Yes',
                        infrastructure_finance: 'Yes',
                        savings: 'Yes',
                        transfers: 'Yes',
                        consumer_credit: 'Yes',
                        other_financial_services: '',
                    };
                    doc_store.business_process = 'mortgage_banks';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mortgagePipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('MORTGAGE SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * DFI Pipeline
     */
    it('should create Count Document for DFI if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.dfiPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move DFI to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 5.53314,
                        latitude: 7.48909,
                        category: 'Development Finance Institution',
                        state: 'ABIA STATE',
                        state_code: 'abia',
                        lga: 'Umuahia North',
                        address: '5/7, Nsukka Street, Umuahia',
                        name: 'Bank of Agriculture Limited',
                        record_keeping: 'On-line System to Head Office',
                        type_of_outlet: 'Branch',
                        sme_finance: 'Yes',
                        mortgage_finance: 'No',
                        infrastructure_finance: 'No',
                        agricultural_finance: 'Yes',
                        export_import_finance: 'No',
                        other_financial_services: '',
                    };
                    doc_store.business_process = 'development_finance_institution';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.dfiPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('DFI SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * MMO Pipeline
     */
    it('should create Count Document for MMO if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mmoPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move MMO to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 6.59729,
                        latitude: 3.34138,
                        category: 'Mobile Money Agent',
                        state: 'LAGOS STATE',
                        state_code: 'lagos',
                        lga: 'Ikeja',
                        address: '33, Obafemi Awolowo Way Ikeja',
                        name_of_agent: 'Lakemfa Technologies Limited',
                        type_of_outlet: 'Agent',
                        record_keeping: 'None',
                        name_of_establishment: 'Firstmonie',
                        standalone_business: 'Stand Alone',
                        other_business_conducted: '',
                        mmo: 'Ecobank Nigeria Plc - Ecobank Mobile Money',
                        average_number_of_deposits_per_week: '0 - 25 Deposits',
                        average_number_of_withdrawals_per_week: '0 - 25 Withdrawals',
                    };
                    doc_store.business_process = 'mmo';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.mmoPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('MMO SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * BDC Pipeline
     */
    it('should create Count Document for BDC if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.bdcPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move BDC to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 7.03038,
                        latitude: 5.48757,
                        category: 'Bureau de Change',
                        state: 'IMO STATE',
                        state_code: 'imo',
                        lga: 'Owerri-Urban (Owerri)',
                        address: '7 Douglas Road Owerri',
                        name: 'Africom Nigeria',
                        type_of_outlet: 'Head Office',
                        record_keeping: 'Manually (log)',
                        average_number_of_transactions_per_week: '0 - 25',
                        money_transfer: 'No',
                        currency_exchange: 'Yes',
                    };
                    doc_store.business_process = 'bdc';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.bdcPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('BDC SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * SEC Pipeline
     */
    it('should create Count Document for SEC if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.secPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move SEC to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        longitude: 4.53556,
                        latitude: 7.76311,
                        category: 'Issuing Houses',
                        state: 'OSUN STATE',
                        state_code: 'osun',
                        lga: 'Osogbo',
                        address: 'Ground Floor Suite, No 60 Km 5, Gbongan Ibadan Road Osogbo.',
                        regulating_body: 'Securities Exchange Commission',
                        name: 'Unicapital Plc',
                        type_of_outlet: 'Branch',
                        stock_brokering: 'No',
                        investment_banking: 'Yes',
                        investment_advising: 'Yes',
                        fund_managing: 'Yes',
                        collective_investment_schemes: 'Yes',
                        rating_agencies: 'No',
                        custodians: 'Yes',
                        record_keeping: 'On-line System to Head Office',
                        other_services: '',
                    };
                    doc_store.business_process = 'sec';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.secPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('SEC SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * COMPLAINT CATEGORY Pipeline
     */
    it('should create Count Document for COMPLAINT Category if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.complaintCategory()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move COMPLAINT Category to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        category: 'NEFT',
                        description: 'NEFT (NEFT)',
                    };
                    doc_store.business_process = 'complaint_category';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.complaintCategory()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COMPLAINT CATEGORY SEEDED');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * COMPLAINT Pipeline
     */
    it('should create Count Document for COMPLAINT if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.complaintPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move COMPLAINT to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        account_currency: 'NGN',
                        amount_in_dispute: 2100,
                        branch_name: '',
                        city: '',
                        complaint_category: 'POS',
                        complaint_description: 'CUSTOMER CALLD FOR FEEDBACK ON EXISTING SR AND CALL DROPPED',
                        complaint_subject: 'POS WRONG DEBIT',
                        country: 'NG',
                        date_closed: '2018-12-17T00:00:00.000Z',
                        date_received: '2018-12-17T00:00:00.000Z',
                        tracking_reference_no: '1-2033696318541',
                        state: 'LA',
                        status: 'Ongoing',
                    };
                    doc_store.business_process = 'complaint';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.complaintPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COMPLAINT SEEDED!!!');
                    return [2 /*return*/];
            }
        });
    }); });
    /************
     *
     *
     *
     * FRAUD Pipeline
     */
    it('should create Count Document for FRAUD if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.fraudPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should move FRAUD to MongoDB print a success message on the console', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc_store, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    doc_store = new document_store_1.default();
                    doc_store.file_content = {
                        amount_involved: 5400,
                        complaint_category: 'POS',
                        date_created: '2018-12-17T00:00:00.000Z',
                        date_reported: '2018-12-17T00:00:00.000Z',
                        desc_of_transaction: 'The agent is suspected to have committed fraud',
                        agent_code: 'AA094563782',
                        status: 'Ongoing',
                        comment: '',
                    };
                    doc_store.business_process = 'fraud';
                    doc_store.creation_date = new Date();
                    return [4 /*yield*/, docStoreRepository.save(doc_store)];
                case 1:
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, data_store_controller_1.default.fraudPipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('FRAUD SEEDED!!!');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data_store.controller.test.js.map