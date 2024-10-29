"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saveModel = function (model) {
    model
        .save()
        .then(function (doc) {
        // console.log(doc);
        // res.send({status: "successfullySaved"});
    })
        .catch(function (err) { return console.error(err); });
};
// module.exports = { saveModel };
exports.default = saveModel;
