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
var MonthlyComplaintSchema = new mongoose_1.Schema({
    amount_in_dispute: {
        type: Number,
    },
    complaint_category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ComplaintCategory',
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    date_received: {
        type: Date,
    },
    status: {
        type: String,
        // enum: ["Ongoing, Resolved, Pending"]
    },
    count: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('MonthlyComplaintSummary', MonthlyComplaintSchema);
//# sourceMappingURL=monthly_complaint_summary.model.js.map