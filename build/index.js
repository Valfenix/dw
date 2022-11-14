"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("./config/config"));
var index_routes_1 = __importDefault(require("./routes/index.routes"));
var logger_1 = __importDefault(require("./lib/logger"));
// import { PostgresDatabaseService } from './services/PostgreDBConnection';
var PostGresDBConnection_1 = require("./services/PostGresDBConnection");
var MysqlDBConnection_1 = require("./services/MysqlDBConnection");
var MongoDBConnection_1 = __importDefault(require("./services/MongoDBConnection"));
var NAMESPACE = 'SERVER';
var router = (0, express_1.default)();
var logger = new logger_1.default('server', NAMESPACE);
router.use((0, cors_1.default)());
MysqlDBConnection_1.DatabaseService.getConnection();
PostGresDBConnection_1.PostGresDatabaseService.getConnection();
MongoDBConnection_1.default.MongooseService();
/** Log the request */
router.use(function (req, res, next) {
    /** Log the req */
    logger.info("METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        /** Log the res */
        logger.info("METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/**
 *  View engine setup
 */
router.set('views', path_1.default.join(__dirname, 'views'));
router.set('view engine', 'pug');
/** Parse the body of the request */
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.static(__dirname));
/** Rules of our API */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
router.use('/api/v2', index_routes_1.default);
/** Error handling */
router.use(function (_req, res, _next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message,
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () {
    logger.info("Server is running on ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port));
});
exports.default = httpServer;
//# sourceMappingURL=index.js.map