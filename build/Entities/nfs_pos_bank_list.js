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
exports.nfs_pos_bank_list = void 0;
var typeorm_1 = require("typeorm");
var nfs_pos_bank_list = /** @class */ (function () {
    function nfs_pos_bank_list() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], nfs_pos_bank_list.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], nfs_pos_bank_list.prototype, "bankname", void 0);
    nfs_pos_bank_list = __decorate([
        (0, typeorm_1.Entity)('nfs_pos_bank_list')
    ], nfs_pos_bank_list);
    return nfs_pos_bank_list;
}());
exports.nfs_pos_bank_list = nfs_pos_bank_list;
exports.default = nfs_pos_bank_list;
//# sourceMappingURL=nfs_pos_bank_list.js.map