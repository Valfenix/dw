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
var mmoSchema = new mongoose_1.Schema({
    longitude: Number,
    latitude: Number,
    category: String,
    category_code: String,
    state: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'State',
    },
    lga: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'LGA',
    },
    alias: String,
    address: String,
    outlet_type: String,
    establishment_name: String,
    name: String,
    standalone_business: String,
    record_keeping: String,
    other_business: String,
    mmo_name: String,
    average_weekly_deposit: String,
    average_weekly_withdrawal: String,
    other_financial_services: { type: String },
    key: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('MobileMoneyOperator', mmoSchema);
//# sourceMappingURL=mmo.model.js.map