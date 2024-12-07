import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appModule from "./app/app.module";
import { configurePassport } from "./app/auth/strategies/jwtStrategy";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger";
import swaggerSpec from "./swagger";
// import OASDescription from "./swagger";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
// configurePassport(passport);
// app.use(passport.initialize());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/", appModule);

// Start Server
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
