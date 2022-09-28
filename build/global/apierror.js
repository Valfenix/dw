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
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(message, ErrorID, code) {
        if (code === void 0) { code = null; }
        var _this = _super.call(this) || this;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = "api error";
        _this.message = message;
        if (ErrorID)
            _this.ErrorID = ErrorID;
        if (code)
            _this.code = code;
        return _this;
    }
    return APIError;
}(Error));
exports.default = APIError;
//# sourceMappingURL=apierror.js.map