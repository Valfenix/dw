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
var nfs_pos_bank_list_1 = __importDefault(require("../../Entities/nfs_pos_bank_list"));
var nfs_nip_bank_list_1 = __importDefault(require("../../Entities/nfs_nip_bank_list"));
var bank_controller_1 = __importDefault(require("../../controllers/bank.controller"));
var bank_model_1 = __importDefault(require("../../models/bank.model"));
var MysqlDBConnection_1 = require("../../services/MysqlDBConnection");
var bankPosRepository;
var bankNipRepository;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MysqlDBConnection_1.DatabaseService.getConnection()];
            case 1:
                _a.sent();
                bankPosRepository = (0, typeorm_1.getRepository)(nfs_pos_bank_list_1.default, 'MYSQL');
                bankNipRepository = (0, typeorm_1.getRepository)(nfs_nip_bank_list_1.default, 'MYSQL');
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
            case 0: return [4 /*yield*/, bank_model_1.default.remove({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, bankPosRepository.delete({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, bankNipRepository.delete({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, index_1.default.close()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('POST /bank', function () {
    it('returns status code 400 when a field is missing for POS', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/bank/create-pos').send({})];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 400 when a field is missing for NIP', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/bank/create-nip').send({})];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 409 when bank exists already from POS', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bank, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    bank = new nfs_pos_bank_list_1.default();
                    bank.bankname = 'Zenith Bank';
                    // bank.bank_code = 190884;
                    // bank.bank_category = 'DMB';
                    return [4 /*yield*/, bankPosRepository.save(bank)];
                case 1:
                    // bank.bank_code = 190884;
                    // bank.bank_category = 'DMB';
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/bank/create-pos').send({
                            bankname: 'Zenith Bank',
                            bank_code: 190884,
                            bank_category: 'DMB',
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 409 when bank exists already for NIP', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bank, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    bank = new nfs_pos_bank_list_1.default();
                    bank.bankname = 'Zenith Bank';
                    // bank.bank_code = 190886;
                    // bank.bank_category = 'DMB';
                    return [4 /*yield*/, bankNipRepository.save(bank)];
                case 1:
                    // bank.bank_code = 190886;
                    // bank.bank_category = 'DMB';
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/bank/create-nip').send({
                            bankname: 'Zenith Bank',
                            bank_code: 190886,
                            bank_category: 'DMB',
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 201 when bank is saved successfully for POS', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    return [4 /*yield*/, bankPosRepository.delete({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/bank/create-pos').send({
                            bankname: 'Zenith Bank',
                            bank_code: 134884,
                            bank_category: 'DMB',
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns status code 201 when bank is saved successfully for NIP', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    return [4 /*yield*/, bankNipRepository.delete({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).post('/api/v2/bank/create-nip').send({
                            bankname: 'Access Bank',
                            bank_code: 675,
                            bank_category: 'DMB',
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should pass the bank cron job, return and create a source bank payload from POS', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bank, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    bank = new nfs_pos_bank_list_1.default();
                    bank.bankname = 'Zenith Bank';
                    // bank.bank_code = 190884;
                    // bank.bank_category = 'DMB';
                    return [4 /*yield*/, bankPosRepository.save(bank)];
                case 1:
                    // bank.bank_code = 190884;
                    // bank.bank_category = 'DMB';
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, bank_controller_1.default.bankListPipelinePos()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('POS BANK CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
    it('it should pass the bank cron job, return and create a source bank payload from NIP', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bank, check, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(10000);
                    bank = new nfs_pos_bank_list_1.default();
                    bank.bankname = 'Zenith Bank';
                    // bank.bank_code = 190884;
                    // bank.bank_category = 'DMB';
                    return [4 /*yield*/, bankNipRepository.save(bank)];
                case 1:
                    // bank.bank_code = 190884;
                    // bank.bank_category = 'DMB';
                    _a.sent();
                    check = { schedule: jest.fn() };
                    logSpy = jest.spyOn(console, 'log');
                    check.schedule.mockImplementationOnce(function (frequency, callback) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [4 /*yield*/, bank_controller_1.default.bankListPipelineNip()];
                case 2:
                    _a.sent();
                    expect(logSpy).toBeCalledWith('NIP BANK CREATED');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=bank.controller.test.js.map