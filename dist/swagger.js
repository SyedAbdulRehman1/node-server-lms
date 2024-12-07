"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Node.js API Documentation",
        version: "1.0.0",
        description: "API documentation for your application",
    },
    servers: [
        {
            url: "http://localhost:8003",
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ["./app/**/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
