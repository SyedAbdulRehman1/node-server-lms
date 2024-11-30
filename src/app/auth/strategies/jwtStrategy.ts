import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { PrismaClient } from "@prisma/client";
import { config } from "../../../config/config";
// import { config } from "./config/config";

const prisma = new PrismaClient();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.id },
        });
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
