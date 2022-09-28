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
var winston_1 = __importDefault(require("winston"));
var dateFormat = function () {
    return new Date(Date.now()).toUTCString();
};
var LoggerService = /** @class */ (function () {
    function LoggerService(route, namespace) {
        var _this = this;
        if (namespace === void 0) { namespace = undefined; }
        this.log_data = null;
        this.route = route;
        this.namespace = namespace;
        var logger = winston_1.default.createLogger({
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: "./logs/".concat(route, ".log"),
                }),
            ],
            format: winston_1.default.format.printf(function (info) {
                var message = "".concat(dateFormat(), " | ").concat(namespace, " | ").concat(info.level.toUpperCase(), " | ").concat(route, ".log | ").concat(info.message);
                message = info.obj
                    ? message + "data:".concat(JSON.stringify(info.obj), " | ")
                    : message;
                message = _this.log_data
                    ? message + "log_data:".concat(JSON.stringify(_this.log_data), " | ")
                    : message;
                return message;
            }),
        });
        this.logger = logger;
    }
    LoggerService.prototype.setLogData = function (log_data) {
        this.log_data = log_data;
    };
    LoggerService.prototype.info = function (message, obj) {
        if (obj === void 0) { obj = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("info", message, { obj: obj });
                return [2 /*return*/];
            });
        });
    };
    LoggerService.prototype.debug = function (message, obj) {
        if (obj === void 0) { obj = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("debug", message, {
                    obj: obj,
                });
                return [2 /*return*/];
            });
        });
    };
    LoggerService.prototype.error = function (message, obj) {
        if (obj === void 0) { obj = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("error", message, {
                    obj: obj,
                });
                return [2 /*return*/];
            });
        });
    };
    return LoggerService;
}());
exports.default = LoggerService;
//# sourceMappingURL=logger.js.map