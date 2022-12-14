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
exports.nfs_nip = void 0;
var typeorm_1 = require("typeorm");
var nfs_nip = /** @class */ (function () {
    function nfs_nip() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], nfs_nip.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", Date)
    ], nfs_nip.prototype, "TransactionDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_nip.prototype, "SourceBank", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_nip.prototype, "DestinationBank", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_nip.prototype, "CollectionType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", Number)
    ], nfs_nip.prototype, "Volumn", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 18, scale: 2 }),
        __metadata("design:type", Number)
    ], nfs_nip.prototype, "value_", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], nfs_nip.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], nfs_nip.prototype, "updatedAt", void 0);
    nfs_nip = __decorate([
        (0, typeorm_1.Entity)('nfs_nip')
    ], nfs_nip);
    return nfs_nip;
}());
exports.nfs_nip = nfs_nip;
exports.default = nfs_nip;
//# sourceMappingURL=nfs_nip.js.map