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
var fraudSchema = new mongoose_1.Schema({
    amount_involved: {
        type: Number,
        default: 0,
    },
    comment: {
        type: Number,
        default: 0,
    },
    complaint_category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ComplaintCategory',
    },
    date_created: {
        type: Date,
    },
    date_reported: {
        type: Date,
    },
    desc_of_transaction: {
        type: String,
    },
    status: {
        type: String,
    },
    financial_institution: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'FinancialInstitution',
    },
    agent_code: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('FraudTheftRobberies', fraudSchema);
//# sourceMappingURL=fraud_theft_robbery.model.js.map