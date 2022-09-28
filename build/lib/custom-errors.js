"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerException = exports.NotFoundException = exports.BadRequestException = void 0;
var BadRequestException = /** @class */ (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BadRequestException;
}(Error));
exports.BadRequestException = BadRequestException;
var NotFoundException = /** @class */ (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotFoundException;
}(Error));
exports.NotFoundException = NotFoundException;
var ServerException = /** @class */ (function (_super) {
    __extends(ServerException, _super);
    function ServerException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerException;
}(Error));
exports.ServerException = ServerException;
//# sourceMappingURL=custom-errors.js.map