'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const uniqid = require('uniqid');
let gen = () => {
    return uniqid.time();
};
exports.default = gen;