"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_module_1 = __importDefault(require("./app/app.module"));
const jwtStrategy_1 = require("./app/auth/strategies/jwtStrategy");
const passport_1 = __importDefault(require("passport"));
// import appModule from "./app/app.module";
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, jwtStrategy_1.configurePassport)(passport_1.default);
app.use(passport_1.default.initialize());
// Routes
app.use("/", app_module_1.default);
// Start Server
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
