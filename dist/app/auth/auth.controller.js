"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateAccountHandler = exports.loginHandler = exports.registerHandler = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
// import authService from "../services/auth.service";
// Register Handler
const registerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const result = yield auth_service_1.default.register(email, password);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.registerHandler = registerHandler;
// Login Handler
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const result = yield auth_service_1.default.login(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.loginHandler = loginHandler;
// Activate Account Handler
const activateAccountHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (!token) {
            res.status(400).json({ message: "Token is required" });
            return;
        }
        const result = yield auth_service_1.default.activateAccount(token);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.activateAccountHandler = activateAccountHandler;
