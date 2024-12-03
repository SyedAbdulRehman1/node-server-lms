"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpublishCourseHandler =
  exports.publishCourseHandler =
  exports.getChapterHandler =
  exports.createChapterHandler =
  exports.uploadFile =
  exports.getUniqueCourse =
  exports.GetCourseWithProgress =
  exports.updateCourse =
  exports.getCourseDetails =
  exports.GetCourses =
  exports.createCourseHandler =
    void 0;
const course_service_1 = require("./course.service");
const client_1 = require("@prisma/client");
const courseService = new course_service_1.CourseService();
const createCourseHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createCourseDto = req.body;
    const user = req.user;
    try {
      if (
        !(user === null || user === void 0 ? void 0 : user.id) ||
        user.userType !== "TEACHER"
      ) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const data = yield courseService.createCourse(user.id, createCourseDto);
      const {
        categoryId,
        createdAt,
        description,
        id,
        imageUrl,
        isPublished,
        price,
        title,
        updatedAt,
        userId,
      } = data;
      res.status(201).json({
        categoryId,
        createdAt,
        description,
        id,
        imageUrl,
        isPublished,
        price,
        title,
        updatedAt,
        userId,
        message: "Course created successfully",
      });
    } catch (error) {
      console.error("[CREATE COURSE]", error);
      if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        res.status(400).json({
          statusCode: 400,
          message: "Prisma validation error",
          error: error.message,
        });
      } else {
        res.status(500).json({
          statusCode: 500,
          message: "Failed to create course",
          error: error.message,
        });
      }
    }
  });
exports.createCourseHandler = createCourseHandler;
const GetCourses = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id;
    if (!userId1) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const courses = yield courseService.getCoursesByUser(userId1);
      res.json({ status: "success", courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
exports.GetCourses = GetCourses;
const getCourseDetails = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user; // Get the user ID from the authenticated user
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id; // Extract userId from the authenticated user
    const courseId = req.params.courseId; // Get the courseId from the route parameters
    console.log(userId, "udfdf");
    console.log(courseId, "dkdk");
    if (!userId1) {
      res.status(401).json({ message: "Unauthorized" }); // Return 401 if the user is not authenticated
      return;
    }
    if (!courseId) {
      res.status(400).json({ message: "Missing courseId" }); // Return 400 if courseId is missing
      return;
    }
    try {
      // Fetch the course details using the service method
      const course = yield courseService.getCourseByIdAndUser(
        courseId,
        userId1
      );
      if (!course) {
        res.status(404).json({ message: "Course not found" }); // Return 404 if the course is not found
        return;
      }
      const {
        attachments,
        categoryId,
        chapters,
        createdAt,
        description,
        id,
        imageUrl,
        isPublished,
        price,
        title,
        updatedAt,
        userId,
      } = course;
      res.json({
        status: "success",
        attachments,
        categoryId,
        chapters,
        createdAt,
        description,
        id,
        imageUrl,
        isPublished,
        price,
        title,
        updatedAt,
        userId,
      }); // Return the course details
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Internal Server Error" }); // Handle server error
    }
  });
exports.getCourseDetails = getCourseDetails;
const updateCourse = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const userId =
      userData === null || userData === void 0 ? void 0 : userData.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" }); // If user is not authenticated, return 401
      return;
    }
    const courseId = req.params.courseId; // Get courseId from URL parameter
    const updateData = req.body; // Get update data from the body
    try {
      // Fetch the course by ID and user
      const course = yield courseService.getCourseByIdAndUser(courseId, userId);
      if (!course) {
        res
          .status(404)
          .json({ message: "Course not found or unauthorized access." }); // If course not found, return 404
        return;
      }
      // Update the course details
      const updatedCourse = yield courseService.updateCourse(
        courseId,
        userId,
        updateData
      );
      res.json({ status: "success", data: updatedCourse }); // Return updated course data
    } catch (error) {
      console.error("Error updating course details:", error);
      res.status(500).json({ message: "Failed to update course details." }); // Return server error if failed
    }
  });
