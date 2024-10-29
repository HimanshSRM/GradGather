"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
require('dotenv').config();
var uri = process.env.MONGO_ADDRESS;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(uri);
