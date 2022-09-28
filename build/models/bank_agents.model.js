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
var BankAgentsSchema = new mongoose_1.Schema({
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
    alias: {
        type: String,
    },
    no_of_atm: {
        type: Number,
        default: 0,
    },
    address: String,
    record_keeping: String,
    outlet_type: String,
    establishment_name: String,
    name: String,
    standalone_business: String,
    other_business: String,
    bank: String,
    average_weekly_deposit: String,
    average_weekly_withdrawal: String,
    key: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('BankAgent', BankAgentsSchema);
//# sourceMappingURL=bank_agents.model.js.map