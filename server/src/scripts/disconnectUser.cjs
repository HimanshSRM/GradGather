"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popOut = exports.emitDisconnect = exports.disconnectUser = void 0;
var disconnectUser = function (socket, connectedUsers, username) {
    var id = socket.id;
    var user = connectedUsers[username];
    if (user !== undefined) {
        connectedUsers[username].tabsOpen--;
        connectedUsers[username].socketIds = connectedUsers[username].socketIds.filter(function (_id) { return _id !== id; });
        if (connectedUsers[username].tabsOpen <= 0) {
            socket.broadcast.emit("offline", { username: username });
            connectedUsers[username].status = "offline";
        }
    }
    else {
        Object.keys(connectedUsers).forEach(function (userN) {
            user = connectedUsers[userN];
            if (user.socketIds.includes("".concat(id))) {
                connectedUsers[userN].socketIds = user.socketIds.filter(function (el) { return el !== id; });
                connectedUsers[userN].tabsOpen--;
                return;
            }
        });
    }
};
exports.disconnectUser = disconnectUser;
var emitDisconnect = function (socket, io, roomIds, usersInVoice) {
    // emit disconnect message for voice chat users
    roomIds.forEach(function (roomid) {
        usersInVoice[roomid].forEach(function (user) {
            if (user.id === socket.id) {
                usersInVoice[roomid].forEach(function (user0) {
                    if (user0.id !== socket.id) {
                        console.log("'peerDisconnect' emitted...");
                        io.to(user0.id).emit("peerDisconnected", { id: socket.id });
                    }
                });
            }
        });
    });
};
exports.emitDisconnect = emitDisconnect;
// _id === socket.id
var popOut = function (socketIds, usersInVoice, roomIds, _id) {
    socketIds = socketIds.filter(function (id, n) {
        if (id !== _id) {
            return id;
        }
        else {
            usersInVoice[roomIds[n]] = usersInVoice[roomIds[n]].filter(function (el) { return el.id !== _id; });
            roomIds = roomIds.filter(function (r, n0) { return n0 !== n; });
        }
    });
};
exports.popOut = popOut;
