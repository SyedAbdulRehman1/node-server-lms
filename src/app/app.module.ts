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

const appRouter = express.Router();

appRouter.get("/", getHelloHandler);
appRouter.post("/register", registerHandler);
appRouter.post("/login", loginHandler);
appRouter.get("/auth/user/:id", getUserById);
appRouter.put(
  "/auth/user",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);

appRouter.get("/auth/activate/:token", activateAccountHandler);
appRouter.get(
  "/categories-and-courses",
  passport.authenticate("jwt", { session: false }),
  getCategoriesAndCourses
);
appRouter.post(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  createCourseHandler
);
appRouter.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

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
  "/chapters/:courseId/chapters/:chapterId",
  passport.authenticate("jwt", { session: false }),
  getChapterHandler
);

appRouter.post(
  "/courses/:courseId/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  uploadFile
);
appRouter.post(
  "/courses/:courseId/chapters",
  passport.authenticate("jwt", { session: false }),
  createChapterHandler
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
  "/courses/:courseId/chapters/:chapterId",
  passport.authenticate("jwt", { session: false }),
  updateChapter
);
appRouter.patch(
  "/courses/:courseId/chapters/:chapterId/publish",
  passport.authenticate("jwt", { session: false }),
  publishChapterHandler
);
appRouter.patch(
  "/courses/:id/publish",
  passport.authenticate("jwt", { session: false }),
  publishCourseHandler
);
appRouter.patch(
  "/courses/:id/unpublish",
  passport.authenticate("jwt", { session: false }),
  unpublishCourseHandler
);

appRouter.patch(
  "/courses/:courseId/chapters/:chapterId/unpublish",
  passport.authenticate("jwt", { session: false }),
  unpublishChapterHandler
);
appRouter.get(
  "/chats",
  passport.authenticate("jwt", { session: false }),
  GetChats
);
appRouter.post(
  "/chats",
  passport.authenticate("jwt", { session: false }),
  CreateChat
);
appRouter.put(
  "/chats",
  passport.authenticate("jwt", { session: false }),
  UpdateChat
);
appRouter.delete(
  "/chats",
  passport.authenticate("jwt", { session: false }),
  DeleteChat
);

appRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.json({ message: "Protected route accessed", user: req.user });
  }
);

export default appRouter;
