import express, { Request, Response, NextFunction } from "express";
import { getHelloHandler } from "./app.controller";
import {
  activateAccountHandler,
  getUserById,
  loginHandler,
  registerHandler,
  updateUserController,
} from "./auth/auth.controller";
import passport from "passport";
import { getCategoriesAndCourses } from "./categories/category.controller";
import {
  createChapterHandler,
  createCourseHandler,
  deleteCourse,
  getChapterHandler,
  getCourseDetails,
  GetCourses,
  GetCourseWithProgress,
  getUniqueCourse,
  publishCourseHandler,
  unpublishCourseHandler,
  updateCourse,
  uploadFile,
} from "./courses/course.controller";
import { checkPurchase } from "./purchases/purchases.controller";
import {
  deleteChapter,
  getChapter,
  getChapterData,
  publishChapterHandler,
  unpublishChapterHandler,
  updateChapter,
} from "./chapters/chapters.controller";
import { upload } from "../services/multer";
import swaggerSpec from "../swagger";
import {
  CreateChat,
  DeleteChat,
  GetChats,
  UpdateChat,
} from "./chat/chat.controller";
import { checkoutCourse } from "./checkout/checkoutController";
import { stripeWebhook } from "./checkout/stripeWebhook";
import { updateProgress } from "./progress/progressController";
import { getDashboardCourses } from "./dashboard/dashboardController";

const appRouter = express.Router();
appRouter.get("/", getHelloHandler);

appRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

appRouter.post("/register", registerHandler);
appRouter.post("/login", loginHandler);
appRouter.get("/auth/user/:id", getUserById);
appRouter.put("/auth/user", updateUserController);

appRouter.get("/auth/activate/:token", activateAccountHandler);
appRouter.use(passport.authenticate("jwt", { session: false }));
appRouter.get("/dashboard/courses", getDashboardCourses);
appRouter.get("/categories-and-courses", getCategoriesAndCourses);
appRouter.post("/courses", createCourseHandler);
appRouter.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

appRouter.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  GetCourses
);
appRouter.get("/courses/:courseId", getCourseDetails);
appRouter.get("/courses/course-with-progress/:courseId", GetCourseWithProgress);
appRouter.get("/courses/courseUnique/:courseId", getUniqueCourse);
appRouter.get("/chapters/:courseId/chapters/:chapterId", getChapterHandler);

appRouter.post(
  "/courses/:courseId/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  uploadFile
);

appRouter.post("/courses/:courseId/checkout", checkoutCourse);

appRouter.post("/courses/:courseId/chapters", createChapterHandler);

appRouter.get("/purchases", checkPurchase);

appRouter.get("/:courseId/chapters/:chapterId", getChapter);
appRouter.get("/chapters/get-chapter", getChapterData);
appRouter.patch("/courses/:courseId", updateCourse);

appRouter.patch("/courses/:courseId/chapters/:chapterId", updateChapter);
appRouter.patch(
  "/courses/:courseId/chapters/:chapterId/publish",
  publishChapterHandler
);
appRouter.patch("/courses/:id/publish", publishCourseHandler);
appRouter.patch("/courses/:id/unpublish", unpublishCourseHandler);

appRouter.patch(
  "/courses/:courseId/chapters/:chapterId/unpublish",
  unpublishChapterHandler
);
appRouter.get("/chats", GetChats);
appRouter.post("/chats", CreateChat);
appRouter.put("/chats", UpdateChat);
appRouter.delete("/chats", DeleteChat);
appRouter.delete("/courses/:id", deleteCourse);
appRouter.delete("/courses/:courseId/chapters/:chapterId", deleteChapter);
appRouter.put(
  "/courses/:courseId/chapters/:chapterId/progress",
  updateProgress
);

appRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.json({ message: "Protected route accessed", user: req.user });
  }
);

export default appRouter;
