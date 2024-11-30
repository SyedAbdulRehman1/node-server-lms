import express, { Request, Response, NextFunction } from "express";
import { getHelloHandler } from "./app.controller";
import {
  activateAccountHandler,
  loginHandler,
  registerHandler,
} from "./auth/auth.controller";
import passport from "passport";
import { getCategoriesAndCourses } from "./categories/category.controller";
import {
  getCourseDetails,
  GetCourses,
  GetCourseWithProgress,
  getUniqueCourse,
  updateCourse,
} from "./courses/course.controller";
import { checkPurchase } from "./purchases/purchases.controller";
import {
  getChapter,
  getChapterData,
  updateChapter,
} from "./chapters/chapters.controller";

const appRouter = express.Router();

appRouter.get("/", getHelloHandler);
appRouter.post("/register", registerHandler);
appRouter.post("/login", loginHandler);
appRouter.get("/auth/activate/:token", activateAccountHandler);
appRouter.get(
  "/categories-and-courses",
  passport.authenticate("jwt", { session: false }),
  getCategoriesAndCourses
);
appRouter.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  GetCourses
);
appRouter.get(
  "/courses/:courseId",
  passport.authenticate("jwt", { session: false }),
  getCourseDetails
);
appRouter.get(
  "/courses/course-with-progress/:courseId",
  passport.authenticate("jwt", { session: false }),
  GetCourseWithProgress
);
appRouter.get(
  "/courses/courseUnique/:courseId",
  passport.authenticate("jwt", { session: false }),
  getUniqueCourse
);

appRouter.get(
  "/purchases",
  passport.authenticate("jwt", { session: false }),
  checkPurchase
);

appRouter.get(
  "/:courseId/chapters/:chapterId",
  passport.authenticate("jwt", { session: false }),
  getChapter
);
appRouter.get(
  "/chapters/get-chapter",
  passport.authenticate("jwt", { session: false }),
  getChapterData
);
appRouter.patch(
  "/courses/:courseId",
  passport.authenticate("jwt", { session: false }),
  updateCourse
);

appRouter.patch(
  "/:courseId/chapters/:chapterId",
  passport.authenticate("jwt", { session: false }),
  updateChapter
);

appRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.json({ message: "Protected route accessed", user: req.user });
  }
);

export default appRouter;
