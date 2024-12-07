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
exports.CourseService = void 0;
const client_1 = require("@prisma/client");
// import { HttpException, HttpStatus } from '@nestjs/common'; // If using NestJS, otherwise replace with appropriate error handling
class CourseService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getCoursesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.prisma.course.findMany({
                    where: { userId },
                    orderBy: { createdAt: "desc" },
                });
                return courses; // Return the list of courses
            }
            catch (error) {
                console.error("Error in getCoursesByUser:", error);
                throw "Internal Server Error";
            }
        });
    }
    getCourseByIdAndUser(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.prisma.course.findUnique({
                    where: {
                        id: courseId,
                        userId: userId,
                    },
                    include: {
                        chapters: {
                            orderBy: { position: "asc" },
                        },
                        attachments: {
                            orderBy: { createdAt: "desc" }, // Order attachments by creation date
                        },
                    },
                });
                return course;
            }
            catch (error) {
                console.error("Error in getCourseByIdAndUser:", error);
                throw new Error("Error fetching course details");
            }
        });
    }
    // Method to get course details along with progress
    getCourseWithProgress(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch course details with related chapters and user progress
                const course = yield this.prisma.course.findUnique({
                    where: { id: courseId },
                    include: {
                        chapters: {
                            where: { isPublished: true },
                            include: {
                                userProgress: { where: { userId } }, // Fetch progress for the given user
                            },
                            orderBy: { position: "asc" }, // Order chapters by their position
                        },
                    },
                });
                if (!course) {
                    return null; // If no course found, return null
                }
                // Calculate progress for the course
                const progressCount = yield this.getProgress(userId, courseId);
                // Return course details along with progress count
                //   return { course, progressCount };
                return {
                    course,
                    progressCount,
                };
            }
            catch (error) {
                console.error("[GET_COURSE_WITH_PROGRESS]", error);
                //   throw ("Error fetching course details");
                throw { status: 500, message: "Error fetching courses" };
            }
        });
    }
    // Method to calculate user's progress in a specific course
    getProgress(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch published chapters for the course
                const publishedChapters = yield this.prisma.chapter.findMany({
                    where: {
                        courseId,
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                });
                const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
                // Count the number of completed chapters for the user
                const completedChapters = yield this.prisma.userProgress.count({
                    where: {
                        userId,
                        chapterId: {
                            in: publishedChapterIds,
                        },
                        isCompleted: true,
                    },
                });
                // Calculate the progress percentage
                return (completedChapters / publishedChapterIds.length) * 100;
            }
            catch (error) {
                console.error("[GET_PROGRESS]", error);
                return 0; // If there's an error, return 0 progress
            }
        });
    }
    getCourseById(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.prisma.course.findUnique({
                    where: {
                        id: courseId,
                        userId: userId,
                    },
                    include: {
                        chapters: {
                            where: { isPublished: true },
                            orderBy: { position: "asc" },
                        },
                    },
                });
                if (!course) {
                    throw new Error("Course not found");
                }
                return course;
            }
            catch (error) {
                console.error("Error fetching course details:", error);
                throw new Error("Error fetching course details");
            }
        });
    }
    updateCourse(courseId, userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCourse = yield this.prisma.course.update({
                    where: {
                        id: courseId,
                        userId: userId,
                    },
                    data: updateData,
                });
                return updatedCourse;
            }
            catch (error) {
                console.error("Error in updateCourse:", error);
                throw new Error("Failed to update course details");
            }
        });
    }
    updateCourseImage(courseId, userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.course.update({
                    where: {
                        id: courseId,
                        userId: userId,
                    },
                    data: {
                        imageUrl: imageUrl,
                    },
                });
            }
            catch (error) {
                console.error("Error updating course image:", error);
                throw new Error("Failed to update course image");
            }
        });
    }
    getCourseOwner(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.prisma.course.findUnique({
                where: { id: courseId },
                select: { userId: true },
            });
            return (course === null || course === void 0 ? void 0 : course.userId) === userId;
        });
    }
    /**
     * Gets the next position for a new chapter in the course.
     */
    getNextPosition(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastChapter = yield this.prisma.chapter.findFirst({
                where: { courseId },
                orderBy: { position: "desc" },
            });
            return lastChapter ? lastChapter.position + 1 : 1;
        });
    }
    /**
     * Creates a new chapter in the course.
     */
    createChapter(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.chapter.create({
                data,
            });
        });
    }
    getChapterWithCompletion(courseId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.prisma.chapter.findUnique({
                where: { id: chapterId },
                include: { muxData: true },
            });
            if (!chapter || chapter.courseId !== courseId) {
                throw new Error("Chapter not found or unauthorized access");
            }
            const requiredFields = [
                chapter.title,
                chapter.description,
                chapter.videoUrl,
            ];
            const completedFields = requiredFields.filter(Boolean).length;
            const totalFields = requiredFields.length;
            const isComplete = completedFields === totalFields;
            const completionText = `(${completedFields}/${totalFields})`;
            return {
                chapter,
                isComplete,
                completionText,
            };
        });
    }
    publishCourse(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch the course with related chapters
            const course = yield this.prisma.course.findFirst({
                where: {
                    id: courseId,
                    userId,
                },
                include: {
                    chapters: {
                        include: {
                            muxData: true,
                        },
                    },
                },
            });
            if (!course) {
                const error = new Error("Course not found");
                error.status = 404;
                throw error;
            }
            // Check if the course has a published chapter
            const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
            // Validate required fields
            if (!course.title ||
                !course.description ||
                !course.imageUrl ||
                !hasPublishedChapter) {
                const error = new Error("Missing required fields");
                error.status = 400;
                throw error;
            }
            // Update the course's publication status
            const publishedCourse = yield this.prisma.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    isPublished: true,
                },
            });
            return publishedCourse;
        });
    }
    createCourse(userId, createCourseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = createCourseDto;
                const course = yield this.prisma.course.create({
                    data: {
                        userId,
                        title,
                    },
                });
                return course;
            }
            catch (error) {
                console.error("[CREATE COURSE - PRISMA ERROR]", error);
                throw new Error("Failed to create course");
            }
        });
    }
    unpublishCourse(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if the user owns the course
                const course = yield this.prisma.course.findFirst({
                    where: {
                        id: courseId,
                        userId,
                    },
                });
                if (!course) {
                    throw "Course not found";
                }
                const unpublishedCourse = yield this.prisma.course.update({
                    where: {
                        id: courseId,
                    },
                    data: {
                        isPublished: false,
                    },
                });
                return unpublishedCourse;
            }
            catch (error) {
                console.error("[UNPUBLISH_COURSE_ERROR]", error);
                throw new Error("Failed to unpublish course");
            }
        });
    }
}
exports.CourseService = CourseService;
