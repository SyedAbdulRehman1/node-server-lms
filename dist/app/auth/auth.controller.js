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
exports.updateUserController = exports.activateAccountHandler = exports.getUserById = exports.loginHandler = exports.registerHandler = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 */
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
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield auth_service_1.default.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ data: user, statusCode: 200 });
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Server error", statusCode: 500 });
    }
});
exports.getUserById = getUserById;
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
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { id, oldPassword, newPassword, name, email, image } = req.body;
        if (!id) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const updatedUser = yield auth_service_1.default.updateUser({
            id: userId,
            oldPassword,
            newPassword,
            name,
            email,
            image,
        });
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "Failed to update user",
            error: error.message,
        });
    }
});
exports.updateUserController = updateUserController;
