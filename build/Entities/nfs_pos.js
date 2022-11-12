"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfs_pos = void 0;
var typeorm_1 = require("typeorm");
var nfs_pos = /** @class */ (function () {
    function nfs_pos() {
    }
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", Date)
    ], nfs_pos.prototype, "TransactionDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_pos.prototype, "SourceBank", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_pos.prototype, "DestinationBank", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_pos.prototype, "CollectionType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", Number)
    ], nfs_pos.prototype, "Volumn", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 18, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], nfs_pos.prototype, "value_", void 0);
    nfs_pos = __decorate([
        (0, typeorm_1.Entity)('nfs_pos')
    ], nfs_pos);
    return nfs_pos;
}());
exports.nfs_pos = nfs_pos;
exports.default = nfs_pos;
//# sourceMappingURL=nfs_pos.js.map