"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_controller_1 = require("./app.controller");
const auth_controller_1 = require("./auth/auth.controller");
const passport_1 = __importDefault(require("passport"));
const category_controller_1 = require("./categories/category.controller");
const course_controller_1 = require("./courses/course.controller");
const purchases_controller_1 = require("./purchases/purchases.controller");
const chapters_controller_1 = require("./chapters/chapters.controller");
const multer_1 = require("../services/multer");
const appRouter = express_1.default.Router();
appRouter.get("/", app_controller_1.getHelloHandler);
appRouter.post("/register", auth_controller_1.registerHandler);
appRouter.post("/login", auth_controller_1.loginHandler);
appRouter.get("/auth/user/:id", auth_controller_1.getUserById);
appRouter.put(
  "/auth/user",
  passport_1.default.authenticate("jwt", { session: false }),
  auth_controller_1.updateUserController
);
appRouter.get(
  "/auth/activate/:token",
  auth_controller_1.activateAccountHandler
);
appRouter.get(
  "/categories-and-courses",
  passport_1.default.authenticate("jwt", { session: false }),
  category_controller_1.getCategoriesAndCourses
);
appRouter.post(
  "/courses",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.createCourseHandler
);
appRouter.get(
  "/courses",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.GetCourses
);
appRouter.get(
  "/courses/:courseId",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.getCourseDetails
);
appRouter.get(
  "/courses/course-with-progress/:courseId",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.GetCourseWithProgress
);
appRouter.get(
  "/courses/courseUnique/:courseId",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.getUniqueCourse
);
appRouter.get(
  "/chapters/:courseId/chapters/:chapterId",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.getChapterHandler
);
appRouter.post(
  "/courses/:courseId/upload",
  passport_1.default.authenticate("jwt", { session: false }),
  multer_1.upload.single("file"),
  course_controller_1.uploadFile
);
appRouter.post(
  "/courses/:courseId/chapters",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.createChapterHandler
);
appRouter.get(
  "/purchases",
  passport_1.default.authenticate("jwt", { session: false }),
  purchases_controller_1.checkPurchase
);
appRouter.get(
  "/:courseId/chapters/:chapterId",
  passport_1.default.authenticate("jwt", { session: false }),
  chapters_controller_1.getChapter
);
appRouter.get(
  "/chapters/get-chapter",
  passport_1.default.authenticate("jwt", { session: false }),
  chapters_controller_1.getChapterData
);
appRouter.patch(
  "/courses/:courseId",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.updateCourse
);
appRouter.patch(
  "/courses/:courseId/chapters/:chapterId",
  passport_1.default.authenticate("jwt", { session: false }),
  chapters_controller_1.updateChapter
);
appRouter.patch(
  "/courses/:courseId/chapters/:chapterId/publish",
  passport_1.default.authenticate("jwt", { session: false }),
  chapters_controller_1.publishChapterHandler
);
appRouter.patch(
  "/courses/:id/publish",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.publishCourseHandler
);
appRouter.patch(
  "/courses/:id/unpublish",
  passport_1.default.authenticate("jwt", { session: false }),
  course_controller_1.unpublishCourseHandler
);
appRouter.patch(
  "/courses/:courseId/chapters/:chapterId/unpublish",
  passport_1.default.authenticate("jwt", { session: false }),
  chapters_controller_1.unpublishChapterHandler
);
appRouter.get(
  "/protected",
  passport_1.default.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
  }
);
exports.default = appRouter;
