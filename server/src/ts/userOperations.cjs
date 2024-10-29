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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.getUserHash = exports.usersStatus = exports.checkData = exports.checkLogin = exports.addIp = exports.registerUser = void 0;
var roomOperations_cjs_1 = require("./roomOperations.cjs");
var user_model_cjs_1 = require("../models/user.model.cjs");
var saveModel_cjs_1 = require("./saveModel.cjs");
var mongoose_1 = require("mongoose");
var sha1 = require("sha1");
var bufferData = function (username, password) { return sha1("".concat(username).concat(password)); };
var registerUser = function (username, hashedPassword, ip) { return __awaiter(void 0, void 0, void 0, function () {
    var users, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_cjs_1.default.find({ username: username })];
            case 1:
                users = _a.sent();
                if (users.length === 0) {
                    user = new user_model_cjs_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        username: username,
                        password: hashedPassword,
                        hashId: bufferData(username, hashedPassword),
                        ip: ip,
                        status: "user",
                    });
                    (0, saveModel_cjs_1.default)(user);
                    return [2 /*return*/, { success: true }];
                }
                else {
                    return [2 /*return*/, { success: false, data: "username exist" }];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var addIp = function (username, ip) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_cjs_1.default.findOneAndUpdate({ username: username }, { ip: ip })
                    .exec()
                    .then(function (_) { return console.log("ip ".concat(ip, " added...")); })
                    .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addIp = addIp;
var checkData = function (hashId) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, rooms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_cjs_1.default.find({ hashId: hashId }).exec()];
            case 1:
                doc = _a.sent();
                if (!(doc.length !== 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, roomOperations_cjs_1.loadRooms)()];
            case 2:
                rooms = _a.sent();
                return [2 /*return*/, {
                        success: true,
                        username: doc[0].username,
                        authentication: doc[0].hashId,
                        rooms: rooms
                    }];
            case 3: return [2 /*return*/, {
                    success: false
                }];
        }
    });
}); };
exports.checkData = checkData;
var checkLogin = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, pswrd, hashId, _roomId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_cjs_1.default.findOne({ username: username }).exec()];
            case 1:
                user = _a.sent();
                if (!(user == undefined)) return [3 /*break*/, 2];
                return [2 /*return*/, { success: false }];
            case 2:
                pswrd = String(user.password);
                if (!(password === pswrd)) return [3 /*break*/, 4];
                hashId = user.hashId;
                return [4 /*yield*/, (0, roomOperations_cjs_1.findLowestPositionRoom)()];
            case 3:
                _roomId = (_a.sent())._roomId;
                return [2 /*return*/, {
                        success: true,
                        roomId: _roomId,
                        hashId: hashId
                    }];
            case 4: return [2 /*return*/, { success: false }];
        }
    });
}); };
exports.checkLogin = checkLogin;
var usersStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = {};
                return [4 /*yield*/, user_model_cjs_1.default.find()
                        .exec()
                        .then(function (doc) {
                        doc.forEach(function (el) {
                            users[el.username] = {
                                status: "offline",
                                tabsOpen: 0,
                                socketIds: []
                            };
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
exports.usersStatus = usersStatus;
var getUserHash = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                user_model_cjs_1.default.findOne({ username: username })
                    .then(function (user) {
                    resolve({ userHash: user.hashId, userStatus: user.status });
                });
                // reject({ userHash: null });
            })];
    });
}); };
exports.getUserHash = getUserHash;
