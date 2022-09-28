"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var secSchema = new mongoose_1.Schema({
    longitude: Number,
    latitude: Number,
    category: String,
    state: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'State',
    },
    lga: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'LGA',
    },
    alias: String,
    regulating_body: String,
    name: String,
    outlet_type: String,
    address: String,
    record_keeping: String,
    stock_brokering: { type: String, default: 'false' },
    investment_banking: { type: String, default: 'false' },
    investment_advising: { type: String, default: 'false' },
    collective_investment_schemes: { type: String, default: 'false' },
    rating_agencies: { type: String, default: 'false' },
    custodians: { type: String, default: 'false' },
    fund_managing: { type: String, default: 'false' },
    other_financial_services: { type: String },
    key: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('SecuritiesExchangeComm', secSchema);
//# sourceMappingURL=sec.model.js.map