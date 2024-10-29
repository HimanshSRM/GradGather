"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var userOperations_cjs_1 = require("./ts/userOperations.cjs");
var roomOperations_cjs_1 = require("./ts/roomOperations.cjs");
var msgOps = require("./ts/msgOperations.cjs");
var message_model_cjs_1 = require("./models/message.model.cjs");
var rooms_model_cjs_1 = require("./models/rooms.model.cjs");
require("./config/db.cjs");
var dotenv_1 = require("dotenv");
var disconnectUser_cjs_1 = require("./scripts/disconnectUser.cjs");
var joinUser_cjs_1 = require("./scripts/joinUser.cjs");
var usersRouter = require("./routes/users.cjs");
var messagesRouter = require("./routes/messages.cjs");
var roomsRouter = require("./routes/rooms.cjs");
var corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
dotenv_1.default.config(); // .env variables
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        // origins: "*:*",
        credentials: true,
        // optionSuccessStatus: 200,
    },
});
var usersInVoice = {};
var socketIds = [];
var roomIds = [];
var main = function (connectedUsers) {
    io.on("connection", function (socket) {
        var username;
        var room;
        console.log("new connection", socket.id);
        socket.on("join", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var roomId, _username, roomM, _a, _name, _roomId, messages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        roomId = data.roomId, _username = data._username;
                        return [4 /*yield*/, rooms_model_cjs_1.default.findOne({ _id: roomId }).exec()];
                    case 1:
                        roomM = _b.sent();
                        if (!!roomM) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, roomOperations_cjs_1.findLowestPositionRoom)()];
                    case 2:
                        _a = _b.sent(), _name = _a._name, _roomId = _a._roomId;
                        room = _name;
                        roomId = _roomId;
                        return [3 /*break*/, 4];
                    case 3:
                        room = roomM.name;
                        _b.label = 4;
                    case 4:
                        if (!(roomM && roomM.voice)) return [3 /*break*/, 5];
                        socket.emit("roomName", { name: room, roomId: roomId, voice: true });
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, (0, joinUser_cjs_1.sendInitMessages)(room)];
                    case 6:
                        messages = (_b.sent()).messages;
                        socket.emit("roomName", { name: room, roomId: roomId, voice: false });
                        socket.emit("messages", messages);
                        _b.label = 7;
                    case 7:
                        username = _username;
                        (0, joinUser_cjs_1.joinUser)(socket, connectedUsers, username, room);
                        console.log("== joined ".concat(username, " ").concat(socket.id));
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("disconnect", function () {
            (0, disconnectUser_cjs_1.disconnectUser)(socket, connectedUsers, username);
            (0, disconnectUser_cjs_1.emitDisconnect)(socket, io, roomIds, usersInVoice);
            (0, disconnectUser_cjs_1.popOut)(socketIds, usersInVoice, roomIds, socket.id);
            console.log("== disconnect ".concat(username, " ").concat(socket.id));
            Object.keys(connectedUsers).forEach(function (usr) {
                if (connectedUsers[usr].tabsOpen > 0) {
                    console.log(connectedUsers[usr]);
                }
            });
        });
        socket.on("popAccount", function (data) {
            console.log("deleting user", data.username);
            delete connectedUsers[data.username];
            console.log("user:", data.username);
        });
        socket.on("message", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var authentication, username, message, datetime, room, _id, sdata;
            return __generator(this, function (_a) {
                authentication = data.authentication, username = data.username, message = data.message, datetime = data.datetime, room = data.room;
                _id = msgOps.addToMongoose(__assign(__assign({}, data), { isFile: false }));
                sdata = {
                    _id: _id,
                    message: message,
                    user: username,
                    date: datetime,
                    isFile: false,
                    edited: false,
                };
                socket.emit("message", sdata);
                socket.in(room).emit("message", sdata);
                return [2 /*return*/];
            });
        }); });
        socket.on("deleteMessage", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var messageId, username, hash, message, _a, userHash, userStatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        messageId = data.messageId, username = data.username, hash = data.hash;
                        return [4 /*yield*/, message_model_cjs_1.default.findOne({ _id: messageId })];
                    case 1:
                        message = _b.sent();
                        return [4 /*yield*/, (0, userOperations_cjs_1.getUserHash)(username)];
                    case 2:
                        _a = _b.sent(), userHash = _a.userHash, userStatus = _a.userStatus;
                        if ((message.user === username && userHash === hash) || (userHash === hash && userStatus === "Admin")) {
                            message.remove();
                            socket.in(data.room).emit("messageDeleted", { success: true, _id: messageId });
                            socket.emit("messageDeleted", { success: true, _id: messageId });
                        }
                        else {
                            socket.emit("messageDeleted", { success: false, status: "You do not have privileges to delete that message..." });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("editMessage", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var _id, filter, msg, update;
            return __generator(this, function (_a) {
                _id = data._id;
                filter = { _id: _id };
                msg = data.messageHTML
                    .replace("</div><div>", "<br>")
                    .replace("<div>", "")
                    .replace("</div>", "<br>");
                console.log("%cmsg: ".concat(msg), "color: red");
                // msg = msg.substring(0, msg.length - 4);
                msg = replaceAll(msg, "<br>", "\n");
                update = { message: msg, edited: true };
                message_model_cjs_1.default.findOneAndUpdate(filter, update).exec();
                return [2 /*return*/];
            });
        }); });
        socket.on("file", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var _id, room;
            return __generator(this, function (_a) {
                _id = data._id, room = data.room;
                msgOps.sendFileData(_id, room, socket);
                return [2 /*return*/];
            });
        }); });
        socket.on("attachEmoji", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var _id, emoji, user, message, found, suspend, num, jData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = data._id, emoji = data.emoji, user = data.user;
                        console.log("server received emoji:", emoji, _id, user);
                        return [4 /*yield*/, message_model_cjs_1.default.findOne({ _id: _id })];
                    case 1:
                        message = _a.sent();
                        found = false;
                        suspend = false;
                        num = 1;
                        message.emojis.forEach(function (_emoji) {
                            if (_emoji.emoji === emoji) {
                                if (_emoji.users.includes(user) === false) {
                                    _emoji.num += 1;
                                    _emoji.users.push(user);
                                    found = true;
                                    num = _emoji.num;
                                }
                                else {
                                    suspend = true;
                                }
                            }
                        });
                        if (suspend) {
                            return [2 /*return*/];
                        }
                        else if (found === false) {
                            message.emojis.push({ emoji: emoji, num: 1, users: [user] });
                        }
                        jData = { emoji: emoji, num: num, _id: _id };
                        socket.emit("newEmoji", jData);
                        socket.in(data.room).emit("newEmoji", jData);
                        return [4 /*yield*/, message.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // #################################
        // #      WebRTC Signalling        #
        // #################################
        socket.on("joinVoice", function (data) {
            if (data.username === "") {
                // console.log("no username !!!!!!!!!!!");
                return;
            }
            var room = data.room, roomId = data.roomId, username = data.username;
            var payload = {
                id: socket.id,
                username: username,
            };
            if (usersInVoice[roomId] === undefined) {
                usersInVoice[roomId] = [];
            }
            // console.log("socketIds:", socketIds);
            // console.log("includes", socketIds.includes(socket.id));
            if (!socketIds.includes(socket.id)) {
                usersInVoice[roomId].push(payload);
                console.log("\n      ##########################################################\n      #            UsersN: ".concat(usersInVoice[roomId].length, "  ").concat(" ".repeat(33), "#\n      #            New user connected: ").concat(socket.id, " ").concat(" ".repeat(3), "#\n      #            RoomID: ").concat(roomId, "            #\n      #            Room: ").concat(room, "                    ").concat(" ".repeat(11), "#\n      ##########################################################\n"));
                // console.log("sent 0");
                socketIds.push(socket.id);
                roomIds.push(roomId);
                if (usersInVoice[roomId].length > 1) {
                    usersInVoice[roomId].forEach(function (user) {
                        // console.log("sent 1");
                        if (socket.id !== user.id) {
                            // console.log("sent to", user.id);
                            setTimeout(function () {
                                io.to(user.id).emit("joined", {
                                    to: user.id,
                                    from: socket.id,
                                    username: data.username,
                                });
                            }, 1000);
                        }
                    });
                }
            }
        });
        socket.on("offer", function (data) {
            // {id, text, roomId}
            console.log("* offer generated by: ".concat(socket.id, "; for: ").concat(data.id));
            io.to(data.id).emit("offer", {
                text: data.text,
                to: data.id,
                from: socket.id,
            });
        });
        socket.on("candidate", function (data) {
            console.log("* ice candidates generated by: ".concat(socket.id, "; for: ").concat(data.id));
            io.to(data.id).emit("candidate", {
                text: data.text,
                to: data.id,
                from: socket.id,
            });
        });
        socket.on("answer", function (data) {
            console.log("* answer generated by: ".concat(socket.id, "; for: ").concat(data.to));
            io.to(data.to).emit("answer", {
                text: data.text,
                to: data.id,
                from: socket.id,
            });
        });
        socket.on("toggleVideo", function (data) {
            // console.log(`users in ${data.roomId}: ${usersInVoice[data.roomId]}`);
            usersInVoice[data.roomId].forEach(function (user) {
                if (user.id !== socket.id) {
                    io.to(user.id).emit("changeStatus", {
                        id: socket.id,
                        status: data.status,
                    });
                }
            });
        });
        // socket.on("toggleAudio", (data) => {
        // console.log(`users in ${data.roomId}: ${usersInVoice[data.roomId]}`);
        // });
    });
    server.listen(PORT, function () { return console.log("Server is on PORT: ".concat(PORT)); });
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)(corsOptions));
    app.use(messagesRouter);
    app.use(usersRouter);
    app.use(roomsRouter);
};
// next two functions are taken out of stackoverflow
var escapeRegExp = function (arg) {
    return arg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
var replaceAll = function (str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), "g"), function () { return replacement; });
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var connectedUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, userOperations_cjs_1.usersStatus)()];
            case 1:
                connectedUsers = _a.sent();
                console.log(connectedUsers);
                main(connectedUsers);
                return [2 /*return*/];
        }
    });
}); })();
