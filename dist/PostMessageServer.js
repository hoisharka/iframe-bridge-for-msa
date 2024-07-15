"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessageServer = void 0;
var uuid_1 = require("uuid");
/**
 * postMessage 데이터 제공자
 */
var PostMessageServer = /** @class */ (function () {
    function PostMessageServer(options) {
        this._handlers = {};
        console.log('[ PostMessageServer ] options', options);
        this._clientOrigin = (options === null || options === void 0 ? void 0 : options.clientOrigin) || location.origin;
        this._clientWindowGetter = (options === null || options === void 0 ? void 0 : options.clientWindowGetter) || (function () { return window; });
        this._uuid = (0, uuid_1.v4)();
    }
    Object.defineProperty(PostMessageServer.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        enumerable: false,
        configurable: true
    });
    PostMessageServer.prototype.setServer = function (_a) {
        var _this = this;
        var key = _a.key, handler = _a.handler;
        // 중복키로 이벤트 설정하지 않도록 unset처리.
        this.unsetServer(key);
        this._handlers[key] = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var requestMessage, data, messageObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestMessage = e.data;
                        if (!(e.origin === this._clientOrigin && // 서버 origin과 클라이언트가 타겟으로 지정한 origin이 일치 확인
                            requestMessage.key === key && // 데이터 요청에 대한 키값 일치 확인
                            requestMessage.isRequest) // 데이터 요청으로 들어온 내용인지 확인.
                        ) return [3 /*break*/, 2]; // 데이터 요청으로 들어온 내용인지 확인.
                        return [4 /*yield*/, handler(e.data)];
                    case 1:
                        data = _a.sent();
                        messageObj = { key: key, data: data, isResponse: true };
                        this._clientWindowGetter().postMessage(messageObj, requestMessage.clientOrigin);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        window.addEventListener('message', this._handlers[key]);
    };
    PostMessageServer.prototype.unsetServer = function (key) {
        if (this._handlers[key]) {
            window.removeEventListener('message', this._handlers[key]);
            delete this._handlers[key];
        }
    };
    return PostMessageServer;
}());
exports.PostMessageServer = PostMessageServer;
