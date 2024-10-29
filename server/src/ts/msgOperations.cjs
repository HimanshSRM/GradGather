"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFileData = exports.addToMongoose = void 0;
var message_model_cjs_1 = require("../models/message.model.cjs");
var mongoose_1 = require("mongoose");
var saveModel_cjs_1 = require("./saveModel.cjs");
var num = 0;
// find the maximum number value (the newest message)
message_model_cjs_1.default.find({})
    .sort({ number: -1 })
    .limit(1)
    .exec()
    .then(function (res) {
    // console.log("res:", res);
    if (res.length !== 0) {
        num = res[0].number + 1;
    }
});
var addToMongoose = function (data) {
    var newMessageModel;
    if (data.isFile) {
        newMessageModel = new message_model_cjs_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            user: data.username,
            isFile: true,
            originalName: data.originalName,
            path: data.path, // <----
            date: data.datetime, // <----
            room: data.room,
            roomId: data.roomId, // <----
            downloadCount: 0,
            size: data.size,
            emojis: [], //[{emoji: 2, num: 1}, {emoji: 1, num: 4}],
            number: num,
        });
    }
    else {
        newMessageModel = new message_model_cjs_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            isFile: false,
            user: data.username,
            message: data.message,
            date: data.datetime,
            room: data.room,
            roomId: data.roomId,
            emojis: [], //[{emoji: 2, num: 1}, {emoji: 1, num: 4}],
            number: num,
        });
    }
    num++;
    (0, saveModel_cjs_1.default)(newMessageModel);
    return newMessageModel._id;
};
exports.addToMongoose = addToMongoose;
var sendFileData = function (_id, room, socket) {
    message_model_cjs_1.default.findById(_id).then(function (doc) {
        console.log("doc", doc);
        if (doc !== null) {
            console.log("file sent:", doc._id, doc.originalName);
            socket.emit("message", doc);
            socket.in(room).emit("message", doc);
        }
        else {
            setTimeout(function () {
                sendFileData(_id, room, socket);
            }, 100);
        }
    });
};
exports.sendFileData = sendFileData;