exports.updateCourse = updateCourse;
const GetCourseWithProgress = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id;
    //   const courseId = userId?.id;
    console.log(userId1, "dfdfd");
    const courseId = req.params.courseId;
    console.log(courseId, "Dfdfdf1111111111111");
    if (!userId1) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      // const courseWithProgress = await courseService.getCourseWithProgress(
      // Pass query parameters to the service method
      const courses = yield courseService.getCourseWithProgress(
        courseId,
        userId1
        //   categoryId: req.query.categoryId as string,
      );
      res.json({
        course:
          courses === null || courses === void 0 ? void 0 : courses.course,
        progressCount:
          courses === null || courses === void 0
            ? void 0
            : courses.progressCount,
      });
      // res.json({ courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
exports.GetCourseWithProgress = GetCourseWithProgress;
const getUniqueCourse = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user; // Get the user ID from the authenticated user
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id;
    const courseId = req.params.courseId; // Get the courseId from the route parameters
    if (!userId1) {
      res.status(401).json({ message: "Unauthorized" }); // Return 401 if the user is not authenticated
      return;
    }
    if (!courseId) {
      res.status(400).json({ message: "Missing courseId" }); // Return 400 if the courseId is missing
      return;
    }
    try {
      // Fetch the course details using the service
      const course = yield courseService.getCourseById(courseId, userId1);
      res.json({ status: "success", data: course }); // Return the course data
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Internal Server Error" }); // Handle server error
    }
  });
exports.getUniqueCourse = getUniqueCourse;
const uploadFile = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const user = req.user; // Assuming `req.user` contains the authenticated user
    const userId = user === null || user === void 0 ? void 0 : user.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    const fileUrl = file.path;
    try {
      const updatedCourse = yield courseService.updateCourseImage(
        courseId,
        userId,
        fileUrl
      );
      res.status(200).json({ url: fileUrl, updatedCourse });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });
exports.uploadFile = uploadFile;
const createChapterHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { title } = req.body;
    const user = req.user;
    const userId = user === null || user === void 0 ? void 0 : user.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized User ID is required" });
      return;
    }
    try {
      // Verify course ownership
      const isOwner = yield courseService.getCourseOwner(courseId, userId);
      if (!isOwner) {
        res.status(403).json({
          message: "You are not authorized to add chapters to this course",
        });
        return;
      }
      // Get the next position for the chapter
      const newPosition = yield courseService.getNextPosition(courseId);
      // Create the new chapter
      const chapter = yield courseService.createChapter({
        title,
        courseId,
        position: newPosition,
      });
      res.status(201).json(chapter);
    } catch (error) {
      console.error("Error creating chapter:", error);
      res.status(500).json({ message: "Failed to create chapter" });
    }
  });
exports.createChapterHandler = createChapterHandler;
const getChapterHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, chapterId } = req.params;
    console.log(courseId, "chadfdf", chapterId);
    try {
      const result = yield courseService.getChapterWithCompletion(
        courseId,
        chapterId
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching chapter:", error);
      res.status(404).json({ message: error.message });
    }
  });
exports.getChapterHandler = getChapterHandler;
const publishCourseHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id: courseId } = req.params;
    const user = req.user; // Assuming user info is added via middleware
    try {
      if (!(user === null || user === void 0 ? void 0 : user.id)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const publishedCourse = yield courseService.publishCourse(
        courseId,
        user.id
      );
      res.status(200).json({
        course: publishedCourse,
        message: "Course published successfully",
      });
    } catch (error) {
      console.error("[COURSE_ID_PUBLISH]", error);
      res.status(error.status || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  });
exports.publishCourseHandler = publishCourseHandler;
const unpublishCourseHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id: courseId } = req.params;
    const user = req.user;
    try {
      if (!(user === null || user === void 0 ? void 0 : user.id)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const course = yield courseService.unpublishCourse(courseId, user.id);
      res.status(200).json({
        course,
        message: "Course unpublished successfully",
      });
    } catch (error) {
      console.error("[COURSE_UNPUBLISH]", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
exports.unpublishCourseHandler = unpublishCourseHandler;
