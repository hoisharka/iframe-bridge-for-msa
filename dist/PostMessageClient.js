"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessageClient = void 0;
/**
 * postMessage 데이터 요청자
 */
var PostMessageClient = /** @class */ (function () {
    function PostMessageClient(options) {
        this._serverOrigin = (options === null || options === void 0 ? void 0 : options.serverOrigin) || location.origin;
        this._serverWindow = (options === null || options === void 0 ? void 0 : options.serverWindow) || window;
    }
    PostMessageClient.prototype.request = function (_a) {
        var _this = this;
        var key = _a.key, data = _a.data;
        return new Promise(function (resolve) {
            var handler = function (e) {
                if (e.data.key === key && e.data.isResponse) {
                    // console.log('@@@@@@@@@@@@@@@@@@@@@@@', e.data.key, key)
                    resolve(e.data.data);
                    window.removeEventListener('message', handler);
                }
            };
            window.addEventListener('message', handler);
            var messageObj = {
                key: key,
                data: data,
                isRequest: true,
                clientOrigin: location.origin,
            };
            _this._serverWindow.postMessage(messageObj, _this._serverOrigin);
        });
    };
    return PostMessageClient;
}());
exports.PostMessageClient = PostMessageClient;
