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
exports.DatabaseService = void 0;
var typeorm_1 = require("typeorm");
var events_1 = require("events");
var nfs_pos_bank_list_1 = __importDefault(require("../Entities/nfs_pos_bank_list"));
var nfs_nip_bank_list_1 = __importDefault(require("../Entities/nfs_nip_bank_list"));
var nfs_pos_1 = __importDefault(require("../Entities/nfs_pos"));
var nfs_nip_trans_1 = __importDefault(require("../Entities/nfs_nip_trans"));
var document_store_1 = __importDefault(require("../Entities/document_store"));
// import collection_type from '../Entities/collection_type';
var logger_1 = __importDefault(require("../lib/logger"));
var constants_1 = require("../config/constants");
// import config from '../config/config';
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
    }
    DatabaseService.getConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DatabaseService.registerEvent();
                        return [4 /*yield*/, DatabaseService.createConnection()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.registerEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                DatabaseService.Emitter.on('DB_CONN_ERROR', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        DatabaseService.logger.error('Database connection error... Retrying...');
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, DatabaseService.createConnection()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 10000);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    DatabaseService.createConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.createConnections)([
                            {
                                name: 'UTILITYAPPDB',
                                type: 'mysql',
                                host: String(process.env.MYSQL_DB_HOST1),
                                username: String(process.env.MYSQL_DB_USERNAME1),
                                password: String(process.env.MYSQL_DB_PASSWORD1),
                                port: Number(process.env.MYSQL_DB_PORT1),
                                database: String(process.env.MYSQL_DB_DATABASE1),
                                synchronize: false,
                                logging: false,
                                entities: [
                                    nfs_pos_bank_list_1.default,
                                    nfs_pos_1.default,
                                    //  collection_type
                                ],
                            },
                            {
                                name: 'NIPDB',
                                type: 'mysql',
                                host: String(process.env.MYSQL_DB_HOST2),
                                username: String(process.env.MYSQL_DB_USERNAME2),
                                password: String(process.env.MYSQL_DB_PASSWORD2),
                                port: Number(process.env.MYSQL_DB_PORT2),
                                database: String(process.env.MYSQL_DB_DATABASE2),
                                synchronize: false,
                                logging: false,
                                entities: [
                                    nfs_nip_bank_list_1.default,
                                    //  collection_type,
                                    nfs_nip_trans_1.default,
                                ],
                            },
                            {
                                name: 'POSTGRES',
                                type: 'postgres',
                                host: String(process.env.POSTGRES_DB_HOST),
                                username: String(process.env.POSTGRES_DB_USERNAME),
                                password: String(process.env.POSTGRES_DB_PASSWORD),
                                port: Number(process.env.POSTGRES_DB_PORT),
                                database: String(process.env.POSTGRES_DB_DATABASE),
                                synchronize: false,
                                logging: false,
                                entities: [document_store_1.default],
                            },
                        ])
                            .then(function () {
                            DatabaseService.logger.info('Connected to MYSQL UTILITY_APP_DB AND MYSQL NIP_DB & POSTGRES CBN');
                        })
                            .catch(function (_err) {
                            console.log(_err);
                            // now do retry //
                            DatabaseService.logger.error('Database connection error... Retrying...');
                            DatabaseService.Emitter.emit('DB_CONN_ERROR');
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.Emitter = new events_1.EventEmitter();
    DatabaseService.logger = new logger_1.default('db', constants_1.DATABASE_NAMESPACE);
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=MysqlDBConnection.js.map