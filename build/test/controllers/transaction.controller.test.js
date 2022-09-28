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
var collection_type_1 = __importDefault(require("../../Entities/collection_type"));
var nfs_pos_1 = __importDefault(require("../../Entities/nfs_pos"));
var MysqlDBConnection_1 = require("../../services/MysqlDBConnection");
var transaction_controller_1 = __importDefault(require("../../controllers/transaction.controller"));
var nfs_nip_1 = __importDefault(require("../../Entities/nfs_nip"));
var collectionTypeRepository;
var transactionPosRepository;
var transactionNipRepository;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MysqlDBConnection_1.DatabaseService.getConnection()];
            case 1:
                _a.sent();
                collectionTypeRepository = (0, typeorm_1.getRepository)(collection_type_1.default, 'MYSQL');
                transactionPosRepository = (0, typeorm_1.getRepository)(nfs_pos_1.default, 'MYSQL');
                transactionNipRepository = (0, typeorm_1.getRepository)(nfs_nip_1.default, 'MYSQL');
                return [4 /*yield*/, doc_count_model_1.default.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doc_count_model_1.default.remove({})];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, collectionTypeRepository.delete({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, transactionPosRepository.delete({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, transactionNipRepository.delete({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, doc_count_model_1.default.remove({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, index_1.default.close()];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('POST /Transactions', function () {
    it('returns status code 400 when a field is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/transaction/create-collection').send({})];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 409 when collection type exists already', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cat, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    cat = new collection_type_1.default();
                    cat.description = 'mCASH Unsuccessful';
                    cat.category = 'mCASH';
                    cat.success = false;
                    cat.code = 10001;
                    return [4 /*yield*/, collectionTypeRepository.save(cat)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/transaction/create-collection').send({
                            description: 'mCASH Unsuccessful',
                            category: 'mCASH',
                            success: false,
                            code: 10001,
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 201 when collection type is inserted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/transaction/create-collection').send({
                            description: 'mCASH Unsuccessful',
                            category: 'mCASH',
                            success: true,
                            code: 3001,
                        })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should pass the collectionType cron job, return and create a collection type payload', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cat, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    cat = new collection_type_1.default();
                    cat.description = 'POS Unsuccessful';
                    cat.category = 'POS';
                    cat.success = false;
                    return [4 /*yield*/, collectionTypeRepository.save(cat)];
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
                    return [4 /*yield*/, transaction_controller_1.default.collectionTypePipeline()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COLLECTION CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 400 when a field is missing while creating a POS transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/v2/transaction/create-pos-transaction')
                        .send({})];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 201 when POS transaction saves successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/v2/transaction/create-pos-transaction')
                            .send({
                            CollectionType: '100021',
                            TransactionDate: new Date('2022-05-30 18:54:50.346047'),
                            SourceBank: '7',
                            DestinationBank: '9',
                            Volumn: 4098,
                            value_: 2314568.63,
                        })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 400 when a field is missing while creating a NIP transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                        .post('/api/v2/transaction/create-nip-transaction')
                        .send({})];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 201 when NIP transaction saves successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/v2/transaction/create-nip-transaction')
                            .send({
                            CollectionType: '1003301',
                            TransactionDate: new Date('2022-05-22 18:54:50.346047'),
                            SourceBank: '7',
                            DestinationBank: '9',
                            Volumn: 4300,
                            value_: 234568.63,
                        })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create Count Document for POS Transaction if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
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
                    return [4 /*yield*/, transaction_controller_1.default.posTransactionPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create Count Document for NIP Transaction if missing', function () { return __awaiter(void 0, void 0, void 0, function () {
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
                    return [4 /*yield*/, transaction_controller_1.default.nipTransactionPipeline()];
                case 1:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('COUNT CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=transaction.controller.test.js.map