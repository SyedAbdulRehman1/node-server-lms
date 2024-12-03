"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelloHandler = void 0;
const app_service_1 = require("./app.service");
const getHelloHandler = (req, res) => {
    const message = (0, app_service_1.getHello)();
    res.send(message);
};
exports.getHelloHandler = getHelloHandler;
