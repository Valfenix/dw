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
var InsuranceSchema = new mongoose_1.Schema({
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
    name: String,
    address: String,
    regulating_body: String,
    outlet_type: String,
    record_keeping: String,
    property: { type: String, default: 'false' },
    life: { type: String, default: 'false' },
    health: { type: String, default: 'false' },
    micro_insurance: { type: String, default: 'false' },
    re_insurance: { type: String, default: 'false' },
    other_financial_services: { type: String, default: 'false' },
    key: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('InsuranceBank', InsuranceSchema);
//# sourceMappingURL=insurance.model.js.map