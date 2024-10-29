"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInitMessages = exports.joinUser = void 0;
var message_model_cjs_1 = require("../models/message.model.cjs");
var joinUser = function (socket, connectedUsers, username, room) {
    var user = connectedUsers[username];
    var id = socket.id;
    if (user === undefined) {
        connectedUsers[username] = { status: "online", tabsOpen: 1, socketIds: [id] };
    }
    else if (user.tabsOpen === 0) {
        connectedUsers[username].status = "online";
        connectedUsers[username].tabsOpen = 1;
        connectedUsers[username].socketIds.push(id);
        socket.broadcast.emit("online", { username: username });
    }
    else if (!user.socketIds.includes(id)) {
        connectedUsers[username].tabsOpen++;
        connectedUsers[username].socketIds.push(id);
    }
    Object.keys(connectedUsers).forEach(function (usr) {
        if (connectedUsers[usr].tabsOpen > 0) {
            console.log(connectedUsers[usr]);
        }
    });
    // let status: connectedUsersT = connectedUsers;
    // Object.keys(status).forEach((userN: string) => {
    //     status[userN].socketIds = [];
    // });
    // socket.emit("status", status);
    socket.emit("status", connectedUsers);
    socket.join(room);
};
exports.joinUser = joinUser;
var sendInitMessages = function (room) {
    return new Promise(function (resolve, reject) {
        message_model_cjs_1.default.find({ room: room })
            .sort({ number: -1 })
            .limit(15)
            .exec()
            .then(function (doc) { return resolve({ messages: doc.reverse() }); });
    });
};
exports.sendInitMessages = sendInitMessages;
