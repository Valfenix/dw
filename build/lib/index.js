"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var logger_1 = __importDefault(require("./logger"));
var constants_1 = require("../config/constants");
var logger = new logger_1.default('server', constants_1.GENERAL_NAMESPACE);
/** Generate and sign a user Token */
var generateToken = function (data, timeToLive) {
    if (timeToLive === void 0) { timeToLive = config_1.default.server.token.expireTime; }
    return new Promise(function (resolve, _reject) {
        var signOptions = {
            issuer: "".concat(config_1.default.server.token.issuer),
            subject: 'NFS-DATAWARE-HOUSE [Author: Valentine Offiah.]',
            algorithm: 'HS256',
            audience: ['The Universe'],
        };
        signOptions.expiresIn = timeToLive;
        console.log(data);
        jsonwebtoken_1.default.sign(data, String(config_1.default.server.token.secret), signOptions, function (err, token) {
            if (err) {
                console.log(err.message);
            }
            resolve(token);
        });
    });
};
// const errorResponse = (
//   res: Response,
//   code: number,
//   message: string | Record<string, any>,
//   extra?: any
// ) => {
//   return res.status(code).json({
//     success: false,
//     code: code,
//     message: message,
//     extra,
//   });
// };
// const successResponse = (
//   res: Response,
//   code: number,
//   message: string | Record<string, any>,
//   extra?: any
// ) => {
//   return res.status(code).json({
//     success: true,
//     message: message,
//     extra,
//   });
// };
var convertMonthToNumber = function (monthName) {
    var months = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
    };
    return months[monthName.substring(0, 3).toLowerCase()] + 1;
};
exports.default = {
    generateToken: generateToken,
    // errorResponse,
    // successResponse,
    convertMonthToNumber: convertMonthToNumber,
};
//# sourceMappingURL=index.js.map