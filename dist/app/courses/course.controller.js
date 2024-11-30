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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueCourse = exports.GetCourseWithProgress = exports.updateCourse = exports.getCourseDetails = exports.GetCourses = void 0;
const course_service_1 = require("./course.service");
// import { CourseService } from "./course.service";
const courseService = new course_service_1.CourseService();
const GetCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id;
    if (!userId1) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const courses = yield courseService.getCoursesByUser(userId1);
        res.json({ status: "success", courses });
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.GetCourses = GetCourses;
const getCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const course = yield courseService.getCourseByIdAndUser(courseId, userId1);
        if (!course) {
            res.status(404).json({ message: "Course not found" }); // Return 404 if the course is not found
            return;
        }
        const { attachments, categoryId, chapters, createdAt, description, id, imageUrl, isPublished, price, title, updatedAt, userId, } = course;
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
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Handle server error
    }
});
exports.getCourseDetails = getCourseDetails;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const userId = userData === null || userData === void 0 ? void 0 : userData.id;
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
        const updatedCourse = yield courseService.updateCourse(courseId, userId, updateData);
        res.json({ status: "success", data: updatedCourse }); // Return updated course data
    }
    catch (error) {
        console.error("Error updating course details:", error);
        res.status(500).json({ message: "Failed to update course details." }); // Return server error if failed
    }
});
exports.updateCourse = updateCourse;
const GetCourseWithProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const courses = yield courseService.getCourseWithProgress(courseId, userId1
        //   categoryId: req.query.categoryId as string,
        );
        res.json({
            course: courses === null || courses === void 0 ? void 0 : courses.course,
            progressCount: courses === null || courses === void 0 ? void 0 : courses.progressCount,
        });
        // res.json({ courses });
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.GetCourseWithProgress = GetCourseWithProgress;
const getUniqueCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Handle server error
    }
});
exports.getUniqueCourse = getUniqueCourse;
