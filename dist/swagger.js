"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// import "../src/app"
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Name",
            version: "1.0.0",
            description: "Your API Documentation",
        },
        servers: [
            {
                url: "http://localhost:8003", // Update with your server's base URL
            },
        ],
    },
    apis: ["./src/app/**/*.ts"], // Ensure this path matches your folder structure
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
