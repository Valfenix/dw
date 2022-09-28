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
exports.DocumentStore = void 0;
var typeorm_1 = require("typeorm");
var DocumentStore = /** @class */ (function () {
    function DocumentStore() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], DocumentStore.prototype, "file_id", void 0);
    __decorate([
        (0, typeorm_1.Column)('simple-json', { nullable: true }),
        __metadata("design:type", Object)
    ], DocumentStore.prototype, "file_content", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: null }),
        __metadata("design:type", String)
    ], DocumentStore.prototype, "business_process", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], DocumentStore.prototype, "creation_date", void 0);
    DocumentStore = __decorate([
        (0, typeorm_1.Entity)({ name: 'document_store' })
    ], DocumentStore);
    return DocumentStore;
}());
exports.DocumentStore = DocumentStore;
exports.default = DocumentStore;
//# sourceMappingURL=document_store.js.map