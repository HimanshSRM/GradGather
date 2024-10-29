"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roomsSchema = new mongoose_1.default.Schema({
    _id: String,
    name: {
        type: String,
        trim: true,
        unique: false,
        required: [true, "Please add a name"],
    },
    position: {
        type: Number,
        unique: false,
        required: false,
    },
    voice: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: false,
});
var rooms = mongoose_1.default.model("Rooms", roomsSchema);
// module.exports = rooms;
exports.default = rooms;
