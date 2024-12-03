import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appModule from "./app/app.module";
import { configurePassport } from "./app/auth/strategies/jwtStrategy";
import passport from "passport";
// import appModule from "./app/app.module";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
configurePassport(passport);
app.use(passport.initialize());

// Routes
app.use("/", appModule);

// Start Server
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
